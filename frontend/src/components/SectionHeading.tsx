interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  lede?: string;
}

export default function SectionHeading({ eyebrow, title, lede }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {lede && (
        <p className="mt-4 max-w-2xl leading-relaxed text-mist/80">{lede}</p>
      )}
    </div>
  );
}
