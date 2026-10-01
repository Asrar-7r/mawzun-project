"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";
import { useWorkflow } from "@/context/WorkflowContext";
import { GraphNode } from "@/lib/semanticEngine";

export function SemanticGraph() {
  const { currentPreset } = useWorkflow();
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(
    currentPreset.graphNodes[0] ?? null,
  );

  const nodes = currentPreset.graphNodes;

  return (
    <div className="flex flex-col w-full gap-3">
      <div className="relative overflow-hidden rounded-xl bg-surface p-2">
        <svg
          className="h-44 w-full text-on-surface"
          viewBox="0 0 400 160"
          fill="none"
          role="img"
          aria-label="رسم بياني للعلاقات الدلالية المستخرجة"
        >
          {/* Connection Lines */}
          <path
            d="M 80 80 L 200 45"
            stroke="#0f766e"
            strokeDasharray="3 3"
            strokeOpacity="0.4"
            strokeWidth="2"
          />
          <path
            d="M 80 80 L 200 115"
            stroke="#863b00"
            strokeDasharray="3 3"
            strokeOpacity="0.4"
            strokeWidth="2"
          />
          <path d="M 200 45 L 320 80" stroke="#005c55" strokeOpacity="0.5" strokeWidth="2" />
          <path d="M 200 115 L 320 80" stroke="#005c55" strokeOpacity="0.5" strokeWidth="2" />

          {/* Render Nodes */}
          {nodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const isSource = node.type === "source";
            const isTopic = node.type === "topic";
            const isCause = node.type === "cause";
            const isSynthesis = node.type === "synthesis";

            const width = isSynthesis ? 110 : 100;
            const height = 50;

            let fill = "#ffffff";
            let stroke = "#bdc9c6";
            let textColor = "#0b1c30";

            if (isSource) {
              fill = "#eff4ff";
              stroke = "#0f766e";
              textColor = "#005c55";
            } else if (isSynthesis) {
              fill = "#0f766e";
              stroke = "#005c55";
              textColor = "#ffffff";
            }

            if (isSelected) {
              stroke = "#005c55";
            }

            return (
              <g
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className="cursor-pointer transition-transform hover:scale-105"
                role="button"
                tabIndex={0}
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width={width}
                  height={height}
                  rx="8"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isSelected ? "2.5" : "1.5"}
                  className="transition-all"
                />

                {isTopic && <circle cx={node.x + 15} cy={node.y + 15} r="4" fill="#0f766e" />}
                {isCause && <circle cx={node.x + 15} cy={node.y + 15} r="4" fill="#863b00" />}

                <text
                  x={node.x + width / 2}
                  y={node.y + 22}
                  fill={textColor}
                  fontSize="11"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {node.title}
                </text>
                <text
                  x={node.x + width / 2}
                  y={node.y + 38}
                  fill={isSynthesis ? "#a3faef" : "#545f73"}
                  fontSize="9.5"
                  textAnchor="middle"
                >
                  {node.subtitle}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Inspector Pill */}
      {selectedNode && (
        <div className="rounded-xl bg-surface-container-low p-3 flex items-start gap-2.5 border border-primary/10">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-fixed/40 text-primary mt-0.5">
            <Icon name="search_insights" className="text-sm" />
          </span>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className={cx(t.labelSm, "font-bold text-on-surface")}>
                {selectedNode.title}
              </span>
              {selectedNode.badge && (
                <span className={cx(t.code, "rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary font-semibold")}>
                  {selectedNode.badge}
                </span>
              )}
            </div>
            <p className={cx(t.bodySm, "text-on-surface-variant text-xs mt-0.5 leading-relaxed")}>
              {selectedNode.details || "عنصر دلالي محوري تم استخلاصه وضبطه بواسطة محرك موزون."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function SemanticGraphCard() {
  const { currentPreset } = useWorkflow();

  const nodeCount = currentPreset.graphNodes.length;
  const edgeCount = currentPreset.graphEdges.length;

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
          رسم بياني للعلاقات الدلالية المستخرجة تلقائيًا لتوجيه نماذج الذكاء الاصطناعي التوليدية. انقر فوق أي عقدة لمعاينتها.
        </p>

        <div className="my-space-md bg-surface p-space-sm rounded-xl flex items-center justify-center">
          <SemanticGraph />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-space-xs pt-space-xs text-center">
        <div className="bg-surface-container-low p-2 rounded-lg">
          <span className="block font-label-sm text-label-sm text-secondary">عُقد المعرفة</span>
          <span className="font-code-sm text-code-sm font-bold text-on-surface">
            {nodeCount} Nodes
          </span>
        </div>
        <div className="bg-surface-container-low p-2 rounded-lg">
          <span className="block font-label-sm text-label-sm text-secondary">روابط التأصيل</span>
          <span className="font-code-sm text-code-sm font-bold text-on-surface">
            {edgeCount} Edges
          </span>
        </div>
        <div className="bg-surface-container-low p-2 rounded-lg">
          <span className="block font-label-sm text-label-sm text-secondary">الثقة الدلالية</span>
          <span className="font-code-sm text-code-sm font-bold text-primary">0.998</span>
        </div>
      </div>
    </div>
  );
}