// Splits a statement into words for the scroll colour fill (see Fx). *Marked* words light up in cyan.
// Intl.Segmenter keeps Thai, Chinese and Vietnamese word boundaries intact.
export function Statement({ text, lang }: { text: string; lang: string }) {
  const seg = new Intl.Segmenter(lang === 'cn' ? 'zh' : lang === 'vn' ? 'vi' : lang, { granularity: 'word' });
  const words: Array<{ t: string; hl: boolean }> = [];
  text.split(/(\*[^*]+\*)/).forEach((part) => {
    const hl = part.startsWith('*') && part.endsWith('*');
    for (const s of seg.segment(hl ? part.slice(1, -1) : part)) words.push({ t: s.segment, hl });
  });
  return (
    <p className="statement" data-fill>
      {words.map((w, i) =>
        w.t.trim() ? (
          <span key={i} className={w.hl ? 'w hl' : 'w'}>
            {w.t}
          </span>
        ) : (
          w.t
        ),
      )}
    </p>
  );
}
