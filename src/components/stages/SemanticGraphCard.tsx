import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

/**
 * Conceptual semantic graph of the extracted knowledge object, transcribed from
 * the Stitch export. Node labels stay inline in the SVG because they are
 * positioned per node.
 */
export function SemanticGraph() {
  return (
    <svg
      className="h-40 w-full text-on-surface"
      viewBox="0 0 400 160"
      fill="none"
      role="img"
      aria-label="رسم بياني للعلاقات الدلالية: المتن النبوي، موضوع النية، العلة والمعلول، الأثر والجزاء"
    >
      {/* Connections */}
      <path
        d="M 80 80 L 200 45"
        stroke="currentColor"
        strokeDasharray="3 3"
        strokeOpacity="0.15"
        strokeWidth="2"
      />
      <path
        d="M 80 80 L 200 115"
        stroke="currentColor"
        strokeDasharray="3 3"
        strokeOpacity="0.15"
        strokeWidth="2"
      />
      <path d="M 200 45 L 320 80" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path d="M 200 115 L 320 80" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />

      {/* Node: source text */}
      <g>
        <rect
          x="20"
          y="55"
          width="100"
          height="50"
          rx="8"
          fill="#e5eeff"
          stroke="#0f766e"
          strokeWidth="1.5"
        />
        <text
          x="70"
          y="77"
          fill="#005c55"
          fontSize="11"
          fontWeight="700"
          textAnchor="middle"
        >
          المتن النبوي
        </text>
        <text x="70" y="93" fill="#545f73" fontSize="9" textAnchor="middle">
          الأعمال بالنيات
        </text>
      </g>

      {/* Node: topic / intention */}
      <g>
        <rect
          x="150"
          y="20"
          width="100"
          height="50"
          rx="8"
          fill="#ffffff"
          stroke="#bdc9c6"
          strokeWidth="1"
        />
        <circle cx="165" cy="35" r="4" fill="#0f766e" />
        <text
          x="200"
          y="42"
          fill="#0b1c30"
          fontSize="11"
          fontWeight="600"
          textAnchor="middle"
        >
          الموضوع: النية
        </text>
        <text x="200" y="58" fill="#545f73" fontSize="9" textAnchor="middle">
          مناط الصحة والقبول
        </text>
      </g>

      {/* Node: cause and effect */}
      <g>
        <rect
          x="150"
          y="90"
          width="100"
          height="50"
          rx="8"
          fill="#ffffff"
          stroke="#bdc9c6"
          strokeWidth="1"
        />
        <circle cx="165" cy="105" r="4" fill="#863b00" />
        <text
          x="200"
          y="112"
          fill="#0b1c30"
          fontSize="11"
          fontWeight="600"
          textAnchor="middle"
        >
          العلة والمعلول
        </text>
        <text x="200" y="128" fill="#545f73" fontSize="9" textAnchor="middle">
          ارتباط العمل بالقصد
        </text>
      </g>

      {/* Node: synthesis */}
      <g>
        <rect x="270" y="55" width="110" height="50" rx="8" fill="#0f766e" />
        <text
          x="325"
          y="77"
          fill="#ffffff"
          fontSize="11"
          fontWeight="700"
          textAnchor="middle"
        >
          الأثر والجزاء
        </text>
        <text x="325" y="93" fill="#a3faef" fontSize="9" textAnchor="middle">
          لكل امرئ ما نوى
        </text>
      </g>
    </svg>
  );
}

const GRAPH_STATS = [
  { label: "عُقد المعرفة", value: "4 Nodes", tone: "text-on-surface" },
  { label: "روابط التأصيل", value: "5 Edges", tone: "text-on-surface" },
  { label: "الثقة الدلالية", value: "0.998", tone: "text-primary" },
] as const;

export function SemanticGraphCard() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-space-xs pb-space-sm">
          <Icon name="schema" className="text-lg text-primary" />
          <span className="font-label-md text-label-md text-on-surface font-bold">
            بنية كائن المعرفة (Knowledge Object)
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          رسم بياني للعلاقات الدلالية المستخرجة تلقائيًا لتوجيه نماذج الذكاء الاصطناعي التوليدية.
        </p>

        <div className="my-space-md bg-surface p-space-md rounded-xl flex items-center justify-center">
          <SemanticGraph />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-space-xs pt-space-xs text-center">
        {GRAPH_STATS.map((stat) => (
          <div key={stat.label} className="bg-surface-container-low p-2 rounded-lg">
            <span className="block font-label-sm text-label-sm text-secondary">{stat.label}</span>
            <span className={cx("font-code-sm text-code-sm font-bold", stat.tone)}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}