import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const packageJsonPath = path.join(rootDir, 'package.json');
const androidGradlePath = path.join(rootDir, 'android', 'app', 'build.gradle');
const xcodeProjectPath = path.join(
  rootDir,
  'ios',
  'FasalRakshak.xcodeproj',
  'project.pbxproj',
);

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
if (!match) {
  console.error(`Unsupported version "${version}". Use semantic versioning like 1.2.3.`);
  process.exit(1);
}

const [, majorRaw, minorRaw, patchRaw] = match;
const major = Number(majorRaw);
const minor = Number(minorRaw);
const patch = Number(patchRaw);
const buildNumber = major * 10000 + minor * 100 + patch;

const replaceInFile = (filePath, replacements) => {
  let content = fs.readFileSync(filePath, 'utf8');

  for (const [pattern, replacement] of replacements) {
    if (!pattern.test(content)) {
      console.error(`Could not find expected pattern in ${path.relative(rootDir, filePath)}: ${pattern}`);
      process.exit(1);
    }

    content = content.replace(pattern, replacement);
  }

  fs.writeFileSync(filePath, content);
};

replaceInFile(androidGradlePath, [
  [/(versionCode\s+)\d+/, `$1${buildNumber}`],
  [/(versionName\s+)"[^"]+"/, `$1"${version}"`],
]);

replaceInFile(xcodeProjectPath, [
  [/CURRENT_PROJECT_VERSION = [^;]+;/g, `CURRENT_PROJECT_VERSION = ${buildNumber};`],
  [/MARKETING_VERSION = [^;]+;/g, `MARKETING_VERSION = ${version};`],
]);

console.log(`Synced release version ${version}`);
console.log(`Android versionCode: ${buildNumber}`);
console.log(`iOS CURRENT_PROJECT_VERSION: ${buildNumber}`);
