export function SweepCard({
  index = 0,
  children,
}: {
  index?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl bg-white/10 p-px">
      <div
        aria-hidden
        className="border-sweep absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0 72%, rgba(96,165,250,0.95) 88%, transparent 100%)",
          animationDelay: `${-index * 1.75}s`,
        }}
      />
      <div className="relative h-full rounded-[15px] bg-[#080d22] p-7">{children}</div>
    </div>
  );
}