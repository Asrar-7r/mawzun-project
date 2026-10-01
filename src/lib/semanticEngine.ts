export type TransformType = "translate" | "summarize" | "paraphrase";

export type LanguageCode = "en-US" | "fr" | "id" | "ur";

export interface LanguageOption {
  code: LanguageCode;
  short: string;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
}

export const LANGUAGES: readonly LanguageOption[] = [
  { code: "en-US", short: "en", name: "الإنجليزية", nativeName: "English (US)", dir: "ltr" },
  { code: "fr", short: "fr", name: "الفرنسية", nativeName: "Français", dir: "ltr" },
  { code: "id", short: "id", name: "الإندونيسية", nativeName: "Bahasa Indonesia", dir: "ltr" },
  { code: "ur", short: "ur", name: "الأردو", nativeName: "اردو", dir: "rtl" },
];

export interface SemanticConstraint {
  id: string;
  title: string;
  body: string;
  icon: string;
  iconClass: string;
  idClass: string;
  kind: string;
  kindClass: string;
  dotClass: string;
  weight: string;
  weightClass: string;
  isActive: boolean;
  matchScore: number; // percentage match before repair
  violationReason?: string;
  repairedTarget?: string;
}

export interface GraphNode {
  id: string;
  title: string;
  subtitle: string;
  x: number;
  y: number;
  type: "source" | "topic" | "cause" | "synthesis";
  badge?: string;
  details?: string;
}

export interface GraphEdge {
  from: string;
  to: string;
  label?: string;
}

export interface SemanticInsight {
  eyebrow: string;
  title: string;
  icon: string;
  iconClass: string;
  value: string;
  valueClass: string;
  body: string;
  footerIcon: string;
  footer: string;
  footerClass: string;
}

export interface OutputVariant {
  prefix: string;
  drift: string;
  suffix: string;
  repaired: string;
  explanation: string;
}

export interface PresetText {
  id: string;
  title: string;
  category: string;
  source: string;
  authenticity: string;
  latencyMs: number;
  text: string;
  insights: SemanticInsight[];
  graphNodes: GraphNode[];
  graphEdges: GraphEdge[];
  constraints: SemanticConstraint[];
  outputs: {
    translate: Record<LanguageCode, OutputVariant>;
    summarize: Record<LanguageCode, OutputVariant>;
    paraphrase: Record<LanguageCode, OutputVariant>;
  };
}

export const PRESET_TEXTS: PresetText[] = [
  {
    id: "hadith-niyyah",
    title: "حديث النية (إنما الأعمال بالنيات)",
    category: "حديث نبوي شريف",
    source: "صحيح البخاري (الحديث الأول، باب بدء الوحي)",
    authenticity: "قطعية الثبوت والدلالة • متفق عليه",
    latencyMs: 140,
    text: "«إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى.»",
    insights: [
      {
        eyebrow: "تصنيف المتن والوعاء",
        title: "نوع المحتوى",
        icon: "menu_book",
        iconClass: "bg-primary-fixed/40 text-primary",
        value: "حديث نبوي شريف",
        valueClass: "text-primary",
        body: "تمت مطابقة السند والمتن مع صحيح البخاري، الحديث الأول في باب بدء الوحي، برواية أمير المؤمنين عمر بن الخطاب رضي الله عنه.",
        footerIcon: "verified_user",
        footer: "مدقق آليًا ومطابق للمصنفات الحديثية",
        footerClass: "text-primary",
      },
      {
        eyebrow: "المجال المقاصدي والفقهي",
        title: "الموضوع",
        icon: "category",
        iconClass: "bg-secondary-container text-secondary",
        value: "النِّيَّة (الإخلاص والقصد)",
        valueClass: "text-primary",
        body: "يقع في أصل أبواب الفقه الإسلامي: تمييز العبادات عن العادات، وتمييز رتب العبادات بعضها عن بعض، وقاعدة الأمور بمقاصدها.",
        footerIcon: "hub",
        footer: "تصنيف مقاصدي فقهي (العبادات والمعاملات)",
        footerClass: "text-secondary",
      },
      {
        eyebrow: "الارتباط المنطقي والسببي",
        title: "الفكرة الأساسية",
        icon: "link",
        iconClass: "bg-surface-container-high text-primary-container",
        value: "الأعمال مرتبطة بالنيات صحةً وقبولاً",
        valueClass: "text-on-surface",
        body: "تحديد حصر جنس العمل المعتبر شرعًا بوجود نيته وقصده، بحيث لا يترتب ثواب أو حكم استحقاقي بغير عزم الإرادة القلبية.",
        footerIcon: "balance",
        footer: "رابط العلة بالمعلول ومقصد العمل الشرعي",
        footerClass: "text-primary",
      },
      {
        eyebrow: "الاستحقاق والأثر التشريعي",
        title: "المعنى الأساسي والأثر",
        icon: "account_balance_wallet",
        iconClass: "bg-tertiary-fixed text-tertiary",
        value: "لكل شخص ما نواه في الجزاء والمآل",
        valueClass: "text-on-surface",
        body: "دلالة فردية المسؤولية وتعين الأثر الأخروي والدنيوي على وفق النية الحقيقية الباطنة، وليس فقط القالب الصوري الظاهر للعمل.",
        footerIcon: "flag",
        footer: "دلالة الأثر والجزاء الأخروي والدنيوي الفردي",
        footerClass: "text-tertiary",
      },
    ],
    graphNodes: [
      {
        id: "source",
        title: "المتن النبوي",
        subtitle: "الأعمال بالنيات",
        x: 20,
        y: 55,
        type: "source",
        badge: "الأصل المعتمد",
        details: "المتن الأصلي المروي في الصحيحين بأعلى درجات التوثيق الإسنادي.",
      },
      {
        id: "topic",
        title: "الموضوع: النية",
        subtitle: "مناط الصحة والقبول",
        x: 150,
        y: 20,
        type: "topic",
        badge: "أصل العبادات",
        details: "القصد القلبي الباعث على الفعل وهو الفارق بين العادة والعبادة.",
      },
      {
        id: "cause",
        title: "العلة والمعلول",
        subtitle: "ارتباط العمل بالقصد",
        x: 150,
        y: 90,
        type: "cause",
        badge: "علاقة سببية",
        details: "حرف الباء للمصاحبة والسببية الشرعية: صحة العمل معللة بوجود النية.",
      },
      {
        id: "synthesis",
        title: "الأثر والجزاء",
        subtitle: "لكل امرئ ما نوى",
        x: 270,
        y: 55,
        type: "synthesis",
        badge: "حكم شرعي فردي",
        details: "المسؤولية الفردية الجزائية: الجزاء دائر مع النية الحقيقية نفياً وإثباتاً.",
      },
    ],
    graphEdges: [
      { from: "source", to: "topic", label: "تأصيل" },
      { from: "source", to: "cause", label: "ارتباط" },
      { from: "topic", to: "synthesis", label: "ترتيب الجزاء" },
      { from: "cause", to: "synthesis", label: "تحقيق الأثر" },
    ],
    constraints: [
      {
        id: "#SEC-01",
        title: "الحفاظ على موضوع النية",
        body: "يجب أن يبقى النص مرتبطًا بمفهوم النية والقصد القلبي، مع منع تحويله لمفاهيم مادية بحتة أو مجرد أفعال ظاهرية منفصلة عن الباعث الإيماني.",
        icon: "adjust",
        iconClass: "bg-primary-fixed/40 text-primary",
        idClass: "text-primary",
        kind: "قيد دلالي رئيسي (Inviolable Core)",
        kindClass: "text-primary",
        dotClass: "bg-primary",
        weight: "1.0 (إلزامي)",
        weightClass: "text-on-surface",
        isActive: true,
        matchScore: 12,
        violationReason: "استبدال مفهوم النية (intentions) بالنتائج المادية (results).",
        repairedTarget: "intentions",
      },
      {
        id: "#SEC-02",
        title: "الحفاظ على العلاقة بين العمل والنية",
        body: "لا يجب أن ينفصل معنى العمل عن النية في أي سياق بياني، ويُشترط التلازم السببي بينهما بحرف الباء للمصاحبة والسببية الشرعية.",
        icon: "link",
        iconClass: "bg-surface-container text-secondary",
        idClass: "text-secondary",
        kind: "قيد سببي وشرطي (Causal Bound)",
        kindClass: "text-primary",
        dotClass: "bg-primary-container",
        weight: "0.98 (حرج)",
        weightClass: "text-on-surface",
        isActive: true,
        matchScore: 24,
        violationReason: "فصل العمل عن علته الباعثة وتحويله لتقييم ظاهري بعد وقوعه.",
        repairedTarget: "according to intentions",
      },
      {
        id: "#SEC-03",
        title: "الحفاظ على معنى «لكل امرئ ما نوى»",
        body: "يجب الحفاظ على المبدأ الفردي للجزاء والمآل؛ أن كل شخص ينال عاقبة ما نواه وقصده فقط دون تعميم الجزاء أو إسناده لأطراف أخرى.",
        icon: "scale",
        iconClass: "bg-surface-container text-secondary",
        idClass: "text-secondary",
        kind: "قيد اختصاص ومآل (Attribution)",
        kindClass: "text-primary",
        dotClass: "bg-primary-container",
        weight: "0.95 (صارم)",
        weightClass: "text-on-surface",
        isActive: true,
        matchScore: 45,
        violationReason: "إسقاط الشطر الثاني من الحديث وحصر المعنى في الشطر الأول فقط.",
        repairedTarget: "and each person will have what they intended",
      },
      {
        id: "#SEC-04",
        title: "عدم إضافة معنى جديد",
        body: "حظر إقحام أي أحكام فرعية أو تفريعات فقهية زائدة لم ينص عليها المنطوق الشريف في المتن، والتصدي لأي تمدد بياني غير موثق.",
        icon: "shield",
        iconClass: "bg-error-container text-on-error-container",
        idClass: "text-error",
        kind: "مانع الهلوسة والاستطراد (Hallucination Guard)",
        kindClass: "text-error",
        dotClass: "bg-error",
        weight: "1.0 (حظر تام)",
        weightClass: "text-error",
        isActive: true,
        matchScore: 68,
        violationReason: "ميل النموذج لإقحام تعليقات وتأويلات غير منصوصة في متن الحديث.",
        repairedTarget: "strict textual boundary",
      },
    ],
    outputs: {
      translate: {
        "en-US": {
          prefix: "Actions are judged by their ",
          drift: "results",
          suffix: ".",
          repaired: "Actions are judged according to intentions, and each person will have what they intended.",
          explanation:
            "تم استبدال الكلمة المشوهة 'results' بالصيغة المقاصدية المحكمة 'intentions'، واستعادة الشطر الثاني كاملاً لصيانة المسؤولية الفردية.",
        },
        fr: {
          prefix: "Les actes sont jugés selon leurs ",
          drift: "résultats",
          suffix: ".",
          repaired: "Les actions ne valent que par leurs intentions, et chacun n'aura que ce qu'il a eu l'intention d'obtenir.",
          explanation:
            "تم تصحيح الانزياح من 'résultats' (النتائج) إلى 'intentions' مع حفظ دلالة الاستحقاق الفردي بدقة في الصياغة الفرنسية.",
        },
        id: {
          prefix: "Amalan dinilai berdasarkan ",
          drift: "hasilnya",
          suffix: ".",
          repaired: "Sesungguhnya setiap amalan bergantung pada niatnya, dan setiap orang akan mendapatkan sesuai apa yang dia niatkan.",
          explanation:
            "استعادة صيغة الحصر والتوكيد (Sesungguhnya) وصيانة مقصد النية (niatnya) بدلاً من النتيجة المادية الظاهرة.",
        },
        ur: {
          prefix: "اعمال کا فیصلہ ان کے ",
          drift: "نتائج سے ہوتا ہے",
          suffix: "۔",
          repaired: "اعمال کا دارومدار نیتوں پر ہے، اور ہر شخص کے لیے وہی ہے جس کی اس نے نیت کی۔",
          explanation:
            "استبدال عبارة 'نتائج' بالعبارة الشرعية المعتمدة 'دارومدار نیتوں پر ہے' مع إثبات الشطر الثاني كاملاً.",
        },
      },
      summarize: {
        "en-US": {
          prefix: "Moral deed validity and divine recompense ",
          drift: "depend on public impact",
          suffix: ".",
          repaired: "The canonical validity of deeds depends entirely on internal intention, and every individual's recompense corresponds strictly to their conscious intent.",
          explanation:
            "تصحيح التلخيص لمنع اختزال الحديث في الأثر الاجتماعي العام وتثبيت ركن النية الفردية.",
        },
        fr: {
          prefix: "La valeur des actions ",
          drift: "dépend de leur utilité sociale",
          suffix: ".",
          repaired: "La validité des actes en islam repose sur l'intention intérieure, et chaque individu est rétribué selon son dessein propre.",
          explanation:
            "إعادة ضبط التلخيص المقاصدي الفرنسي ليبرز شرط النية الباطنة ومسؤولية المكلف.",
        },
        id: {
          prefix: "Nilai perbuatan manusia ",
          drift: "bergantung pada dampak luarnya",
          suffix: ".",
          repaired: "Intisari perbuatan terletak pada niat dan keikhlasan hati, dan balasan bagi setiap insan bergantung pada apa yang diniatkannya.",
          explanation: "تثبيت خلاصة النية والإخلاص القلبي مع حفظ مقصد الجزاء الفردي.",
        },
        ur: {
          prefix: "اعمال کی قدر و قیمت کا انحصار ",
          drift: "ان کے ظاہری فائدے پر ہے",
          suffix: "۔",
          repaired: "اعمال کی قبولیت اور ثواب کا تمام تر مدار دلی نیت اور اخلاص پر ہے، اور ہر انسان کو اس کی نیت کے موافق ہی صلہ ملتا ہے۔",
          explanation: "إبراز خلاصة القبول والثواب المرتبط بالإخلاص الفردي دون تشتيت.",
        },
      },
      paraphrase: {
        "en-US": {
          prefix: "People's achievements are evaluated strictly by ",
          drift: "their observable outcomes",
          suffix: ".",
          repaired: "Religious obligations derive their spiritual and legal efficacy solely from the underlying intention, granting each individual the exact reward of what they resolved to do.",
          explanation:
            "إعادة صياغة أدبية راقية تثبت التلازم بين العزم القلبي والأثر الشرعي.",
        },
        fr: {
          prefix: "L'appréciation des œuvres humaines est liée à ",
          drift: "leurs conséquences mesurables",
          suffix: ".",
          repaired: "L'authenticité des actes spirituels est intrinsèquement liée au dessein du cœur, n'attribuant à chacun que le fruit exact de sa résolution.",
          explanation: "صياغة فصيحة تمنع الانحراف المادي وتحفظ المعنى الباطن للفعل.",
        },
        id: {
          prefix: "Penilaian amal perbuatan terikat pada ",
          drift: "kesuksesan yang terlihat",
          suffix: ".",
          repaired: "Keabsahan ibadah dan amal kebajikan berporos pada kebulatan tekad dalam hati, sehingga setiap hamba hanya memperoleh buah dari apa yang ia tuju.",
          explanation: "إعادة بناء لغوي دقيق يحافظ على روح المتن ومصطلحات المعجم الفقهي.",
        },
        ur: {
          prefix: "انسان کے کاموں کا اعتبار ",
          drift: "مادی کامیابی سے ماپا جاتا ہے",
          suffix: "۔",
          repaired: "شرعی عبادات اور افعال کی معنویت صرف قلبی ارادے اور خلوص نیت سے قائم ہوتی ہے، اور ہر شخص کو اس کے اصل ارادے ہی کا ثمرہ ملتا ہے۔",
          explanation: "إعادة صياغة بليغة محكمة تثبت المعنى المقاصدي دون تمدد بياني غير منضبط.",
        },
      },
    },
  },
  {
    id: "hadith-darar",
    title: "قاعدة نفي الضرر (لا ضرر ولا ضرار)",
    category: "قاعدة فقهية كلية / حديث نبوي",
    source: "سنن ابن ماجه (حديث 2340)، موطأ مالك، مسند أحمد",
    authenticity: "قاعدة فقهية مجمع عليها • متواترة المعنى",
    latencyMs: 120,
    text: "«لا ضَرَرَ وَلا ضِرَارَ.»",
    insights: [
      {
        eyebrow: "المعجم الفقهي والقواعد الكبرى",
        title: "نوع المحتوى",
        icon: "balance",
        iconClass: "bg-primary-fixed/40 text-primary",
        value: "قاعدة فقهية كبرى",
        valueClass: "text-primary",
        body: "أحد أركان القواعد الفقهية الخمس الكبرى التي يدور عليها الفقه الإسلامي؛ أصل تشريعي لدفع المفاسد.",
        footerIcon: "verified_user",
        footer: "متواتر المعنى ومجمع على حكمه الشرعي",
        footerClass: "text-primary",
      },
      {
        eyebrow: "المجال المقاصدي والفقهي",
        title: "الموضوع",
        icon: "shield",
        iconClass: "bg-secondary-container text-secondary",
        value: "دَفْع المَفَاسِد ورَفْع الحَرَج",
        valueClass: "text-primary",
        body: "حظر الإضرار ابتداءً (الضرر) وحظر مقابلة الضرر بعدوان مماثل متعدٍّ (الضرار).",
        footerIcon: "hub",
        footer: "تصنيف مقاصدي (حفظ الضروريات الخمس)",
        footerClass: "text-secondary",
      },
      {
        eyebrow: "الارتباط التشريعي والمنطقي",
        title: "الفكرة الأساسية",
        icon: "gavel",
        iconClass: "bg-surface-container-high text-primary-container",
        value: "حظر إيقاع الأذى أو مجازاته بالتعسف",
        valueClass: "text-on-surface",
        body: "التفريق الدقيق بين الضرر المنفرد والضرار المتبادل، ومنع التعسف في استخدام الحقوق.",
        footerIcon: "rule",
        footer: "مبدأ العدالة الناجزة والانتصاف المنضبط",
        footerClass: "text-primary",
      },
      {
        eyebrow: "الاستحقاق والأثر التشريعي",
        title: "المعنى الأساسي والأثر",
        icon: "account_balance",
        iconClass: "bg-tertiary-fixed text-tertiary",
        value: "الضرر يُزال شرعاً بالوسائل العادلة",
        valueClass: "text-on-surface",
        body: "وجوب رفع الضرر الواقع وتعويض المتضرر دون إحداث ضرر أعظم أو مساوٍ بغير وجه حق.",
        footerIcon: "flag",
        footer: "تأسيس فقه المسؤولية المدنية والتعويض",
        footerClass: "text-tertiary",
      },
    ],
    graphNodes: [
      {
        id: "source",
        title: "المتن النبوي",
        subtitle: "لا ضرر ولا ضرار",
        x: 20,
        y: 55,
        type: "source",
        badge: "قاعدة كلية",
        details: "النص النبوي المؤسس لأعظم قواعد حماية الأرواح والأموال.",
      },
      {
        id: "topic",
        title: "الموضوع: نفي الضرر",
        subtitle: "حظر الإيذاء ابتداءً",
        x: 150,
        y: 20,
        type: "topic",
        badge: "أصل المنع",
        details: "تحريم إلحاق أي نوع من الأذى الحسي أو المعنوي بغير مسوغ.",
      },
      {
        id: "cause",
        title: "نفي الضرار المقابل",
        subtitle: "منع رد العدوان بالجور",
        x: 150,
        y: 90,
        type: "cause",
        badge: "انضباط الاستيفاء",
        details: "النهي عن استيفاء الحق بضرر متعدٍّ أو خارج عن حكم القضاء.",
      },
      {
        id: "synthesis",
        title: "الأثر الفقهي",
        subtitle: "الضرر يزال بعدل",
        x: 270,
        y: 55,
        type: "synthesis",
        badge: "ثمرة تشريعية",
        details: "إلزام برفع الضرر وتعويض التلف دون إضرار بالطرف الآخر جوراً.",
      },
    ],
    graphEdges: [
      { from: "source", to: "topic", label: "نهي أولي" },
      { from: "source", to: "cause", label: "نهي مقابل" },
      { from: "topic", to: "synthesis", label: "استقرار الحق" },
      { from: "cause", to: "synthesis", label: "منع التعسف" },
    ],
    constraints: [
      {
        id: "#SEC-D01",
        title: "التفريق الدقيق بين الضرر والضرار",
        body: "وجوب إبراز التمييز الأصولي بين الضرر (إيقاع الأذى ابتداءً) والضرار (مقابلة الأذى بأذى آخر أو الإضرار المتبادل).",
        icon: "adjust",
        iconClass: "bg-primary-fixed/40 text-primary",
        idClass: "text-primary",
        kind: "قيد فقهي اصطلاحي (Juridical Distinction)",
        kindClass: "text-primary",
        dotClass: "bg-primary",
        weight: "1.0 (إلزامي)",
        weightClass: "text-on-surface",
        isActive: true,
        matchScore: 20,
        violationReason: "اختزال اللفظين في كلمة واحدة مثل 'no harm'.",
        repairedTarget: "neither harming nor reciprocating harm",
      },
      {
        id: "#SEC-D02",
        title: "منع الابتذال التعبيري الشائع",
        body: "حظر ترجمة المتن إلى أمثال شعبية مبتذلة مثل (no harm no foul) لما فيها من إسقاط للهيبة التشريعية والعمق القانوني.",
        icon: "shield",
        iconClass: "bg-error-container text-on-error-container",
        idClass: "text-error",
        kind: "مانع الابتذال الدلالي (Colloquialism Filter)",
        kindClass: "text-error",
        dotClass: "bg-error",
        weight: "0.99 (حرج)",
        weightClass: "text-error",
        isActive: true,
        matchScore: 15,
        violationReason: "تحويل المبدأ التشريعي إلى مثل عامي رياضي سطحي.",
        repairedTarget: "formal legal prohibition",
      },
      {
        id: "#SEC-D03",
        title: "صيانة مقصد رفع الحرج وإزالة التلف",
        body: "إبراز أن النفي بصيغة النهي التوكيدي يفيد التحريم القاطع والمطالبة برفع الواقع وتفادي المتوقع.",
        icon: "scale",
        iconClass: "bg-surface-container text-secondary",
        idClass: "text-secondary",
        kind: "قيد مقاصدي عام (Maqasid Core)",
        kindClass: "text-primary",
        dotClass: "bg-primary-container",
        weight: "0.95 (صارم)",
        weightClass: "text-on-surface",
        isActive: true,
        matchScore: 40,
        violationReason: "ضعف الدلالة الإلزامية في الصياغة المولدة.",
        repairedTarget: "binding legal injunction",
      },
    ],
    outputs: {
      translate: {
        "en-US": {
          prefix: "There should be ",
          drift: "no harm, no foul",
          suffix: ".",
          repaired: "There shall be neither infliction of harm nor reciprocal harming.",
          explanation:
            "تم استبدال المثل العامي السطحي 'no harm, no foul' بالصيغة القانونية الشرعية الرصينة التي تميز بين الضرر والضرار.",
        },
        fr: {
          prefix: "Il ne doit y avoir ",
          drift: "aucun tort, aucun problème",
          suffix: ".",
          repaired: "Il ne doit y avoir ni préjudice infligé unilatéralement, ni préjudice exercé en représailles.",
          explanation:
            "إعادة ضبط الصياغة الفرنسية لبيان الفرق الأصولي بين إيقاع الضرر ابتداءً ومقابلته بالعدوان.",
        },
        id: {
          prefix: "Tidak boleh ada ",
          drift: "bahaya dan kesalahan kecil",
          suffix: ".",
          repaired: "Tidak boleh berbuat kemudaratan kepada orang lain dan tidak boleh pula membalas kemudaratan dengan kemudaratan.",
          explanation:
            "إثبات الصيغة المعتمدة لعلماء الفقه الإسلامي في إندونيسيا لصيانة القاعدة الكلية.",
        },
        ur: {
          prefix: "نہ تو کوئی نقصان ہے اور نہ ہی ",
          drift: "کوئی بڑی بات ہے",
          suffix: "۔",
          repaired: "نہ ابتدائی طور پر کسی کو نقصان پہنچانا جائز ہے اور نہ ہی نقصان کے بدلے میں نقصان پہنچانا۔",
          explanation:
            "تثبيت النص القانوني الأصولي الشامل لمنع الإضرار ابتداءً أو مقابلةً.",
        },
      },
      summarize: {
        "en-US": {
          prefix: "Islamic law ",
          drift: "prefers peace between neighbors",
          suffix: ".",
          repaired: "Islamic jurisprudence establishes an absolute prohibition against causing harm initially or reciprocating injury beyond lawful bounds.",
          explanation: "إبراز مبدأ الحظر التشريعي الصارم بدلاً من النصيحة الأخلاقية الرخوة.",
        },
        fr: {
          prefix: "Le droit musulman ",
          drift: "recommande l'entente cordiale",
          suffix: ".",
          repaired: "La jurisprudence islamique pose le principe cardinal de l'interdiction totale de nuire à autrui ou de riposter par un préjudice illégitime.",
          explanation: "تأكيد الطبيعة الإلزامية للقاعدة الفقهية الكبرى.",
        },
        id: {
          prefix: "Hukum Islam ",
          drift: "menganjurkan hidup damai",
          suffix: ".",
          repaired: "Prinsip dasar syariat Islam mengharamkan segala bentuk tindakan yang merugikan orang lain serta melarang pembalasan yang menimbulkan mudarat baru.",
          explanation: "تأصيل الحظر الشرعي لمنع توليد مضار جديدة في المجتمع.",
        },
        ur: {
          prefix: "اسلامی قانون میں ",
          drift: "باہمی صلح کی ترغیب ہے",
          suffix: "۔",
          repaired: "فقہ اسلامی کا بنیادی اصول یہ ہے کہ کسی کو ابتداءً نقصان پہنچانا یا بدلے میں زیادتی کر کے نقصان کا سبب بننا قطعی حرام ہے۔",
          explanation: "ترسيخ مبدأ الحرمة القطعية لدفع المفاسد.",
        },
      },
      paraphrase: {
        "en-US": {
          prefix: "The core legal imperative mandates that ",
          drift: "people avoid inconveniencing each other",
          suffix: ".",
          repaired: "The foundational maxim dictates that neither intentional detriment nor retaliatory prejudice may be legitimately sustained under any legal pretext.",
          explanation: "صياغة فقهية مقارنة محكمة تصون مصطلحات الضرر والضرار.",
        },
        fr: {
          prefix: "Ce principe cardinal dispose que ",
          drift: "chacun doit rester courtois",
          suffix: ".",
          repaired: "Cette maxime fondamentale prescrit l'interdiction de causer préjudice ou d'user de représailles dommageables contraires à la justice.",
          explanation: "صياغة تشريعية فرنسية راقية مانعة للهدر والتعسف.",
        },
        id: {
          prefix: "Kaidah fikih ini menegaskan agar ",
          drift: "setiap orang saling memaafkan tanpa syarat",
          suffix: ".",
          repaired: "Kaidah asasi ini menetapkan larangan mutlak terhadap permusuhan yang merugikan serta menolak tindakan balasan yang melampaui batas keadilan.",
          explanation: "صياغة علمية فقهية دقيقة تمنع الخلط بين المسامحة وتعطيل حقوق المتضرر.",
        },
        ur: {
          prefix: "اس جامع قاعدے کا تقاضا ہے کہ ",
          drift: "لوگ معمولی باتوں کو درگزر کریں",
          suffix: "۔",
          repaired: "اس سنہری فقہی ضابطے کی رو سے نہ کسی کی حق تلفی اور نقصان رسانی کا جواز ہے اور نہ ہی انتقاماً ناجائز ضرر پہنچانے کی گنجائش ہے۔",
          explanation: "صياغة تمنع تمييع الضابط الفقهي وتحفظ حقوق العدالة والإنصاف.",
        },
      },
    },
  },
  {
    id: "hadith-naseehah",
    title: "حديث النصيحة (الدين النصيحة)",
    category: "حديث نبوي شريف",
    source: "صحيح مسلم (الحديث 55، كتاب الإيمان)",
    authenticity: "صحيح الإسناد • عمدة أركان الدين",
    latencyMs: 130,
    text: "«الدِّينُ النَّصِيحَةُ، قُلْنَا: لِمَنْ؟ قَالَ: لِلَّهِ وَلِكِتَابِهِ وَلِرَسُولِهِ وَلأَئِمَّةِ الْمُسْلِمِينَ وَعَامَّتِهِمْ.»",
    insights: [
      {
        eyebrow: "تصنيف المتن والأثر",
        title: "نوع المحتوى",
        icon: "menu_book",
        iconClass: "bg-primary-fixed/40 text-primary",
        value: "حديث نبوي شريف",
        valueClass: "text-primary",
        body: "أخرجه الإمام مسلم في صحيحه، وهو من الأحاديث التي قيل إنها تجمع مدار الإسلام وقواعده.",
        footerIcon: "verified_user",
        footer: "صحيح مسلم • كتاب الإيمان",
        footerClass: "text-primary",
      },
      {
        eyebrow: "المعجم والمفاهيم التأسيسية",
        title: "الموضوع",
        icon: "loyalty",
        iconClass: "bg-secondary-container text-secondary",
        value: "الإخلاص والأمانة الشاملة",
        valueClass: "text-primary",
        body: "النصيحة في لسان العرب: إخلاص الشيء وتنقيته من الشوائب والصدق فيه، وليست مجرد إبداء الملاحظة والوعظ الشفهي.",
        footerIcon: "hub",
        footer: "تحرير لغوي دلالي لمعنى النصيحة",
        footerClass: "text-secondary",
      },
      {
        eyebrow: "الترتيب المقاصدي",
        title: "الفكرة الأساسية",
        icon: "format_list_numbered",
        iconClass: "bg-surface-container-high text-primary-container",
        value: "شمولية النصيحة لحقوق الخالق والمخلوق",
        valueClass: "text-on-surface",
        body: "التدرج المقاصدي المنهجي: حق الله تعالى (توحيده وإفراده)، حق كتابه (العمل به وتلاوته)، حق رسوله (اتباعه وتوقيره)، حق الأئمة والعامة.",
        footerIcon: "checklist",
        footer: "ترتيب الأولويات الإيمانية والاجتماعية",
        footerClass: "text-primary",
      },
      {
        eyebrow: "الأثر المجتمعي والديني",
        title: "المعنى الأساسي والأثر",
        icon: "groups",
        iconClass: "bg-tertiary-fixed text-tertiary",
        value: "قوام المجتمع الإيماني الصادق",
        valueClass: "text-on-surface",
        body: "بناء ثقافة التناصح والتكافل والتناصح المسؤول بعيداً عن الغش والتفريط.",
        footerIcon: "flag",
        footer: "حفظ الرابطة الإيمانية والمجتمعية",
        footerClass: "text-tertiary",
      },
    ],
    graphNodes: [
      {
        id: "source",
        title: "المتن النبوي",
        subtitle: "الدين النصيحة",
        x: 20,
        y: 55,
        type: "source",
        badge: "متن أصيل",
        details: "جامع أبواب الإيمان والمعاملات وحسن الصلة بالله والخلق.",
      },
      {
        id: "topic",
        title: "معنى النصيحة",
        subtitle: "إخلاص القصد والوفاء",
        x: 150,
        y: 20,
        type: "topic",
        badge: "مفهوم شرعي",
        details: "مفهوم ممتد يشمل الولاء التام والإخلاص الكامل وليس مجرد الوعظ.",
      },
      {
        id: "cause",
        title: "المجالات الخمسة",
        subtitle: "لله ولكتابه ولرسوله ولأئمة المسلمين وعامتهم",
        x: 150,
        y: 90,
        type: "cause",
        badge: "تفصيل مقاصدي",
        details: "توزيع المسؤولية الشرعية على خمسة محاور كلية جامعة.",
      },
      {
        id: "synthesis",
        title: "ثمرة الدين",
        subtitle: "تحقيق الصدق والإخلاص",
        x: 270,
        y: 55,
        type: "synthesis",
        badge: "غاية التكليف",
        details: "قيام المجتمع على الأمانة وحفظ الثغور والتناصح بالحق والصبر.",
      },
    ],
    graphEdges: [
      { from: "source", to: "topic", label: "تعريف" },
      { from: "source", to: "cause", label: "تفصيل" },
      { from: "topic", to: "synthesis", label: "تطبيق" },
      { from: "cause", to: "synthesis", label: "إحاطة" },
    ],
    constraints: [
      {
        id: "#SEC-N01",
        title: "منع قصر النصيحة على المشورة الشفهية",
        body: "حظر ترجمة كلمة 'النصيحة' إلى 'advice' فقط، لأن نصيحة الله وكتابه ورسوله تعني الإخلاص والتصديق والانقياد، وليست إسداء مشورة.",
        icon: "adjust",
        iconClass: "bg-primary-fixed/40 text-primary",
        idClass: "text-primary",
        kind: "قيد دلالي عقدي (Theological Integrity)",
        kindClass: "text-primary",
        dotClass: "bg-primary",
        weight: "1.0 (إلزامي)",
        weightClass: "text-on-surface",
        isActive: true,
        matchScore: 10,
        violationReason: "ترجمة 'advice to God' وهي شنيعة عقائدياً ومنافية لأصل اللفظ العربي.",
        repairedTarget: "sincere devotion and good counsel",
      },
      {
        id: "#SEC-N02",
        title: "حفظ الترتيب والتدرج في الموجهات",
        body: "وجوب الحفاظ على ذكر المحاور الخمسة بالترتيب النبوي المنصوص: الله، كتابه، رسوله، أئمة المسلمين، عامتهم.",
        icon: "format_list_numbered",
        iconClass: "bg-surface-container text-secondary",
        idClass: "text-secondary",
        kind: "قيد نسقي وترتيبي (Sequential Rigor)",
        kindClass: "text-primary",
        dotClass: "bg-primary-container",
        weight: "0.98 (حرج)",
        weightClass: "text-on-surface",
        isActive: true,
        matchScore: 30,
        violationReason: "إسقاط الشطر الأخير أو دمج حق الأئمة مع العامة بغير بيان.",
        repairedTarget: "all five canonical recipients preserved",
      },
    ],
    outputs: {
      translate: {
        "en-US": {
          prefix: "Religion is simply giving ",
          drift: "advice to God and people",
          suffix: ".",
          repaired: "Religion is sincere devotion and loyalty: to Allah, to His Book, to His Messenger, and to the leaders of the Muslims and their common folk.",
          explanation:
            "تم استئصال الخطأ العقائدي الجسيم 'advice to God' واستبداله بمصطلح الإخلاص والتفاني 'sincere devotion and loyalty'.",
        },
        fr: {
          prefix: "La religion n'est que de ",
          drift: "donner des conseils à Dieu",
          suffix: ".",
          repaired: "La religion réside dans la sincérité et le dévouement absolu : envers Allah, Son Livre, Son Messager, ainsi qu'envers les dirigeants des musulmans et leur ensemble.",
          explanation:
            "تصحيح الانزياح الفاضح في الترجمة الفرنسية وإعادة صياغة حقوق الله ورسوله بأدب شرعي رصين.",
        },
        id: {
          prefix: "Agama itu hanyalah ",
          drift: "memberi nasihat kepada Allah",
          suffix: ".",
          repaired: "Agama adalah ketulusan dan kesetiaan: kepada Allah, Kitab-Nya, Rasul-Nya, serta para pemimpin kaum muslimin dan masyarakat awam mereka.",
          explanation:
            "استبدال العبارة المشوهة بالصياغة الإندونيسية الفقهية المعتمدة (ketulusan dan kesetiaan).",
        },
        ur: {
          prefix: "دین صرف یہی ہے کہ ",
          drift: "اللہ کو نصیحت کی جائے",
          suffix: "۔",
          repaired: "دین سراسر خیر خواہی اور اخلاص کا نام ہے: اللہ کے لیے، اس کی کتاب کے لیے، اس کے رسول کے لیے، اور مسلمانوں کے حکمرانوں اور عام مسلمانوں کے لیے۔",
          explanation:
            "إصلاح الخطأ الفادح وتثبيت معنى الخيرخواهی والإخلاص لله تعالى ولكتابه ورسوله.",
        },
      },
      summarize: {
        "en-US": {
          prefix: "The core of faith is ",
          drift: "sharing tips with everyone",
          suffix: ".",
          repaired: "The essence of Islam consists of pure devotion and earnest goodwill towards the Creator, His divine revelation, the Prophet, and the entire human society.",
          explanation: "تلخيص يبرز البعد الإيماني الشامل لجميع أبعاد التكليف الشرعي.",
        },
        fr: {
          prefix: "L'essence de la foi se résume à ",
          drift: "des conseils pratiques",
          suffix: ".",
          repaired: "L'essence de l'islam réside dans l'engagement loyal envers Dieu, Sa révélation, Son Prophète et la bienveillance active envers la communauté.",
          explanation: "إبراز الالتزام العقدي والاجتماعي في التلخيص.",
        },
        id: {
          prefix: "Hakikat iman adalah ",
          drift: "saling mengkritik",
          suffix: ".",
          repaired: "Hakikat keberagamaan berpusat pada ketulusan penghambaan kepada Allah, ketaatan pada wahyu, serta ketulusan membimbing dan membantu sesama.",
          explanation: "تلخيص يركز على سلامة الإخلاص والتعاون على البر والتقوى.",
        },
        ur: {
          prefix: "ایمان کا خلاصہ محض ",
          drift: "زبانی تنقید کرنا ہے",
          suffix: "۔",
          repaired: "دین داری کا مغز اللہ کی بندگی میں اخلاص، شریعت کی پاسداری، اور معاشرے کے ہر فرد کی سچی خیر خواہی پر قائم ہے۔",
          explanation: "خلاصة جامعة لمعنى النصح والوفاء الإيماني.",
        },
      },
      paraphrase: {
        "en-US": {
          prefix: "True spirituality is expressed through ",
          drift: "interpersonal counseling",
          suffix: ".",
          repaired: "Authentic religious dedication manifests as unadulterated fidelity toward Allah, reverence for His scripture and Messenger, alongside responsible guidance and compassion toward leaders and citizens alike.",
          explanation: "إعادة بناء بياني فصيح يجمع شمل مقاصد الحديث.",
        },
        fr: {
          prefix: "L'expression de la piété s'articule autour du ",
          drift: "coaching spirituel",
          suffix: ".",
          repaired: "La véritable foi se concrétise par une fidélité inaltérable envers Dieu et Ses préceptes, doublée d'une sollicitude intègre envers l'ensemble du corps social.",
          explanation: "صياغة فكرية منضبطة تليق بأصول الفقه واللسان الفرنسي الفصيح.",
        },
        id: {
          prefix: "Wujud keberagamaan sejati tercermin dalam ",
          drift: "bimbingan konseling bebas",
          suffix: ".",
          repaired: "Penghayatan agama yang hakiki berakar pada loyalitas suci kepada Allah dan tuntunan-Nya, serta kepedulian yang tulus terhadap integritas para pemimpin dan kebaikan seluruh umat.",
          explanation: "إعادة صياغة أدبية رفيعة المستوى متطابقة مع المعاجم الإسلامية.",
        },
        ur: {
          prefix: "دینی بصیرت کا حقیقی مظہر ",
          drift: "محض اخلاقی گفتگو ہے",
          suffix: "۔",
          repaired: "سچی دینداری اللہ رب العزت کی خالص بندگی، اس کی کتاب اور رسول کی پیروی، اور قیادت و عوام کی دیانت دارانہ رہنمائی اور خیر خواہی میں پوشیدہ ہے۔",
          explanation: "صياغة أدبية راقية تحفظ الأثر الشرعي للأمانة الإيمانية.",
        },
      },
    },
  },
];

/**
 * Generate a dynamic knowledge object and constraints for any custom Arabic text.
 */
export function analyzeCustomText(rawText: string): PresetText {
  const clean = rawText.trim();
  const wordCount = clean ? clean.split(/\s+/).length : 0;
  const hash = Math.abs(
    clean.split("").reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0),
  );

  const matchedPreset = PRESET_TEXTS.find(
    (p) =>
      clean.includes(p.text.slice(1, 15)) ||
      clean.includes(p.title) ||
      (clean.includes("بالنيات") && p.id === "hadith-niyyah") ||
      (clean.includes("ضرار") && p.id === "hadith-darar") ||
      (clean.includes("النصيحة") && p.id === "hadith-naseehah"),
  );

  if (matchedPreset) {
    return {
      ...matchedPreset,
      text: clean || matchedPreset.text,
    };
  }

  // Heuristic custom analysis for arbitrary user input
  const isReligious =
    /الله|رسول|قرآن|حديث|صلاة|زكاة|حلال|حرام|فقه|مقاصد|شريعة|إيمان|نبي|سنة/i.test(clean);

  return {
    id: `custom-${hash}`,
    title: clean.length > 30 ? clean.slice(0, 30) + "..." : clean || "نص مخصص",
    category: isReligious ? "نص شرعي / إسلامي مستورد" : "محتوى عام خاضع للحوكمة",
    source: isReligious ? "المكنز المرجعي المفتوح • مدخل مستخدم" : "مدخل المستخدم المباشر",
    authenticity: isReligious ? "خاضع للمطابقة المعجمية الآلية" : "تدقيق لغوي ودلالي مخصص",
    latencyMs: Math.max(90, Math.min(320, 80 + wordCount * 12)),
    text: clean,
    insights: [
      {
        eyebrow: "فحص البنية والمعجم",
        title: "نوع المحتوى واللغة",
        icon: "text_fields",
        iconClass: "bg-primary-fixed/40 text-primary",
        value: isReligious ? "محتوى ذو دلالات شرعية" : "نص لغوي عربي فصيح",
        valueClass: "text-primary",
        body: `تم استخراج ${wordCount} كلمة ومطابقتها مع معجم الألفاظ الدلالية، ومسح السياق للتأكد من خلوه من المحاذير.`,
        footerIcon: "verified_user",
        footer: "تمت معالجة المدخل في الذاكرة الدلالية",
        footerClass: "text-primary",
      },
      {
        eyebrow: "المحور المقاصدي الدلالي",
        title: "الموضوع المكتشف",
        icon: "hub",
        iconClass: "bg-secondary-container text-secondary",
        value: isReligious ? "حوكمة المفاهيم الشرعية" : "صيانة المقاصد الدلالية",
        valueClass: "text-primary",
        body: "تحديد المفردات المحورية ومطابقتها لمنع الانزياح الفلسفي واللفظي أثناء المعالجة والتحويل.",
        footerIcon: "category",
        footer: "معجم Mawzun-Lexicon v4.8",
        footerClass: "text-secondary",
      },
      {
        eyebrow: "الضوابط الحاكمة",
        title: "الفكرة الأساسية المستخرجة",
        icon: "rule",
        iconClass: "bg-surface-container-high text-primary-container",
        value: clean.length > 40 ? clean.slice(0, 40) + "..." : clean,
        valueClass: "text-on-surface",
        body: "تثبيت دلالة الألفاظ على معانيها الأصيلة، واستخلاص الروابط السببية بين الكلمات المفتاحية.",
        footerIcon: "lock",
        footer: "ربط أوتوماتيكي للقيود الحاكمة",
        footerClass: "text-primary",
      },
      {
        eyebrow: "أثر المعالجة والتحويل",
        title: "معيار الأمان الدلالي",
        icon: "security",
        iconClass: "bg-tertiary-fixed text-tertiary",
        value: "مطابق وموثق (100%)",
        valueClass: "text-on-surface",
        body: "جاهز للتمرير عبر طبقة الحوكمة مع تفعيل موجهات منع الهلوسة والانحراف الدلالي.",
        footerIcon: "flag",
        footer: "جاهز للخطوات اللاحقة",
        footerClass: "text-tertiary",
      },
    ],
    graphNodes: [
      {
        id: "source",
        title: "المدخل النصي",
        subtitle: `${wordCount} كلمة`,
        x: 20,
        y: 55,
        type: "source",
        badge: "نص المستخدم",
        details: "المحتوى المدخل في المرحلة الأولى.",
      },
      {
        id: "topic",
        title: "المحور الدلالي",
        subtitle: "المفردات المفتاحية",
        x: 150,
        y: 20,
        type: "topic",
        badge: "مستخرج آلياً",
        details: "استخراج العناصر المرجعية لمنع تشتت المعنى.",
      },
      {
        id: "cause",
        title: "النسق اللغوي",
        subtitle: "العلاقات النحوية",
        x: 150,
        y: 90,
        type: "cause",
        badge: "تحليل تركيبي",
        details: "تحديد الروابط بين المبتدأ والخبر والعلة والمعلول.",
      },
      {
        id: "synthesis",
        title: "المخرج الموزون",
        subtitle: "كائن المعرفة المحمي",
        x: 270,
        y: 55,
        type: "synthesis",
        badge: "اعتماد الحوكمة",
        details: "جاهزية النموذج للتحويل والتدقيق بأمان تام.",
      },
    ],
    graphEdges: [
      { from: "source", to: "topic", label: "تحليل" },
      { from: "source", to: "cause", label: "تركيب" },
      { from: "topic", to: "synthesis", label: "صياغة" },
      { from: "cause", to: "synthesis", label: "اعتماد" },
    ],
    constraints: [
      {
        id: `#CUST-01`,
        title: "الحفاظ على جوهر المعنى ومقاصد النص",
        body: "يجب صيانة المعنى الأصلي للنص دون إقحام تأويلات خارجية أو استبدال المفاهيم الأصيلة بمترادفات مضللة.",
        icon: "adjust",
        iconClass: "bg-primary-fixed/40 text-primary",
        idClass: "text-primary",
        kind: "قيد دلالي جوهري (Semantic Anchor)",
        kindClass: "text-primary",
        dotClass: "bg-primary",
        weight: "1.0 (إلزامي)",
        weightClass: "text-on-surface",
        isActive: true,
        matchScore: 35,
        violationReason: "ميل النماذج التوليدية لتسطيح المعاني وتغيير المفاهيم العميقة.",
        repairedTarget: "faithful conceptual transfer",
      },
      {
        id: `#CUST-02`,
        title: "منع الهلوسة والتمدد البياني",
        body: "حظر إضافة جمل أو تفريعات غير متضمنة في النص الأصلي، والالتزام الحرفي بالحدود الدلالية للنص.",
        icon: "shield",
        iconClass: "bg-error-container text-on-error-container",
        idClass: "text-error",
        kind: "مانع الاستطراد (Hallucination Barrier)",
        kindClass: "text-error",
        dotClass: "bg-error",
        weight: "0.98 (حرج)",
        weightClass: "text-error",
        isActive: true,
        matchScore: 25,
        violationReason: "إقحام تفاصيل لم ترد في أصل النص المدخل.",
        repairedTarget: "exact scope bound",
      },
      {
        id: `#CUST-03`,
        title: "صيانة الفصاحة والاتساق الأسلوبي",
        body: "ضمان سلاسة الصياغة الهدف مع المحافظة على التراكيب الرفيعة والهيبة العلمية.",
        icon: "spellcheck",
        iconClass: "bg-surface-container text-secondary",
        idClass: "text-secondary",
        kind: "قيد الاتساق اللغوي (Stylistic Rigor)",
        kindClass: "text-primary",
        dotClass: "bg-primary-container",
        weight: "0.92 (صارم)",
        weightClass: "text-on-surface",
        isActive: true,
        matchScore: 48,
        violationReason: "انخفاض دقة التعبير في الترجمات الآلية السطحية.",
        repairedTarget: "dignified elevated diction",
      },
    ],
    outputs: {
      translate: {
        "en-US": {
          prefix: "Literal machine translation often ",
          drift: "dilutes the intended core meaning",
          suffix: ".",
          repaired: `Accurately preserved translation conveying the original Arabic semantics: "${clean}" without conceptual drift.`,
          explanation: "تم تطبيق حوكمة Mawzun لضمان نقل المعنى اللغوي والاصطلاحي دون تحريف.",
        },
        fr: {
          prefix: "La traduction automatique brute ",
          drift: "dénature le sens profond",
          suffix: ".",
          repaired: `Traduction équilibrée et fidèle du texte source arabe : "${clean}", préservant toutes ses nuances contextuelles.`,
          explanation: "صيانة دلالات النص الأصلي وضبط الترجمة الفرنسية وفق الأصول المعتمدة.",
        },
        id: {
          prefix: "Terjemahan mentah sering kali ",
          drift: "mengaburkan maksud hakiki",
          suffix: ".",
          repaired: `Terjemahan yang akurat dan berbobot dari teks asli bahasa Arab: "${clean}", terlindungi dari penyimpangan semantik.`,
          explanation: "صيانة المعنى وضمان انسجامه مع المعاجم اللغوية الموثقة.",
        },
        ur: {
          prefix: "خام مشین ٹرانسلیشن عموماً ",
          drift: "اصل معنی کو مسخ کر دیتی ہے",
          suffix: "۔",
          repaired: `عربی اصل متن کا متوازن اور مستند مفہوم: "${clean}" بغیر کسی مفہومی انحراف کے۔`,
          explanation: "حفظ الدلالة الأصلية في اللغة الأردية وصيانتها من الاستبدال اللفظي الخاطئ.",
        },
      },
      summarize: {
        "en-US": {
          prefix: "Uncontrolled summary ",
          drift: "drops critical nuances",
          suffix: ".",
          repaired: `Focused semantic synthesis distilling the core essence of: "${clean}" with strict retention of its fundamental premise.`,
          explanation: "تلخيص مقاصدي مكثف يصون الفكرة الجوهرية دون إسقاط.",
        },
        fr: {
          prefix: "Le résumé non contrôlé ",
          drift: "omet les principes clés",
          suffix: ".",
          repaired: `Synthèse sémantique condensée restituant la quintessence de : "${clean}" avec une stricte fidélité à l'original.`,
          explanation: "تكثيف المعنى مع حظر بتر الحيثيات التأسيسية.",
        },
        id: {
          prefix: "Ringkasan tanpa kendali ",
          drift: "menghilangkan poin penting",
          suffix: ".",
          repaired: `Intisari maknawi yang padat dan akurat dari teks: "${clean}" dengan menjaga keutuhan pesan pokoknya.`,
          explanation: "استخلاص المعالم الكبرى دون إخلال.",
        },
        ur: {
          prefix: "غیر منضبط خلاصہ ",
          drift: "اہم نکات کو گرا دیتا ہے",
          suffix: "۔",
          repaired: `متن کا عمیق مقاصدی خلاصہ: "${clean}" بنیادی روح اور پیغام کو مکمل طور پر برقرار رکھتے ہوئے۔`,
          explanation: "تكثيف أمين مع حفظ الأصول.",
        },
      },
      paraphrase: {
        "en-US": {
          prefix: "Surface rewording ",
          drift: "drifts into misleading connotations",
          suffix: ".",
          repaired: `Elevated contextual paraphrase reconstructing the linguistic expression of: "${clean}" while anchoring all core tenets.`,
          explanation: "إعادة بناء بلاغية سامية تحفظ الثوابت.",
        },
        fr: {
          prefix: "La paraphrase superficielle ",
          drift: "introduit des glissements sémantiques",
          suffix: ".",
          repaired: `Reformulation soignée et rigoureuse réarticulant l'énoncé : "${clean}" tout en verrouillant l'intégralité de sa signification.`,
          explanation: "صيانة البنية البيانية بأمانة ودقة.",
        },
        id: {
          prefix: "Parafrasa bebas ",
          drift: "menimbulkan konotasi keliru",
          suffix: ".",
          repaired: `Parafrasa terarah dengan susunan redaksi elegan dari: "${clean}" tanpa merusak kerangka maknawi aslinya.`,
          explanation: "إعادة صياغة أدبية منضبطة بالمعايير المقاصدية.",
        },
        ur: {
          prefix: "سطحی انداز بیان ",
          drift: "گمراہ کن مفاہیم پیدا کرتا ہے",
          suffix: "۔",
          repaired: `فصیح اور بلیغ انداز میں دوبارہ تشکیل شدہ عبارت: "${clean}" جس میں اصل معانی اور مقاصد مکمل محفوظ ہیں۔`,
          explanation: "إعادة بناء لغوي رصين مع تثبيت المضمون.",
        },
      },
    },
  };
}

/**
 * Generate a deterministic verification hash for an audited piece of content.
 */
export function generateAuditHash(text: string, activeConstraintCount: number, ccr: number): string {
  let hash = 0x811c9dc5;
  const str = `${text}_${activeConstraintCount}_${ccr}_mawzun_v2.4`;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  const hex = (hash >>> 0).toString(16).padStart(8, "0");
  return `0x${hex.slice(0, 4)}…${hex.slice(4, 8)}_verified`;
}
