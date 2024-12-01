import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PixelAvatarGeneratorProps {
  onChange: (avatar: string) => void;
  value: string;
}

interface AvatarFeature {
  id: string;
  name: string;
  patterns: string[][];
  colors: { id: string; color: string; bgColor: string }[];
}

const FEATURES: AvatarFeature[] = [
  {
    id: 'face',
    name: 'Face',
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
    name: 'Eyes',
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
    name: 'Mouth',
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

function renderPixelArt(layers: { pattern: string[]; color: string; bgColor: string }[]) {
  const size = 8;
  const width = layers[0].pattern[0].length * size;
  const height = layers[0].pattern.length * size;

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
                  x={x * size}
                  y={y * size}
                  width={size}
                  height={pixel === '▄' ? size/2 : size}
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

export function PixelAvatarGenerator({ onChange, value }: PixelAvatarGeneratorProps) {
  const initialFeatures = value ? JSON.parse(value) : {
    face: { patternIndex: 0, colorId: 'red' },
    eyes: { patternIndex: 0, colorId: 'yellow' },
    mouth: { patternIndex: 0, colorId: 'red' },
  };

  const [selectedFeatures, setSelectedFeatures] = useState(initialFeatures);

  // Call onChange with initial values when component mounts
  React.useEffect(() => {
    if (!value) {
      onChange(JSON.stringify(initialFeatures));
    }
  }, []);

  const handleFeatureChange = (featureId: string, type: 'pattern' | 'color', value: number | string) => {
    const newFeatures = {
      ...selectedFeatures,
      [featureId]: {
        ...selectedFeatures[featureId],
        [type === 'pattern' ? 'patternIndex' : 'colorId']: value,
      }
    };
    setSelectedFeatures(newFeatures);
    onChange(JSON.stringify(newFeatures));
  };

  const layers = FEATURES.map(feature => {
    const selection = selectedFeatures[feature.id];
    const color = feature.colors.find(c => c.id === selection.colorId)!;
    return {
      pattern: feature.patterns[selection.patternIndex],
      color: color.color,
      bgColor: color.bgColor,
    };
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-center mb-8">
        <motion.div
          className="w-32 h-32 bg-gray-800 rounded-lg p-4 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          {renderPixelArt(layers)}
        </motion.div>
      </div>

      <div className="space-y-6">
        {FEATURES.map(feature => (
          <div key={feature.id} className="space-y-4">
            <h3 className="text-lg font-semibold text-white">{feature.name}</h3>
            
            <div className="flex gap-4">
              <div className="flex gap-2">
                {feature.patterns.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleFeatureChange(feature.id, 'pattern', index)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                      selectedFeatures[feature.id].patternIndex === index
                        ? 'bg-purple-500 ring-2 ring-purple-300'
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                {feature.colors.map(color => (
                  <button
                    key={color.id}
                    onClick={() => handleFeatureChange(feature.id, 'color', color.id)}
                    className={`w-8 h-8 rounded-full transition-transform ${
                      selectedFeatures[feature.id].colorId === color.id
                        ? 'scale-110 ring-2 ring-purple-300'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.color }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}