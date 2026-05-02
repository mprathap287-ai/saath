export type ResultStatus = "stable" | "at-risk" | "critical";

export type ResultData = {
  status: ResultStatus;
  label: { en: string; hi: string };
  description: { en: string; hi: string };
  actions: {
    improve: { en: string; hi: string };
    reassess: { en: string; hi: string };
    prepare: { en: string; hi: string };
  };
  color: string;
  emoji: string;
};

export const results: Record<ResultStatus, ResultData> = {
  stable: {
    status: "stable",
    label: { en: "Stable", hi: "स्थिर" },
    description: {
      en: "Your relationship has a strong foundation. There are areas for growth, but the core elements — trust, respect, and communication — appear healthy. Continue nurturing what's working.",
      hi: "आपके रिश्ते की नींव मज़बूत है। कुछ बातें सुधर सकती हैं, लेकिन भरोसा, सम्मान और बातचीत जैसी ज़रूरी चीज़ें ठीक लग रही हैं। जो अच्छा चल रहा है, उसे बनाए रखें।",
    },
    actions: {
      improve: {
        en: "Deepen emotional intimacy through weekly check-ins and honest conversations.",
        hi: "हर हफ्ते बातचीत करें और भावनाओं को साझा करके रिश्ते को और गहरा बनाएं।",
      },
      reassess: {
        en: "Revisit this assessment in 3 months to track your relationship's growth.",
        hi: "3 महीने बाद फिर से यह परीक्षण करें और अपने रिश्ते की प्रगति देखें।",
      },
      prepare: {
        en: "Have a clear conversation about long-term goals and shared expectations.",
        hi: "भविष्य के लक्ष्यों और उम्मीदों के बारे में खुलकर बात करें।",
      },
    },
    color: "#4ade80",
    emoji: "🟢",
  },
  "at-risk": {
    status: "at-risk",
    label: { en: "At Risk", hi: "संकट में" },
    description: {
      en: "Your relationship has some concerning patterns. It's not too late — but both partners need to actively work on the gaps in trust, communication, or respect. Consider speaking to someone.",
      hi: "आपके रिश्ते में कुछ चिंताजनक बातें हैं। अभी भी देर नहीं हुई — लेकिन दोनों को मिलकर भरोसे, बातचीत और सम्मान पर काम करना होगा। किसी से बात करना फायदेमंद हो सकता है।",
    },
    actions: {
      improve: {
        en: "Seek couples counseling or talk to a trusted mentor who can offer perspective.",
        hi: "किसी काउंसलर या विश्वसनीय मार्गदर्शक से मिलें जो नया नज़रिया दे सके।",
      },
      reassess: {
        en: "Set a 30-day goal together and reassess at the end of the month.",
        hi: "मिलकर 30-दिन का लक्ष्य तय करें और महीने के अंत में फिर से परीक्षण करें।",
      },
      prepare: {
        en: "Write down what you both need from this relationship to feel secure and valued.",
        hi: "लिखें कि आप दोनों को इस रिश्ते से क्या चाहिए ताकि आप सुरक्षित और मूल्यवान महसूस करें।",
      },
    },
    color: "#facc15",
    emoji: "🟡",
  },
  critical: {
    status: "critical",
    label: { en: "Critical", hi: "गंभीर" },
    description: {
      en: "Your relationship is showing serious red flags. Your wellbeing comes first. It's important to take space, reflect clearly, and speak to someone you trust — a counselor, friend, or family member.",
      hi: "आपके रिश्ते में गंभीर संकेत हैं। आपकी भलाई सबसे पहले आती है। ज़रूरी है कि आप थोड़ा पीछे हटें, सोचें और किसी भरोसेमंद इंसान से बात करें — काउंसलर, दोस्त या परिवार।",
    },
    actions: {
      improve: {
        en: "Prioritize your mental and emotional safety before anything else right now.",
        hi: "अभी सबसे पहले अपनी मानसिक और भावनात्मक सुरक्षा को प्राथमिकता दें।",
      },
      reassess: {
        en: "Give yourself space and time before making any major decisions.",
        hi: "कोई बड़ा फैसला करने से पहले खुद को वक्त और जगह दें।",
      },
      prepare: {
        en: "Build a support system — talk to a trusted person or professional counselor.",
        hi: "अपना सपोर्ट सिस्टम बनाएं — किसी भरोसेमंद इंसान या काउंसलर से बात करें।",
      },
    },
    color: "#f87171",
    emoji: "🔴",
  },
};

export function getResult(score: number): ResultStatus {
  if (score <= 8) return "stable";
  if (score <= 18) return "at-risk";
  return "critical";
}
