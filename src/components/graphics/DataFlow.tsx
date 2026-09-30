// Side-by-side comparison (stacked on phones): company data leaking to a
// public model versus staying inside a private boundary.

function Doc({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} className="flow-doc">
      <path d="M0 0h16l6 6v22H0z" />
      <path d="M4 11h13M4 16h13M4 21h9" />
    </g>
  );
}

export function DataFlow() {
  return (
    <div className="flow">
      <figure className="flow-panel">
        <svg className="flow-svg" viewBox="0 0 300 220" role="img" aria-labelledby="flow-public">
          <title id="flow-public">With public AI, company documents leave your network for unknown servers.</title>
          <rect x={2} y={30} width={150} height={170} className="flow-zone" />
          <text x={14} y={52} className="flow-caption">Your company</text>
          <Doc x={22} y={80} />
          <Doc x={62} y={100} />
          <Doc x={102} y={75} />
          <Doc x={42} y={150} />
          <Doc x={92} y={145} />
          <path d="M132 100 C 190 80, 210 64, 236 62" className="flow-leak" />
          <path d="M132 160 C 196 150, 216 110, 240 90" className="flow-leak flow-leak--late" />
          <g transform="translate(232 36)">
            <path d="M8 52a16 16 0 0 1 0-32 20 20 0 0 1 38-6 16 16 0 0 1 4 38z" className="flow-cloud" />
          </g>
          <text x={260} y={110} textAnchor="middle" className="flow-caption">Unknown</text>
          <text x={260} y={124} textAnchor="middle" className="flow-caption">servers</text>
        </svg>
        <figcaption>
          <strong className="flow-heading flow-heading--bad">Public AI</strong>
          Prompts, files and IP leave your control.
        </figcaption>
      </figure>
      <figure className="flow-panel">
        <svg className="flow-svg" viewBox="0 0 300 220" role="img" aria-labelledby="flow-private">
          <title id="flow-private">With private AI, data and model stay inside your boundary.</title>
          <rect x={2} y={30} width={296} height={170} className="flow-zone flow-zone--secure" />
          <text x={14} y={52} className="flow-caption">Your boundary</text>
          <Doc x={30} y={80} />
          <Doc x={70} y={104} />
          <Doc x={34} y={148} />
          <g transform="translate(210 120)">
            <circle r={30} className="flow-model" />
            <circle r={44} className="flow-model-ring" />
            <text y={5} textAnchor="middle" className="flow-model-text">AI</text>
          </g>
          <path d="M96 100 C 130 80, 160 88, 178 108" className="flow-loop" />
          <path d="M180 134 C 160 172, 110 176, 62 166" className="flow-loop flow-loop--late" />
        </svg>
        <figcaption>
          <strong className="flow-heading flow-heading--good">Private AI</strong>
          Data, model and audit trail stay inside.
        </figcaption>
      </figure>
    </div>
  );
}
