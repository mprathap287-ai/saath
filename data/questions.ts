export type Option = {
  en: string;
  hi: string;
  score: number;
};

export type Question = {
  id: number;
  en: string;
  hi: string;
  options: Option[];
};

export const questions: Question[] = [
  {
    id: 1,
    en: "How often do you and your partner communicate openly?",
    hi: "आप और आपका साथी कितनी बार खुलकर बात करते हैं?",
    options: [
      { en: "Every day, freely", hi: "हर रोज़, बेझिझक", score: 3 },
      { en: "Sometimes, but with effort", hi: "कभी-कभी, थोड़ी मेहनत से", score: 2 },
      { en: "Rarely, feels forced", hi: "कम ही, मजबूरी जैसा लगता है", score: 1 },
      { en: "Almost never", hi: "लगभग कभी नहीं", score: 0 },
    ],
  },
  {
    id: 2,
    en: "How do you feel after spending time with your partner?",
    hi: "अपने साथी के साथ वक्त बिताने के बाद आप कैसा महसूस करते हैं?",
    options: [
      { en: "Energized and happy", hi: "ताज़ा और खुश", score: 3 },
      { en: "Mostly good, some tension", hi: "अच्छा, पर थोड़ा तनाव", score: 2 },
      { en: "Drained or anxious", hi: "थका हुआ या चिंतित", score: 1 },
      { en: "Relieved when it ends", hi: "खत्म होने पर राहत मिलती है", score: 0 },
    ],
  },
  {
    id: 3,
    en: "Do you trust your partner completely?",
    hi: "क्या आप अपने साथी पर पूरा भरोसा करते हैं?",
    options: [
      { en: "Yes, without doubt", hi: "हाँ, बिलकुल", score: 3 },
      { en: "Mostly yes", hi: "ज़्यादातर हाँ", score: 2 },
      { en: "I have some doubts", hi: "कुछ शक रहता है", score: 1 },
      { en: "No, trust is broken", hi: "नहीं, भरोसा टूटा हुआ है", score: 0 },
    ],
  },
  {
    id: 4,
    en: "How are conflicts handled between you two?",
    hi: "आप दोनों के बीच झगड़े कैसे सुलझते हैं?",
    options: [
      { en: "Calmly, we find solutions", hi: "शांति से, हल निकालते हैं", score: 3 },
      { en: "It takes time but resolves", hi: "वक्त लगता है पर सुलझ जाता है", score: 2 },
      { en: "Arguments are frequent, unresolved", hi: "झगड़े होते हैं, सुलझते नहीं", score: 1 },
      { en: "One person always wins by force", hi: "एक जबरदस्ती जीतता है", score: 0 },
    ],
  },
  {
    id: 5,
    en: "Do you feel respected by your partner?",
    hi: "क्या आपका साथी आपको इज़्ज़त देता है?",
    options: [
      { en: "Always", hi: "हमेशा", score: 3 },
      { en: "Usually, with small lapses", hi: "आमतौर पर, कभी-कभी भूल", score: 2 },
      { en: "Sometimes I feel dismissed", hi: "कभी-कभी नज़रअंदाज़ होता हूँ", score: 1 },
      { en: "Rarely or never", hi: "कम या कभी नहीं", score: 0 },
    ],
  },
  {
    id: 6,
    en: "Do you share similar values and life goals?",
    hi: "क्या आपके और आपके साथी के जीवन के लक्ष्य और मूल्य एक जैसे हैं?",
    options: [
      { en: "Very aligned", hi: "बिल्कुल मिलते-जुलते", score: 3 },
      { en: "Mostly aligned", hi: "ज़्यादातर समान", score: 2 },
      { en: "Some major differences", hi: "कुछ बड़े अंतर हैं", score: 1 },
      { en: "Very different paths", hi: "बिल्कुल अलग रास्ते", score: 0 },
    ],
  },
  {
    id: 7,
    en: "How often do you feel lonely even when together?",
    hi: "साथ होने पर भी आप कितनी बार अकेलापन महसूस करते हैं?",
    options: [
      { en: "Never", hi: "कभी नहीं", score: 3 },
      { en: "Occasionally", hi: "कभी-कभी", score: 2 },
      { en: "Quite often", hi: "अक्सर", score: 1 },
      { en: "Almost always", hi: "लगभग हमेशा", score: 0 },
    ],
  },
  {
    id: 8,
    en: "Do you feel emotionally safe to be yourself?",
    hi: "क्या आप अपने साथी के साथ खुद को सुरक्षित महसूस करते हैं?",
    options: [
      { en: "Completely safe", hi: "पूरी तरह सुरक्षित", score: 3 },
      { en: "Mostly safe", hi: "ज़्यादातर सुरक्षित", score: 2 },
      { en: "I hide parts of myself", hi: "कुछ चीज़ें छुपाता हूँ", score: 1 },
      { en: "I feel judged or controlled", hi: "जज किया या कंट्रोल किया जाता हूँ", score: 0 },
    ],
  },
  {
    id: 9,
    en: "Has your relationship shown patterns of manipulation or control?",
    hi: "क्या आपके रिश्ते में हेरफेर या नियंत्रण के संकेत दिखे हैं?",
    options: [
      { en: "Never", hi: "कभी नहीं", score: 3 },
      { en: "Rarely, isolated incidents", hi: "कभी-कभी, अलग-अलग घटनाएं", score: 2 },
      { en: "Yes, it happens sometimes", hi: "हाँ, कभी-कभी होता है", score: 1 },
      { en: "Yes, it's a clear pattern", hi: "हाँ, यह एक पैटर्न है", score: 0 },
    ],
  },
  {
    id: 10,
    en: "Honestly, do you see a future together?",
    hi: "सच में, क्या आप दोनों का एक साथ भविष्य देखते हैं?",
    options: [
      { en: "Yes, clearly and positively", hi: "हाँ, साफ़ और अच्छा भविष्य", score: 3 },
      { en: "I hope so, with some work", hi: "उम्मीद है, थोड़ी मेहनत से", score: 2 },
      { en: "I'm not sure anymore", hi: "अब यकीन नहीं", score: 1 },
      { en: "Honestly, no", hi: "सच में, नहीं", score: 0 },
    ],
  },
];
