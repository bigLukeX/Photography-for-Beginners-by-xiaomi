import { test } from 'node:test';
import assert from 'node:assert/strict';
import { perspectiveScales, lightDirection, exposureFactor, isoExposure, lockedFieldOfView } from '../src/lib/photo-lab-model.mjs';

test('changing focal length at one position preserves relative sizes', () => {
  for (const distance of [3, 4, 8, 9]) {
    const wide = perspectiveScales(distance, 24);
    const tele = perspectiveScales(distance, 100);
    assert.ok(Math.abs(wide.background / wide.subject - tele.background / tele.subject) < 1e-12);
  }
});

test('moving back and doubling focal length keeps subject size but enlarges the background', () => {
  const near = perspectiveScales(4, 50);
  const far = perspectiveScales(8, 100);
  assert.equal(near.subject, far.subject);
  assert.ok(far.background > near.background);
});

test('light direction matches the camera side of the scene', () => {
  assert.deepEqual([0, 90, 180, 270, 360, -90].map(lightDirection), ['顺光', '侧光', '逆光', '侧光', '顺光', '侧光']);
});

test('framing lock preserves the current field of view and projected height when moving', () => {
  for (const fov of [20, 48, 80, 90]) {
    const initial = lockedFieldOfView(5.2, fov, 5.2);
    assert.ok(Math.abs(initial - fov) < 1e-10);
    for (const distance of [3.2, 8, 9]) {
      const changed = lockedFieldOfView(5.2, fov, distance);
      const imageScale = distance * Math.tan(changed * Math.PI / 360);
      assert.ok(Math.abs(imageScale - 5.2 * Math.tan(fov * Math.PI / 360)) < 1e-10);
    }
  }
});

test('one stop doubles light and zero stops preserves it', () => {
  assert.equal(exposureFactor(0), 1);
  assert.equal(exposureFactor(1), 2);
  assert.equal(exposureFactor(-1), 0.5);
});

test('ISO gain and compensating shutter retain brightness while reducing collected light', () => {
  const matched = isoExposure(800, 'matched');
  assert.equal(matched.gain * matched.timeFactor, 1);
  assert.equal(matched.shutterDenominator, 1000);
  const fixed = isoExposure(800, 'fixed');
  assert.equal(fixed.timeFactor, 1);
  assert.equal(fixed.gain, 8);
});
