import { isSectionVisible } from "@/app/lib/sectionVisibility";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";
export function ScriptureHeader({
  active,
  eyebrow,
  title,
  emphasis,
  description,
}: {
  active: "challenge" | "memory";
  eyebrow: string;
  title: string;
  emphasis: string;
  description: string;
}) {
  return (
    <>
      <Link className="scripture-back" href="/">
        <ArrowLeft size={14} /> Home <span>/ A life in the Word</span>
      </Link>
      <header className="scripture-heading">
        <div>
          <p className="pilgrim-eyebrow">{eyebrow}</p>
          <h1>
            {title}
            <br />
            <em>{emphasis}</em>
          </h1>
          <p>{description}</p>
        </div>
        <BookOpen
          className="scripture-heading-icon"
          size={90}
          strokeWidth={0.65}
          aria-hidden="true"
        />
      </header>
      <nav className="scripture-tabs" aria-label="Scripture tools">
        <Link
          href="/challenge"
          aria-current={active === "challenge" ? "page" : undefined}
        >
          <span>01</span> Daily Scripture Challenge <ArrowUpRight size={15} />
        </Link>
        {isSectionVisible("/memory-verses") && (
        <Link
          href="/memory-verses"
          aria-current={active === "memory" ? "page" : undefined}
        >
          <span>02</span> Scripture Memory Coach <ArrowUpRight size={15} />
        </Link>
        )}
      </nav>
    </>
  );
}
export function ScriptureFooter() {
  return (
    <footer className="scripture-footer">
      <p>
        A little each day. <em>Rooted for a lifetime.</em>
      </p>
      <Link href="/">
        Return to Divine Pilgrim <ArrowUpRight size={15} />
      </Link>
    </footer>
  );
}
