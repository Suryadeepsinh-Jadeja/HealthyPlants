#!/usr/bin/env python3
"""Generate a confusion matrix from a CSV of model predictions.

Expected CSV columns:
  - image
  - predicted_label
  - true_label (optional when using --true-label-from-parent-dir)
  - confidence (optional, ignored by the matrix builder)

Example:
  python3 scripts/generate_confusion_matrix.py results.csv

Example with labels inferred from parent folder names:
  python3 scripts/generate_confusion_matrix.py results.csv \
    --true-label-from-parent-dir
"""

from __future__ import annotations

import argparse
import csv
import sys
from collections import defaultdict
from pathlib import Path
from typing import Iterable


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate a confusion matrix CSV and console table from prediction results.",
    )
    parser.add_argument("input_csv", help="Path to the input CSV file.")
    parser.add_argument(
        "--output-csv",
        help=(
            "Where to save the confusion matrix CSV. "
            "Defaults to <input-name>_confusion_matrix.csv beside the input file."
        ),
    )
    parser.add_argument(
        "--labels",
        help=(
            "Comma-separated label order to use for rows/columns. "
            "Defaults to sorted union of true and predicted labels."
        ),
    )
    parser.add_argument(
        "--true-label-from-parent-dir",
        action="store_true",
        help=(
            "If true_label is missing or blank, infer it from the parent folder name "
            "of the image path. Example: test/rice_blast/img1.jpg -> rice_blast"
        ),
    )
    return parser.parse_args()


def fail(message: str) -> "NoReturn":
    print(f"Error: {message}", file=sys.stderr)
    raise SystemExit(1)


def clean_label(value: str | None) -> str:
    return (value or "").strip()


def infer_true_label_from_image_path(image_path: str) -> str:
    path = Path(image_path)
    parent_name = path.parent.name.strip()
    if not parent_name:
        fail(
            "Could not infer true label from image path "
            f'"{image_path}". Put files in class-named folders or provide true_label.',
        )
    return parent_name


def load_rows(input_csv: Path, infer_from_parent: bool) -> list[dict[str, str]]:
    if not input_csv.exists():
        fail(f'Input CSV not found: "{input_csv}"')

    with input_csv.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames is None:
            fail("CSV is empty or missing a header row.")

        fieldnames = {name.strip() for name in reader.fieldnames if name}
        required = {"image", "predicted_label"}
        missing = required - fieldnames
        if missing:
            fail(
                "CSV is missing required column(s): "
                + ", ".join(sorted(missing)),
            )

        rows: list[dict[str, str]] = []
        for index, row in enumerate(reader, start=2):
            image = clean_label(row.get("image"))
            predicted_label = clean_label(row.get("predicted_label"))
            true_label = clean_label(row.get("true_label"))

            if not image:
                fail(f"Row {index} is missing image.")
            if not predicted_label:
                fail(f"Row {index} is missing predicted_label.")

            if not true_label:
                if infer_from_parent:
                    true_label = infer_true_label_from_image_path(image)
                else:
                    fail(
                        f"Row {index} is missing true_label. "
                        "Add true_label or use --true-label-from-parent-dir.",
                    )

            rows.append(
                {
                    "image": image,
                    "true_label": true_label,
                    "predicted_label": predicted_label,
                },
            )

    if not rows:
        fail("CSV contains no data rows.")

    return rows


def choose_labels(rows: Iterable[dict[str, str]], explicit_labels: str | None) -> list[str]:
    if explicit_labels:
        labels = [label.strip() for label in explicit_labels.split(",") if label.strip()]
        if not labels:
            fail("--labels was provided but no valid labels were found.")
        return labels

    label_set = {
        row["true_label"]
        for row in rows
    } | {
        row["predicted_label"]
        for row in rows
    }
    return sorted(label_set)


def build_confusion_matrix(
    rows: Iterable[dict[str, str]],
    labels: list[str],
) -> dict[str, dict[str, int]]:
    matrix: dict[str, dict[str, int]] = {
        true_label: {predicted_label: 0 for predicted_label in labels}
        for true_label in labels
    }

    for row in rows:
        true_label = row["true_label"]
        predicted_label = row["predicted_label"]

        if true_label not in matrix:
            fail(f'True label "{true_label}" is not present in the label list.')
        if predicted_label not in matrix[true_label]:
            fail(f'Predicted label "{predicted_label}" is not present in the label list.')

        matrix[true_label][predicted_label] += 1

    return matrix


def compute_accuracy(rows: Iterable[dict[str, str]]) -> float:
    row_list = list(rows)
    correct = sum(1 for row in row_list if row["true_label"] == row["predicted_label"])
    return correct / len(row_list)


def write_matrix_csv(
    output_csv: Path,
    labels: list[str],
    matrix: dict[str, dict[str, int]],
) -> None:
    with output_csv.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(["true_label \\ predicted_label", *labels])
        for true_label in labels:
            writer.writerow([true_label, *[matrix[true_label][predicted_label] for predicted_label in labels]])


def print_matrix(labels: list[str], matrix: dict[str, dict[str, int]], accuracy: float) -> None:
    first_column_width = max(
        len("true \\ pred"),
        *(len(label) for label in labels),
    )
    cell_width = max(
        len(str(max((value for row in matrix.values() for value in row.values()), default=0))),
        *(len(label) for label in labels),
    )

    def format_row(title: str, values: list[str]) -> str:
        padded_title = title.ljust(first_column_width)
        padded_values = [value.rjust(cell_width) for value in values]
        return f"{padded_title} | " + " | ".join(padded_values)

    print("\nConfusion Matrix\n")
    print(format_row("true \\ pred", labels))
    print("-" * len(format_row("true \\ pred", labels)))
    for true_label in labels:
        counts = [str(matrix[true_label][predicted_label]) for predicted_label in labels]
        print(format_row(true_label, counts))

    print(f"\nAccuracy: {accuracy * 100:.2f}%")


def print_misclassifications(rows: Iterable[dict[str, str]]) -> None:
    mistakes: dict[tuple[str, str], int] = defaultdict(int)
    for row in rows:
        if row["true_label"] != row["predicted_label"]:
            mistakes[(row["true_label"], row["predicted_label"])] += 1

    if not mistakes:
        print("All samples were classified correctly.")
        return

    print("\nMost common mistakes:")
    for (true_label, predicted_label), count in sorted(
        mistakes.items(),
        key=lambda item: (-item[1], item[0][0], item[0][1]),
    ):
        print(f"  {true_label} -> {predicted_label}: {count}")


def main() -> None:
    args = parse_args()
    input_csv = Path(args.input_csv)
    output_csv = (
        Path(args.output_csv)
        if args.output_csv
        else input_csv.with_name(f"{input_csv.stem}_confusion_matrix.csv")
    )

    rows = load_rows(input_csv, infer_from_parent=args.true_label_from_parent_dir)
    labels = choose_labels(rows, explicit_labels=args.labels)
    matrix = build_confusion_matrix(rows, labels)
    accuracy = compute_accuracy(rows)

    write_matrix_csv(output_csv, labels, matrix)
    print_matrix(labels, matrix, accuracy)
    print_misclassifications(rows)
    print(f'\nSaved matrix CSV to: "{output_csv}"')


if __name__ == "__main__":
    main()
