import React from 'react';
import {Composition} from 'remotion';
import {ProcessMapSolutionsVideo} from './Video';

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 2520;

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ProcessMapSolutions"
    component={ProcessMapSolutionsVideo}
    durationInFrames={DURATION_IN_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
    defaultProps={{}}
  />
);
