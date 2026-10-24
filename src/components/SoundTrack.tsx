import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';
import { SOUND_EVENTS } from '../data/soundEvents';

export const SoundTrack: React.FC = () => {
  return (
    <>
      {/* Primary Bengali Voice-Over Recording */}
      <Audio src={staticFile('audio/voiceover.wav')} volume={1.0} />

      {/* Frame-Synchronized UI & Motion SFX */}
      {SOUND_EVENTS.map((ev) => (
        <Sequence
          key={ev.id}
          from={ev.startFrame}
          durationInFrames={ev.durationInFrames}
        >
          <Audio src={staticFile(ev.asset)} volume={ev.volume} />
        </Sequence>
      ))}
    </>
  );
};

