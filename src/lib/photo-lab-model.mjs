// Pinhole projection: equal-height objects at d and d + 8 metres.
export function perspectiveScales(distance, focal) {
  return {
    subject: (focal / 50) * (4 / distance),
    background: (focal / 50) * (4 / (distance + 8)),
    ratio: distance / (distance + 8),
  };
}

// The viewer is on +Z; 0 degrees places the light beside the camera.
export function lightDirection(degrees) {
  const angle = ((degrees % 360) + 360) % 360;
  if (angle <= 45 || angle >= 315) return '顺光';
  if (angle >= 135 && angle <= 225) return '逆光';
  return '侧光';
}

export const exposureFactor = (stops) => 2 ** stops;

export function lockedFieldOfView(referenceDistance, referenceFov, distance) {
  return 2 * Math.atan(Math.tan(referenceFov * Math.PI / 360) * referenceDistance / distance) * 180 / Math.PI;
}

export function isoExposure(iso, mode) {
  const gain = iso / 100;
  const timeFactor = mode === 'matched' ? 1 / gain : 1;
  return { gain, timeFactor, shutterDenominator: 125 / timeFactor };
}
