import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold text-white">
        <Image src="/oxcodx-logo.png" alt="OxCodx Logo" width={28} height={28} />
      </span>
      <span className="text-lg font-semibold tracking-tight">Ox<span className="text-brand-deep">Codx</span></span>
    </Link>
  );
}