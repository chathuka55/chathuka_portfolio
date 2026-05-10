import type { HyperspeedOptions } from './Hyperspeed';

const LENGTH = 400;

/** Portfolio yellow/black theme — gold highway lights, charcoal road markings */
export const portfolioHyperspeedPreset: Partial<HyperspeedOptions> = {
  distortion: 'turbulentDistortion',
  length: LENGTH,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 24,
  lightPairsPerRoadWay: 42,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [LENGTH * 0.03, LENGTH * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0x262626,
    brokenLines: 0x262626,
    leftCars: [0xfacc15, 0xfbbf24, 0xfde047],
    rightCars: [0xd4a520, 0xc9a227, 0xa16207],
    sticks: 0xfacc15,
  },
};
