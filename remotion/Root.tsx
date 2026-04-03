import React from "react";
import { Composition } from "remotion";
import { Teaser } from "./Teaser";
import { VIDEO_CONFIG, SLIDES } from "./constants";

export const RemotionRoot: React.FC = () => {
  const totalFrames = SLIDES.length * 4 * VIDEO_CONFIG.fps;

  return (
    <Composition
      id="Teaser"
      component={Teaser}
      durationInFrames={totalFrames}
      fps={VIDEO_CONFIG.fps}
      width={VIDEO_CONFIG.width}
      height={VIDEO_CONFIG.height}
    />
  );
};
