"use client";

import { Player } from "@remotion/player";
import { Teaser, VIDEO_CONFIG, SLIDES } from "@/remotion";

export default function TeaserPlayer() {
  const totalFrames = SLIDES.length * 4 * VIDEO_CONFIG.fps;

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <Player
        component={Teaser}
        compositionWidth={VIDEO_CONFIG.width}
        compositionHeight={VIDEO_CONFIG.height}
        durationInFrames={totalFrames}
        fps={VIDEO_CONFIG.fps}
        style={{ width: "100%", height: "auto" }}
        controls
        autoPlay
        loop
        acknowledgeRemotionLicense
      />
    </div>
  );
}
