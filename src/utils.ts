import {interpolate, spring} from 'remotion';

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const fade = (frame: number, duration: number, inFrames = 18, outFrames = 18) => {
  const enter = interpolate(frame, [0, inFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const exit = interpolate(frame, [duration - outFrames, duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return Math.min(enter, exit);
};

export const smooth = (frame: number, from: number, to: number, out: [number, number]) =>
  interpolate(frame, [from, to], out, {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

export const pop = (frame: number, fps: number, delay = 0) =>
  spring({frame: frame - delay, fps, config: {damping: 18, stiffness: 90, mass: 0.8}});
