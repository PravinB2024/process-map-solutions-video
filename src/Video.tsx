import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {scenes} from './timing';
import {
  ActivitiesScene,
  ChallengeScene,
  ConnectedMapsScene,
  CoverageScene,
  DashboardIntroScene,
  DashboardRepositoryScene,
  DepartmentsScene,
  DocumentationScene,
  FinalLogoScene,
  HeroDashboardScene,
  MaintenanceBurdenScene,
  OutcomesScene,
  ProcessFlythroughScene,
  SpecialistScene,
  ResourcesScene,
} from './scenes';

const sceneComponents = [
  ChallengeScene,
  DocumentationScene,
  MaintenanceBurdenScene,
  DashboardIntroScene,
  CoverageScene,
  SpecialistScene,
  DashboardRepositoryScene,
  DepartmentsScene,
  ProcessFlythroughScene,
  ActivitiesScene,
  ResourcesScene,
  ConnectedMapsScene,
  OutcomesScene,
  HeroDashboardScene,
  FinalLogoScene,
];

export const ProcessMapSolutionsVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();

  return (
    <AbsoluteFill className="stage">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      {sceneComponents.map((Component, index) => {
        const scene = scenes[index];
        return (
          <Sequence key={scene.id} from={scene.start} durationInFrames={scene.duration}>
            <Component frame={frame - scene.start} duration={scene.duration} fps={config.fps} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
