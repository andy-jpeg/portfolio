type SectionHeaderProps = {
  title: string;
  description: string;
};

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <header>
      <h2 className="text-6xl uppercase tracking-tight text-black">{title}</h2>
      <p className="mt-2 text-xl" style={{ fontFamily: "Anonymous Pro" }}>
        {description}
      </p>
    </header>
  );
}
