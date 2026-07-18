/**
 * Placeholder visual for research thumbnails and gallery photos: a purple
 * gradient with a subtle grid — swap for real images by replacing this
 * component's usage with next/image.
 */
export default function GradientThumb({
  colors,
  label,
  className = "",
}: {
  colors: [string, string];
  label?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${colors[0]}66, ${colors[1]}) , ${colors[1]}`,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(224,170,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(224,170,255,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute -inset-8"
        style={{
          background: `radial-gradient(circle at 70% 30%, ${colors[0]}55, transparent 55%)`,
        }}
      />
      {label && (
        <span className="absolute bottom-2 left-3 font-mono text-[0.6rem] tracking-[0.2em] text-white/60 uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
