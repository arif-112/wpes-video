import React from 'react';
import { Composition } from 'remotion';
import { VIDEO } from './data/scenes';
import { Video } from './Video';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="WPExpertReel"
    component={Video}
    durationInFrames={VIDEO.durationInFrames}
    fps={VIDEO.fps}
    width={VIDEO.width}
    height={VIDEO.height}
  />
);
