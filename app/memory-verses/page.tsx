import MemoryVerseClient from "./MemoryVerseClient";
import memoryVersesData from "@/public/memory-verses.json";
import {
  ScriptureHeader,
  ScriptureFooter,
} from "@/app/components/ScriptureShell";
export const metadata = {
  title: "Scripture Memory Coach — Divine Pilgrim",
  description:
    "Read, practise and recall Sacred Scripture with a gentle daily memory companion.",
};
export default function MemoryVersesPage() {
  return (
    <main className="scripture-shell">
      <div className="scripture-container">
        <ScriptureHeader
          active="memory"
          eyebrow="WORDS TO KEEP CLOSE"
          title="Let His Word"
          emphasis="take root."
          description="One verse at a time. Read it slowly, practise with care, and carry it into your day."
        />
        <MemoryVerseClient verses={memoryVersesData} />
        <details className="scripture-how">
          <summary>
            A gentle rhythm for lasting memory <span>+</span>
          </summary>
          <div>
            <p>
              <strong>Read & listen.</strong> Make room for the verse and its
              meaning.
            </p>
            <p>
              <strong>Write & practise.</strong> Type the words, then recall
              them with fewer hints.
            </p>
            <p>
              <strong>Return & remember.</strong> Revisit verses as reviews
              become due.
            </p>
            <p>
              Your progress is saved in this browser. Practice Mode lets you
              review without changing your daily completion.
            </p>
          </div>
        </details>
        <ScriptureFooter />
      </div>
    </main>
  );
}
