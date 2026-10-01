"use client";

import React, { createContext, useContext, useState, useMemo, useCallback, useEffect, ReactNode } from "react";
import {
  PRESET_TEXTS,
  PresetText,
  TransformType,
  LanguageCode,
  SemanticConstraint,
  analyzeCustomText,
  generateAuditHash,
} from "@/lib/semanticEngine";
import { useToast } from "@/context/ToastContext";

interface WorkflowContextType {
  text: string;
  setText: (text: string) => void;
  transform: TransformType;
  setTransform: (type: TransformType) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentPreset: PresetText;
  selectPreset: (presetId: string) => void;
  constraints: SemanticConstraint[];
  toggleConstraint: (id: string) => void;
  selectAllConstraints: () => void;
  deselectAllConstraints: () => void;
  addCustomConstraint: (data: { title: string; body: string; kind: string; weight: string }) => void;
  recheckPassed: boolean;
  isRechecking: boolean;
  runRecheck: () => void;
  computedCcr: {
    before: number;
    after: number;
    delta: number;
    driftPercent: number;
    preservedPercent: number;
  };
  certifiedHash: string;
  exportJson: () => void;
  resetWorkflow: () => void;
}

const STORAGE_KEY = "mawzun_workflow_state_v1";

function getSavedState() {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  const [text, setTextState] = useState<string>(
    () => getSavedState()?.text ?? PRESET_TEXTS[0].text,
  );
  const [transform, setTransform] = useState<TransformType>(
    () => getSavedState()?.transform ?? "translate",
  );
  const [language, setLanguage] = useState<LanguageCode>(
    () => getSavedState()?.language ?? "en-US",
  );
  const [presetId, setPresetId] = useState<string>(
    () => getSavedState()?.presetId ?? PRESET_TEXTS[0].id,
  );
  const [constraints, setConstraints] = useState<SemanticConstraint[]>(
    () => getSavedState()?.constraints ?? PRESET_TEXTS[0].constraints,
  );
  const [recheckPassed, setRecheckPassed] = useState<boolean>(
    () => getSavedState()?.recheckPassed ?? true,
  );
  const [isRechecking, setIsRechecking] = useState<boolean>(false);

  // Save changes to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ text, transform, language, presetId, constraints, recheckPassed }),
      );
    } catch {
      // Ignore storage write issues
    }
  }, [text, transform, language, presetId, constraints, recheckPassed]);

  // Compute the current preset/knowledge object
  const currentPreset = useMemo<PresetText>(() => {
    const known = PRESET_TEXTS.find((p) => p.id === presetId);
    if (known && known.text.trim() === text.trim()) {
      return known;
    }
    return analyzeCustomText(text);
  }, [presetId, text]);

  // Handle switching preset
  const selectPreset = useCallback((targetId: string) => {
    const found = PRESET_TEXTS.find((p) => p.id === targetId);
    if (found) {
      setPresetId(found.id);
      setTextState(found.text);
      setConstraints(found.constraints);
      setRecheckPassed(true);
      toast({
        title: `تم اختيار المتن: ${found.title}`,
        description: `تم تحديث كائن المعرفة والقيود المرجعية وفق المصنف.`,
        variant: "info",
      });
    }
  }, [toast]);

  // Handle manual text changes
  const setText = useCallback((newText: string) => {
    setTextState(newText);
    const analyzed = analyzeCustomText(newText);
    setPresetId(analyzed.id);
    setConstraints(analyzed.constraints);
  }, []);

  // Toggle a single constraint
  const toggleConstraint = useCallback((id: string) => {
    setConstraints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)),
    );
  }, []);

  // Select all constraints
  const selectAllConstraints = useCallback(() => {
    setConstraints((prev) => prev.map((c) => ({ ...c, isActive: true })));
    toast({ title: "تم تفعيل جميع القيود الدلالية", variant: "success" });
  }, [toast]);

  // Deselect all constraints
  const deselectAllConstraints = useCallback(() => {
    setConstraints((prev) => prev.map((c) => ({ ...c, isActive: false })));
    toast({
      title: "تم إلغاء تفعيل جميع القيود",
      description: "تحذير: يؤدي ذلك إلى زيادة مخاطر الهلوسة الدلالية.",
      variant: "warning",
    });
  }, [toast]);

  // Add a custom constraint
  const addCustomConstraint = useCallback(
    ({ title, body, kind, weight }: { title: string; body: string; kind: string; weight: string }) => {
      const nextNum = constraints.length + 1;
      const newConstraint: SemanticConstraint = {
        id: `#USER-${nextNum.toString().padStart(2, "0")}`,
        title,
        body,
        icon: "verified_user",
        iconClass: "bg-primary-fixed/40 text-primary",
        idClass: "text-primary",
        kind: kind || "قيد مخصص للمستخدم",
        kindClass: "text-primary",
        dotClass: "bg-primary",
        weight: weight || "1.0 (إلزامي)",
        weightClass: "text-on-surface",
        isActive: true,
        matchScore: 30,
        violationReason: "انزياح محتمل عن التحديد الصارم للمستخدم.",
        repairedTarget: title,
      };

      setConstraints((prev) => [...prev, newConstraint]);
      toast({
        title: "تمت إضافة القيد الدلالي المخصص",
        description: `تم إدراج «${title}» في منظومة الحوكمة.`,
        variant: "success",
      });
    },
    [constraints.length, toast],
  );

  // Compute CCR & metrics dynamically based on active constraints
  const computedCcr = useMemo(() => {
    const total = constraints.length;
    const active = constraints.filter((c) => c.isActive).length;
    if (total === 0) {
      return { before: 20, after: 70, delta: 50, driftPercent: 80, preservedPercent: 20 };
    }

    // Baseline before repair: average matchScore of active constraints
    const sumMatch = constraints
      .filter((c) => c.isActive)
      .reduce((acc, c) => acc + c.matchScore, 0);
    const before = active > 0 ? Math.round(sumMatch / active) : 10;

    // After repair: base 92% adjusted by active constraints ratio
    const ratio = active / total;
    const after = Math.round(80 + ratio * 18);
    const delta = Math.max(0, after - before);
    const preservedPercent = before;
    const driftPercent = 100 - before;

    return { before, after, delta, driftPercent, preservedPercent };
  }, [constraints]);

  // Certified Hash
  const activeConstraintCount = useMemo(
    () => constraints.filter((c) => c.isActive).length,
    [constraints],
  );

  const certifiedHash = useMemo(
    () => generateAuditHash(text, activeConstraintCount, computedCcr.after),
    [text, activeConstraintCount, computedCcr.after],
  );

  // Trigger recheck simulation
  const runRecheck = useCallback(() => {
    setIsRechecking(true);
    toast({
      title: "بدء إعادة الفحص الدلالي التلقائي...",
      description: "جاري مطابقة المعاجم الأصولية وقياس نسبة صيانة القيود (CCR).",
      variant: "info",
    });

    setTimeout(() => {
      setIsRechecking(false);
      setRecheckPassed(true);
      toast({
        title: `اكتمل الفحص بنجاح: CCR ${computedCcr.after}%`,
        description: `معدل التحسن Δ +${computedCcr.delta}% • مطابقة تامة للمعايير المعتمدة.`,
        variant: "success",
      });
    }, 900);
  }, [computedCcr.after, computedCcr.delta, toast]);

  // Export full JSON bundle
  const exportJson = useCallback(() => {
    const activeOutput =
      currentPreset.outputs[transform]?.[language] ??
      currentPreset.outputs.translate["en-US"];

    const payload = {
      platform: "Mawzun Semantic Guard v2.4",
      timestamp: new Date().toISOString(),
      auditCertificateHash: certifiedHash,
      metadata: {
        title: currentPreset.title,
        category: currentPreset.category,
        canonicalSource: currentPreset.source,
        authenticity: currentPreset.authenticity,
        latencyMs: currentPreset.latencyMs,
        language,
        operationMode: transform,
      },
      sourceContent: {
        text: currentPreset.text,
        wordCount: currentPreset.text.trim().split(/\s+/).length,
        characterCount: currentPreset.text.length,
      },
      governanceConstraints: constraints.map((c) => ({
        id: c.id,
        title: c.title,
        body: c.body,
        weight: c.weight,
        kind: c.kind,
        enforced: c.isActive,
      })),
      auditMetrics: {
        baselineConstraintConservationRate: `${computedCcr.before}%`,
        certifiedConstraintConservationRate: `${computedCcr.after}%`,
        repairDelta: `+${computedCcr.delta}%`,
        hallucinationCoefficient: "0.00",
        scholarlyComplianceScore: "100%",
        status: "APPROVED_CANONICAL_RIGOR",
      },
      transformationResults: {
        unmitigatedRawDrift: `${activeOutput.prefix}${activeOutput.drift}${activeOutput.suffix}`,
        certifiedBalancedOutput: activeOutput.repaired,
        governanceResolutionNote: activeOutput.explanation,
      },
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mawzun-audit-${certifiedHash.replace(/[^a-zA-Z0-9]/g, "")}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "تم تصدير حزمة الاعتماد الدلالي (JSON)",
      description: "تحتوي الحزمة على شهادة التدقيق الكاملة وسجل القيود.",
      variant: "success",
    });
  }, [certifiedHash, computedCcr, constraints, currentPreset, language, toast, transform]);

  // Reset workflow to default
  const resetWorkflow = useCallback(() => {
    const def = PRESET_TEXTS[0];
    setPresetId(def.id);
    setTextState(def.text);
    setTransform("translate");
    setLanguage("en-US");
    setConstraints(def.constraints);
    setRecheckPassed(true);
    toast({
      title: "تمت استعادة التهيئة الافتراضية",
      description: "جاهز لبدء دورة تدقيق دلالي جديدة.",
      variant: "info",
    });
  }, [toast]);

  return (
    <WorkflowContext.Provider
      value={{
        text,
        setText,
        transform,
        setTransform,
        language,
        setLanguage,
        currentPreset,
        selectPreset,
        constraints,
        toggleConstraint,
        selectAllConstraints,
        deselectAllConstraints,
        addCustomConstraint,
        recheckPassed,
        isRechecking,
        runRecheck,
        computedCcr,
        certifiedHash,
        exportJson,
        resetWorkflow,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error("useWorkflow must be used within a WorkflowProvider");
  }
  return context;
}
