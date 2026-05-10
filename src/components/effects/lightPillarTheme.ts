import type { CSSProperties } from 'react';

/** Gold pillar emerging from deep charcoal — matches portfolio yellow/black */
export const portfolioLightPillarPreset = {
  topColor: '#fde047',
  bottomColor: '#060606',
  intensity: 0.72,
  rotationSpeed: 0.26,
  glowAmount: 0.0022,
  pillarWidth: 3.2,
  pillarHeight: 0.42,
  noiseIntensity: 0.38,
  pillarRotation: 22,
  interactive: false,
  mixBlendMode: 'screen' as CSSProperties['mixBlendMode'],
  quality: 'medium' as const,
};

/** Hero — slightly brighter pillar behind samurai */
export const heroLightPillarPreset = {
  ...portfolioLightPillarPreset,
  intensity: 0.8,
  glowAmount: 0.0025,
  noiseIntensity: 0.32,
};
