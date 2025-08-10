export default function Footnote({ n }: { n: number }) {
  return (
    <sup>
      <a 
        href={`/references#${n}`} 
        aria-label={`Reference ${n}`}
        className="text-blue-600 hover:text-blue-800 underline"
      >
        [{n}]
      </a>
    </sup>
  );
}