export type SceneSpec = {
  id: string;
  start: number;
  duration: number;
};

const seconds = (value: number) => Math.round(value * 30);

const durations = [5, 6, 5.5, 5, 6, 6, 5.5, 5.5, 6, 5, 6, 5.5, 6, 5, 6];

export const scenes: SceneSpec[] = durations.reduce<SceneSpec[]>((acc, duration, index) => {
  const previous = acc[index - 1];
  const start = previous ? previous.start + previous.duration : 0;
  acc.push({id: `scene-${index + 1}`, start, duration: seconds(duration)});
  return acc;
}, []);
