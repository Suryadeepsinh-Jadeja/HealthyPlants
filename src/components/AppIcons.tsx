import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export const LeafBadgeIcon = ({ size = 34, color = '#F4FFD7' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5a6.22 6.22 0 0 0 1.75 3.75C7 8 17 8 17 8Z"
      fill={color}
    />
    <Path
      d="M7.2 18.8c2.4-4.7 5.2-7.7 8.6-9.6"
      stroke="#C9F27B"
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

export const CameraIcon = ({ size = 24, color = '#FFFFFF', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3.5" y="6.5" width="17" height="13" rx="3" stroke={color} strokeWidth={strokeWidth} />
    <Path d="M8 6.5 9.3 4.8h5.4L16 6.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="13" r="3.5" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="17.4" cy="9.3" r="0.8" fill={color} />
  </Svg>
);

export const GalleryIcon = ({ size = 24, color = '#FFFFFF', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="4" y="5" width="16" height="14" rx="2.5" stroke={color} strokeWidth={strokeWidth} />
    <Circle cx="9" cy="10" r="1.4" fill={color} />
    <Path d="M6.8 17.3 11 13.2l2.5 2.4 2.2-2.1 2.5 3.8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ShareIcon = ({ size = 24, color = '#FFFFFF', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 15V4.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <Path d="m8.5 8 3.5-3.5L15.5 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M6 13.5v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const WarningIcon = ({ size = 20, color = '#F57F17', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 4.5 21 20H3L12 4.5Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <Path d="M12 9.2v5.3" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <Circle cx="12" cy="17.2" r="1" fill={color} />
  </Svg>
);

export const OrganicIcon = ({ size = 20, color = '#2E7D32', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 5.5c-5 .3-8.9 3.1-10.8 7.6-1 2.5-.9 4.6-.9 4.6s2.1.1 4.6-.9C15.4 14.9 18.2 11 18.5 6c0-.3 0-.5-.5-.5Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <Path d="M8 16c1.8-2.4 4.1-4.3 7-5.7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Svg>
);

export const ChemicalIcon = ({ size = 20, color = '#A65A00', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 4.5h6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <Path d="M10.3 4.5v4.1l-4 6.3a3 3 0 0 0 2.5 4.6h6.4a3 3 0 0 0 2.5-4.6l-4-6.3V4.5" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <Path d="M9 13h6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Svg>
);

export const ShieldIcon = ({ size = 18, color = '#2E7D32', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 3.8 19 6.6v4.8c0 4.3-2.7 7.9-7 9.8-4.3-1.9-7-5.5-7-9.8V6.6l7-2.8Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
  </Svg>
);

export const BackIcon = ({ size = 22, color = '#FFFFFF', strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="m14.5 6.5-5 5 5 5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const FlashlightIcon = ({ size = 22, color = '#FFFFFF', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M10 3.5h4l-1.5 5.2h3L9.5 20l1.6-7H8.5L10 3.5Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
  </Svg>
);

export const DevToolsIcon = ({ size = 24, color = '#111827', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14.7 6.3 17.7 9.3" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    <Path d="M5.4 18.6a2.2 2.2 0 0 0 3.1 0l8.2-8.2a2.2 2.2 0 0 0 0-3.1l-.9-.9a2.2 2.2 0 0 0-3.1 0l-8.2 8.2a2.2 2.2 0 0 0 0 3.1l.9.9Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <Path d="m9.2 8.8-3-3" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
  </Svg>
);

export const LocationPinIcon = ({ size = 16, color = '#5F6F52', strokeWidth = 1.8 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 20c3.2-4.2 4.8-7 4.8-9a4.8 4.8 0 1 0-9.6 0c0 2 1.6 4.8 4.8 9Z" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" />
    <Circle cx="12" cy="10.8" r="1.8" fill={color} />
  </Svg>
);

export const RiskDotIcon = ({ size = 10, color = '#D32F2F' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 10 10" fill="none">
    <Circle cx="5" cy="5" r="5" fill={color} />
  </Svg>
);
