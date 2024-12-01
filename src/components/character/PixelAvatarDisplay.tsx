import React from 'react';

interface PixelAvatarDisplayProps {
  avatarData: string;
  size?: number;
}

function renderPixelArt(layers: { pattern: string[]; color: string; bgColor: string }[], size: number) {
  const pixelSize = size / 6; // 6 is the width/height of our pattern
  const width = layers[0].pattern[0].length * pixelSize;
  const height = layers[0].pattern.length * pixelSize;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {layers.map((layer, layerIndex) => (
        <g key={layerIndex}>
          {layer.bgColor !== 'transparent' && (
            <rect width={width} height={height} fill={layer.bgColor} />
          )}
          {layer.pattern.map((row, y) => 
            Array.from(row).map((pixel, x) => 
              (pixel === '█' || pixel === '▄') && (
                <rect
                  key={`${x}-${y}-${layerIndex}`}
                  x={x * pixelSize}
                  y={y * pixelSize}
                  width={pixelSize}
                  height={pixel === '▄' ? pixelSize/2 : pixelSize}
                  fill={layer.color}
                />
              )
            )
          )}
        </g>
      ))}
    </svg>
  );
}

export function PixelAvatarDisplay({ avatarData, size = 48 }: PixelAvatarDisplayProps) {
  if (!avatarData) return null;

  const features = JSON.parse(avatarData);
  const FEATURES = [
    {
      id: 'face',
      patterns: [
        [
          '  ██  ',
          ' ████ ',
          '██████',
          '██████',
          ' ████ ',
        ],
        [
          ' ████ ',
          '██████',
          '██████',
          ' ████ ',
          '  ██  ',
        ],
      ],
      colors: [
        { id: 'red', color: '#EF4444', bgColor: '#7F1D1D' },
        { id: 'blue', color: '#6366F1', bgColor: '#3730A3' },
        { id: 'green', color: '#10B981', bgColor: '#065F46' },
        { id: 'purple', color: '#8B5CF6', bgColor: '#5B21B6' },
      ],
    },
    {
      id: 'eyes',
      patterns: [
        [
          '      ',
          ' █  █ ',
          '      ',
          '      ',
          '      ',
        ],
        [
          '      ',
          ' ▄  ▄ ',
          '      ',
          '      ',
          '      ',
        ],
      ],
      colors: [
        { id: 'white', color: '#FFFFFF', bgColor: 'transparent' },
        { id: 'yellow', color: '#FCD34D', bgColor: 'transparent' },
        { id: 'cyan', color: '#67E8F9', bgColor: 'transparent' },
      ],
    },
    {
      id: 'mouth',
      patterns: [
        [
          '      ',
          '      ',
          '      ',
          ' ████ ',
          '      ',
        ],
        [
          '      ',
          '      ',
          '      ',
          ' ▄▄▄▄ ',
          '      ',
        ],
      ],
      colors: [
        { id: 'red', color: '#FCA5A5', bgColor: 'transparent' },
        { id: 'pink', color: '#FDA4AF', bgColor: 'transparent' },
        { id: 'orange', color: '#FDBA74', bgColor: 'transparent' },
      ],
    },
  ];

  const layers = FEATURES.map(feature => {
    const selection = features[feature.id];
    const color = feature.colors.find(c => c.id === selection.colorId)!;
    return {
      pattern: feature.patterns[selection.patternIndex],
      color: color.color,
      bgColor: color.bgColor,
    };
  });

  return (
    <div className="flex items-center justify-center">
      {renderPixelArt(layers, size)}
    </div>
  );
}