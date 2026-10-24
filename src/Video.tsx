import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { BrandHeader } from './components/BrandHeader';
import { CaptionBar } from './components/CaptionBar';
import { SoundTrack } from './components/SoundTrack';
import { VideoBackground } from './components/VideoBackground';
import { SCENES } from './data/scenes';
import { CustomFeaturesScene } from './scenes/CustomFeaturesScene';
import { FinalCTAScene } from './scenes/FinalCTAScene';
import { HookScene } from './scenes/HookScene';
import { InboxScene } from './scenes/InboxScene';
import { ManagementScene } from './scenes/ManagementScene';
import { ManualWorkScene } from './scenes/ManualWorkScene';
import { OrderingScene } from './scenes/OrderingScene';
import { PlatformRiskScene } from './scenes/PlatformRiskScene';
import { TrustScene } from './scenes/TrustScene';
import { WebsiteRevealScene } from './scenes/WebsiteRevealScene';
import { useLoadBengaliFonts } from './utils/typography';

export const Video: React.FC = () => {
  useLoadBengaliFonts();

  const renderScene = (id: string, durationInFrames: number) => {
    switch (id) {
      case 'hook':
        return <HookScene durationInFrames={durationInFrames} />;
      case 'inbox':
        return <InboxScene durationInFrames={durationInFrames} />;
      case 'manual':
        return <ManualWorkScene durationInFrames={durationInFrames} />;
      case 'risk':
        return <PlatformRiskScene durationInFrames={durationInFrames} />;
      case 'reveal':
        return <WebsiteRevealScene durationInFrames={durationInFrames} />;
      case 'ordering':
        return <OrderingScene durationInFrames={durationInFrames} />;
      case 'management':
        return <ManagementScene durationInFrames={durationInFrames} />;
      case 'custom':
        return <CustomFeaturesScene durationInFrames={durationInFrames} />;
      case 'trust':
        return <TrustScene durationInFrames={durationInFrames} />;
      case 'cta':
        return <FinalCTAScene durationInFrames={durationInFrames} />;
      default:
        return null;
    }
  };

  return (
    <AbsoluteFill>
      {/* Luminous Pastel SaaS Background inspired by the Reference Video */}
      <VideoBackground />

      {/* Subtle Brand Pill at Top Safe Area */}
      <BrandHeader />

      {/* Narrative Visual Scenes */}
      {SCENES.map((scene) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationInFrames}
          name={scene.title}
        >
          {renderScene(scene.id, scene.durationInFrames)}
        </Sequence>
      ))}

      {/* Word-by-Word & Phrase-Level Bengali Caption Bar */}
      <CaptionBar />

      {/* Voice-Over + Frame-Accurate Synthesized SFX */}
      <SoundTrack />
    </AbsoluteFill>
  );
};

