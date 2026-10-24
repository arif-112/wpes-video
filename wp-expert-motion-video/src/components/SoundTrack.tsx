import React from 'react';
import { Audio, Sequence, interpolate, staticFile, useVideoConfig } from 'remotion';
import { SOUND_EVENTS, SFX_DURATION } from '../data/soundEvents';
import { frameAt, VIDEO } from '../data/scenes';

/**
 * Voice-over stays at unity gain and dominates the mix; the SFX bed sits
 * between 0.14 and 0.34 with short fades so nothing clicks or clips.
 */
export const SoundTrack: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <>
      <Audio src={staticFile(VIDEO.voiceover)} volume={1} />

      {SOUND_EVENTS.map((ev) => {
        const durationInFrames = Math.ceil(SFX_DURATION[ev.sfx] * fps) + 2;
        const fadeOutStart = Math.max(1, durationInFrames - Math.round(SFX_DURATION[ev.sfx] * fps * 0.3));
        return (
          <Sequence
            key={ev.id}
            from={frameAt(ev.at)}
            durationInFrames={durationInFrames}
            name={`sfx:${ev.sfx}`}
          >
            <Audio
              src={staticFile(`sfx/${ev.sfx}.wav`)}
              volume={(f) =>
                interpolate(f, [0, 2, fadeOutStart, durationInFrames], [0, ev.volume, ev.volume, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })
              }
            />
          </Sequence>
        );
      })}
    </>
  );
};
