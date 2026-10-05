import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "light";
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  onClick,
  variant = "primary",
  arrow = false,
  className,
  children,
}: Props) {
  const classes = cn(
    "group relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-sm font-medium transition-all duration-300",
    variant === "primary" &&
      "bg-brand text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_20px_-6px_rgba(37,99,235,0.5)] hover:bg-brand-bright",
    variant === "secondary" &&
      "border border-border bg-white text-foreground hover:border-foreground/20 hover:bg-surface",
    variant === "light" &&
      "bg-white text-brand-deep shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:bg-white/90",
    className
  );

  const content = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1/2 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]"
        />
      )}
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}