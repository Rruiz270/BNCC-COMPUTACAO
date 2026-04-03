export default function TeaserPlayer() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <video
        src="/teaser.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto"
      />
    </div>
  );
}
