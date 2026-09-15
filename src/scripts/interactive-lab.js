import { perspectiveScales, exposureFactor, isoExposure } from '../lib/photo-lab-model.mjs';

const linear = Array.from({ length: 256 }, (_, value) => {
  const s = value / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
});
const displayValues = Uint8ClampedArray.from({ length: 4096 }, (_, value) => {
  const v = value / 4095;
  return 255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);
});
const srgb = (value) => displayValues[Math.round(Math.max(0, Math.min(1, value)) * 4095)];

function scenePixels(canvas) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  ctx.fillStyle = '#434954';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#e8dcb1'; ctx.fillRect(62, 55, 142, 150);
  ctx.strokeStyle = '#706e6a'; ctx.lineWidth = 5;
  ctx.strokeRect(72, 65, 122, 130);
  ctx.beginPath(); ctx.moveTo(133, 65); ctx.lineTo(133, 195); ctx.stroke();
  ctx.fillStyle = '#a38267'; ctx.fillRect(395, 125, 110, 215);
  ctx.fillStyle = '#8a8d94'; ctx.fillRect(290, 340, 320, 28);
  ctx.fillStyle = '#353942';
  for (let i = 0; i < 9; i++) ctx.fillRect(30 + i * 70, 385, 40, 12);
  return { ctx, base: ctx.getImageData(0, 0, canvas.width, canvas.height) };
}

// Reuse normal samples so moving a slider does not reroll the scene.
function noiseSamples(count) {
  let seed = 17431;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return (seed + 1) / 4294967297;
  };
  return Float32Array.from({ length: count }, () => Math.sqrt(-2 * Math.log(random())) * Math.cos(2 * Math.PI * random()));
}

document.querySelectorAll('[data-photo-lab]').forEach((root) => {
  const distanceInput = root.querySelector('[data-lab-distance]');
  const focalInput = root.querySelector('[data-lab-focal]');
  const updatePerspective = () => {
    const distance = Number(distanceInput.value);
    const focal = Number(focalInput.value);
    const scales = perspectiveScales(distance, focal);
    for (const name of ['subject', 'background']) {
      const scale = scales[name];
      root.querySelector('[data-perspective-' + name + ']').setAttribute('transform', 'translate(380 ' + (180 + 120 * scale) + ') scale(' + scale + ')');
    }
    root.querySelector('[data-perspective-readout]').textContent = distance.toFixed(1) + ' 米 / ' + focal + 'mm：远处同高标尺的像高是人物的 ' + (scales.ratio * 100).toFixed(1) + '%。原地只变焦，这个比例不变。';
  };
  distanceInput.addEventListener('input', updatePerspective);
  focalInput.addEventListener('input', updatePerspective);
  root.querySelectorAll('[data-perspective-preset]').forEach((button) => {
    button.addEventListener('click', () => {
      const values = { near: [4, 50], zoom: [4, 100], back: [8, 100] }[button.dataset.perspectivePreset];
      [distanceInput.value, focalInput.value] = values.map(String);
      updatePerspective();
    });
  });
  updatePerspective();

  const shutterCanvas = root.querySelector('[data-shutter-canvas]');
  const shutterCtx = shutterCanvas.getContext('2d', { willReadFrequently: true });
  const shutterInput = root.querySelector('[data-shutter-speed]');
  const shutters = [250, 60, 15, 4];
  const drawShutter = () => {
    if (!shutterCtx) return;
    const denominator = shutters[Number(shutterInput.value)];
    const trail = 720 / denominator;
    shutterCtx.fillStyle = '#273043'; shutterCtx.fillRect(0, 0, 680, 420);
    shutterCtx.fillStyle = '#515967';
    for (let i = 0; i < 7; i++) shutterCtx.fillRect(35 + i * 95, 45, 42, 260);
    shutterCtx.fillStyle = '#807467'; shutterCtx.fillRect(0, 340, 680, 80);
    const background = shutterCtx.getImageData(0, 0, 680, 420);
    const output = shutterCtx.createImageData(680, 420);
    for (let y = 0; y < 420; y++) {
      const head = Math.abs(y - 156) < 32 ? 28 * Math.sqrt(1 - ((y - 156) / 32) ** 2) : 0;
      const halfWidth = y >= 195 && y < 340 ? 25 : head;
      for (let x = 0; x < 680; x++) {
        // Fraction of exposure time for which the moving silhouette covers this pixel.
        const alpha = Math.max(0, Math.min(430, x + halfWidth) - Math.max(430 - trail, x - halfWidth)) / trail;
        const offset = (y * 680 + x) * 4;
        [233, 170, 78].forEach((value, channel) => {
          output.data[offset + channel] = srgb(linear[background.data[offset + channel]] * (1 - alpha) + linear[value] * alpha);
        });
        output.data[offset + 3] = 255;
      }
    }
    shutterCtx.putImageData(output, 0, 0);
    root.querySelector('[data-shutter-readout]').textContent = '1/' + denominator + 's：模型运动距离约 ' + trail.toFixed(1) + ' 像素。背景保持不动，慢门让人物沿水平方向拖开。';
  };
  shutterInput.addEventListener('input', drawShutter);
  drawShutter();

  const exposureScene = scenePixels(root.querySelector('[data-exposure-canvas]'));
  const evInput = root.querySelector('[data-ev-level]');
  const drawExposure = () => {
    if (!exposureScene) return;
    const stops = Number(evInput.value);
    const factor = exposureFactor(stops);
    const output = exposureScene.ctx.createImageData(680, 420);
    for (let i = 0; i < output.data.length; i += 4) {
      for (let c = 0; c < 3; c++) output.data[i + c] = srgb(linear[exposureScene.base.data[i + c]] * factor);
      output.data[i + 3] = 255;
    }
    exposureScene.ctx.putImageData(output, 0, 0);
    root.querySelector('[data-exposure-readout]').textContent = (stops > 0 ? '+' : '') + stops + ' 档：' + factor + ' 倍进光量，快门约 1/' + Math.round(125 / factor) + 's。' + (stops > 0 ? '亮部可能失去纹理；回到起点可比较原本的信息。' : '观察暗部还剩哪些层次。');
  };
  evInput.addEventListener('input', drawExposure);
  drawExposure();

  const grainScene = scenePixels(root.querySelector('[data-grain-canvas]'));
  const isoInput = root.querySelector('[data-iso-level]');
  const isoMode = root.querySelector('[data-iso-mode]');
  const noise = noiseSamples(680 * 420);
  const drawISO = () => {
    if (!grainScene) return;
    const iso = [100, 400, 800, 1600][Number(isoInput.value)];
    const model = isoExposure(iso, isoMode.value);
    const output = grainScene.ctx.createImageData(680, 420);
    for (let i = 0; i < output.data.length; i += 4) {
      for (let c = 0; c < 3; c++) {
        const photons = linear[grainScene.base.data[i + c]] * 1600 * model.timeFactor;
        const measured = photons + noise[i / 4] * Math.sqrt(photons + 4);
        output.data[i + c] = srgb(measured * model.gain / 1600);
      }
      output.data[i + 3] = 255;
    }
    grainScene.ctx.putImageData(output, 0, 0);
    root.querySelector('[data-grain-readout]').textContent = 'ISO ' + iso + ' / 1/' + model.shutterDenominator + 's：' + (iso === 100 ? '这是比较起点。提高 ISO 后，观察所选条件下快门、亮度与噪声的变化。' : isoMode.value === 'matched'
      ? '入光量为起点的 1/' + model.gain + '，平均亮度近似不变。快门更快，但收集的光更少，噪声更明显。'
      : '入光量不变，信号增益为起点的 ' + model.gain + ' 倍。画面更亮，高光更容易截断；没有增加收集到的光。');
  };
  isoInput.addEventListener('input', drawISO);
  isoMode.addEventListener('change', drawISO);
  drawISO();

  const styleNotes = {
    postpunk: '这组 post-punk 联想：偏冷、较深黑位、硬边缘。观察主体是否仍然突出。',
    emo: '这组 midwest emo 联想：反差柔和、低饱和。观察画面是否只是变灰。',
    dream: '这组 dreampop 联想：柔化轮廓与光晕。保留可辨认的形状。',
    shoe: '这组 shoegaze 联想：模糊、颗粒、光晕叠加。观察哪种效果开始遮掉信息。',
  };
  root.querySelectorAll('[data-style-preset]').forEach((button) => {
    button.addEventListener('click', () => {
      const preset = button.dataset.stylePreset;
      root.querySelector('[data-style-frame]').dataset.style = preset;
      root.querySelector('[data-style-readout]').textContent = styleNotes[preset];
      root.querySelectorAll('[data-style-preset]').forEach((item) => {
        item.classList.toggle('is-active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
    });
  });
  root.querySelector('[data-style-preset]').click();
});
