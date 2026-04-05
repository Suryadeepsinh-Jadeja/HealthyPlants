export type SupportedLanguage = 'en' | 'hi' | 'ta' | 'gu';

export interface LocalizedText {
  en: string;
  hi: string;
  ta: string;
  // Add Gujarati copy under `gu` beside the existing language fields.
  gu?: string;
}

export interface LocalizedList {
  en: string[];
  hi: string[];
  ta: string[];
  // Add Gujarati bullet lists under `gu` beside the existing language fields.
  gu?: string[];
}

export interface DiseaseInfo {
  id: string;
  name: LocalizedText;
  severity: "low" | "medium" | "high" | "none";
  symptoms: LocalizedList;
  causes: LocalizedText;
  organicTreatment: LocalizedList;
  chemicalTreatment: LocalizedList;
  prevention: LocalizedList;
  affectedStage: string;
  spreadRisk: "low" | "medium" | "high";
  colorCode: string;
}

// TODO(gujarati): Add `gu` values beside `en`/`hi`/`ta` in each disease entry
// below for these fields:
// - name
// - symptoms
// - causes
// - organicTreatment
// - chemicalTreatment
// - prevention
//
// Example:
// name: { en: 'Rice Blast', hi: '...', ta: '...', gu: '...' }
// symptoms: { en: ['...'], hi: ['...'], ta: ['...'], gu: ['...'] }
export const getLocalizedText = (value: LocalizedText, lang: SupportedLanguage): string =>
  value[lang] || value.en;

export const getLocalizedList = (value: LocalizedList, lang: SupportedLanguage): string[] =>
  value[lang] || value.en;

export const ALL_DISEASES: DiseaseInfo[] = [
  // TODO(gujarati): Add Gujarati (`gu`) disease guidance to each localized
  // block in the entries below. Until then, Gujarati will fall back to English.
  // Shared across crops. The current hierarchical models can emit "healthy"
  // for cotton, potato, and corn, and the app can reuse this generic state.
  {
    id: "healthy",
    name: {
      en: "Healthy",
      hi: "स्वस्थ",
      ta: "ஆரோக்கியமான",
      gu: "સ્વસ્થ"
    },
    severity: "none",
    symptoms: {
      en: ["Vigorous green leaves", "No spots or lesions", "Healthy tillering and panicle development"],
      hi: ["हरे और मजबूत पत्ते", "कोई धब्बे या घाव नहीं", "स्वस्थ बालियाँ"],
      ta: ["ஆரோக்கியமான பச்சை இலைகள்", "எந்த புள்ளிகளும் அல்லது காயங்களும் இல்லை", "ஆரோக்கியமான கதிர் வளர்ச்சி"],
      gu: ["લીલાં અને મજબૂત પાંદડાં", "કોઈ ડાઘ અથવા જખમ નહીં", "સ્વસ્થ ફૂટ અને સૂળ વિકાસ"]
    },
    causes: {
      en: "Proper nutrition, good soil health, and favorable weather conditions.",
      hi: "उचित पोषण, अच्छी मिट्टी का स्वास्थ्य, और अनुकूल मौसम की स्थिति।",
      ta: "சரியான ஊட்டச்சத்து, நல்ல மண் வளம் மற்றும் சாதகமான வானிலை.",
      gu: "યોગ્ય પોષણ, સારી જમીનની તંદુરસ્તી અને અનુકૂળ હવામાન પરિસ્થિતિઓ."
    },
    organicTreatment: { en: [], hi: [], ta: [], gu: [] },
    chemicalTreatment: { en: [], hi: [], ta: [], gu: [] },
    prevention: {
      en: ["Maintain balanced fertilization", "Ensure proper water management", "Use disease-resistant seeds"],
      hi: ["संतुलित खाद बनाए रखें", "जल प्रबंधन सुनिश्चित करें", "रोग प्रतिरोधी बीजों का उपयोग करें"],
      ta: ["சீரான உரமிடுதலை பராமரிக்கவும்", "சரியான நீர் நிர்வாகத்தை உறுதி செய்யவும்", "நோய் எதிர்ப்பு விதைகளை பயன்படுத்தவும்"],
      gu: ["સંતુલિત ખાતર જાળવો", "યોગ્ય પાણી વ્યવસ્થાપન સુનિશ્ચિત કરો", "રોગ-પ્રતિરોધક બીજ વાપરો"]
    },
    affectedStage: "All stages",
    spreadRisk: "low",
    colorCode: "#4CAF50"
  },
  {
    // Rice diseases
    id: "rice_blast",
    name: {
      en: "Rice Blast",
      hi: "धान का झुलसा रोग",
      ta: "குலை நோய்",
      gu: "ડાંગરનો ઝળહળ રોગ (બ્લાસ્ટ)"
    },
    severity: "high",
    symptoms: {
      en: ["Spindle-shaped spots with grey centers and brown margins on leaves", "Lesions on nodes causing the stem to break", "Rotting of the neck of the panicle (Neck Blast)"],
      hi: ["पत्तियों पर धुंधले भूरे किनारे वाले धब्बे", "गांठों पर घाव जिससे तना टूट सकता है", "बालियों की गर्दन का सड़ना (नेक ब्लास्ट)"],
      ta: ["இலைகளில் சாம்பல் நிற மையம் மற்றும் பழுப்பு நிற விளிம்புகளுடன் சுழல் வடிவ புள்ளிகள்", "கணுக்களில் ஏற்படும் காயங்களால் தண்டு உடைதல்", "கதிர் கழுத்து அழுகல் நோய்"],
      gu: ["પાંદડાઓ પર ભૂખરા કેન્દ્ર અને ભૂરા કિનારા સાથે ચક્રાકાર ડાઘ", "ગાંઠ પર જખમ, જેથી પ્રકાંડ તૂટી શકે", "સૂળની ગ્રીવાનો સડો (ગ્રીવા ઝળહળ)"]
    },
    causes: {
      en: "Caused by the fungus Magnaporthe oryzae. Highly favored by high humidity, overcast skies, and excessive nitrogen.",
      hi: "मैग्नापोर्थे ओराइजी फफूंद के कारण। अत्यधिक नमी और नाइट्रोजन के कारण फैलता है।",
      ta: "மாக்னபோர்தே ஒரைசே என்ற பூஞ்சையால் ஏற்படுகிறது. அதிக ஈரப்பதம் மற்றும் அதிக தழைச்சத்து இதற்கு சாதகமானது.",
      gu: "Magnaporthe oryzae ફૂગ દ્વારા થાય છે. વધુ ભેજ, વાદળછાયું આકાશ અને વધુ પડતા નાઇટ્રોજનને કારણે ઝડપથી ફેલાય છે."
    },
    organicTreatment: {
      en: ["Spray Pseudomonas fluorescens (10g/liter)", "Use Neem seed kernel extract (5%)", "Apply cow dung slurry to seeds"],
      hi: ["स्यूडोमोनास फ्लूरेसेंस (10g/liter) का छिड़काव", "नीम के बीज का अर्क (5%) का उपयोग", "बीजों पर गाय के गोबर का लेप"],
      ta: ["சூடோமோனாஸ் புளோரசன்ஸ் தெளிக்கவும் (10 கிராம்/லிட்டர்)", "5% வேப்பங்கொட்டை சாறை பயன்படுத்தவும்", "விதைகளில் சாணக்கரைசலை தடவவும்"],
      gu: ["Pseudomonas fluorescens (10 ગ્રામ/લિટર) નો છંટકાવ કરો", "લીમડાના બીજના અર્ક (5%) નો ઉપયોગ કરો", "બીજ પર ગાયના છાણનો ઘોળ લગાવો"]
    },
    chemicalTreatment: {
      en: ["Spray Tricyclazole 75% WP @ 0.6 g/liter of water", "Apply Isoprothiolane 40% EC @ 1.5 ml/liter", "Use Kasugamycin 3% SL"],
      hi: ["ट्राईसाइक्लोज़ोल 75% WP (0.6 ग्राम/लीटर) का छिड़काव", "आइसोप्रोथियोलेन 40% EC (1.5 मिली/लीटर) डालें", "कासुगामाइसिन 3% SL का प्रयोग करें"],
      ta: ["ட்ரைசைக்ளாசோல் 75% WP (0.6 கி/லிட்டர்) தெளிக்கவும்", "ஐசோபுரோதியோலேன் 40% EC (1.5 மிலி/லிட்டர்) பயன்படுத்தவும்", "கசுகாமைசின் 3% SL பயன்படுத்தவும்"],
      gu: ["Tricyclazole 75% WP @ 0.6 ગ્રામ/લિટર પાણીમાં છાંટો", "Isoprothiolane 40% EC @ 1.5 મિ.લિ./લિટર લગાડો", "Kasugamycin 3% SL વાપરો"]
    },
    prevention: {
      en: ["Avoid excessive nitrogen fertilizers", "Destroy infected crop residues", "Use resistant varieties (e.g., MTU 1001)"],
      hi: ["अत्यधिक नाइट्रोजन उर्वरकों से बचें", "संक्रमित फसल के अवशेषों को नष्ट करें", "प्रतिरोधी किस्मों (जैसे MTU 1001) का उपयोग करें"],
      ta: ["அதிகப்படியான தழைச்சத்து உரங்களை தவிர்க்கவும்", "பாதிக்கப்பட்ட பயிர் எச்சங்களை அழிக்கவும்", "நோய் எதிர்ப்பு ரகங்களை பயன்படுத்தவும்"],
      gu: ["વધુ પડતા નાઇટ્રોજન ખાતરથી બચો", "ચેપગ્રસ્ત પાક અવશેષ નષ્ટ કરો", "પ્રતિરોધક જાતો વાપરો (દા.ત. MTU 1001)"]
    },
    affectedStage: "Seedling to grain formation",
    spreadRisk: "high",
    colorCode: "#F44336"
  },
  {
    id: "brown_spot",
    name: {
      en: "Brown Spot",
      hi: "भूरा धब्बा रोग",
      ta: "பழுப்பு புள்ளி நோய்",
      gu: "ભૂરો ડાઘ રોગ"
    },
    severity: "medium",
    symptoms: {
      en: ["Oval-shaped brown spots with a grey or whitish center on leaves", "Infected seeds show dark brown or black discoloration", "Stunted growth and reduced tillering"],
      hi: ["पत्तियों पर अण्डाकार भूरे धब्बे जिनका केंद्र सफेद होता है", "संक्रमित बीजों पर गहरा भूरा या काला रंग", "पौधे का विकास रुकना"],
      ta: ["இலைகளில் வெள்ளை அல்லது சாம்பல் நிற மையத்துடன் நீள்வட்ட பழுப்பு நிறப் புள்ளிகள்", "பாதிக்கப்பட்ட விதைகள் அடர் பழுப்பு அல்லது கருப்பு நிறமாக மாறும்", "வளர்ச்சி குன்றுதல்"],
      gu: ["પાંદડાઓ પર ભૂખરા અથવા સફેદ કેન્દ્ર સાથે અંડાકાર ભૂરા ડાઘ", "ચેપગ્રસ્ત બીજ પર ઘેરો ભૂરો અથવા કાળો રંગ", "છોડનો વિકાસ અટકવો અને ઓછી ફૂટ થવી"]
    },
    causes: {
      en: "Caused by fungus Bipolaris oryzae. Poor soil nutrition and water stress exacerbate it.",
      hi: "बाइपोलारिस ओराइजी फफूंद के कारण। खराब मिट्टी और पानी की कमी से बढ़ता है।",
      ta: "பைபோலாரிஸ் ஒரைசே பூஞ்சையால் ஏற்படுகிறது. மோசமான மண் ஊட்டச்சத்து மற்றும் தண்ணீர் தட்டுப்பாட்டால் இது அதிகரிக்கிறது.",
      gu: "Bipolaris oryzae ફૂગ દ્વારા થાય છે. ખરાબ જમીન પોષણ અને પાણીની અછત આ રોગ વધારે છે."
    },
    organicTreatment: {
      en: ["Soak seeds in hot water (54°C) for 10 minutes", "Spray Neem oil extract", "Improve soil nutrition with organic manure"],
      hi: ["बीजों को गर्म पानी (54°C) में 10 मिनट भिगोएं", "नीम के तेल का छिड़काव", "जैविक खाद से मिट्टी का पोषण सुधारें"],
      ta: ["விதைகளை சுடுநீரில் (54°C) 10 நிமிடங்கள் ஊறவைக்கவும்", "வேப்ப எண்ணெய் தெளிக்கவும்", "இயற்கை உரங்கள் மூலம் மண் வளத்தை மேம்படுத்தவும்"],
      gu: ["બીજ ગરમ પાણી (54°C) માં 10 મિનિટ પલાળો", "લીમડાના તેલનો છંટકાવ કરો", "જૈવિક ખાતર વડે જમીનનું પોષણ સુધારો"]
    },
    chemicalTreatment: {
      en: ["Spray Mancozeb 75% WP @ 2g/liter", "Spray Propiconazole 25 EC @ 1ml/liter", "Seed treatment with Thiram"],
      hi: ["मैनकोजेब 75% WP (2 ग्राम/लीटर) का छिड़काव", "प्रोपिकोनाजोल 25 EC (1 मिली/लीटर) का छिड़काव", "थीरम के साथ बीज उपचार"],
      ta: ["மேன்கோசெப் 75% WP (2 கிராம்/லிட்டர்) தெளிக்கவும்", "ப்ரோபிகோனசோல் 25 EC (1 மிலி/லிட்டர்) தெளிக்கவும்", "திரம் கொண்டு விதை நேர்த்தி செய்யவும்"],
      gu: ["Mancozeb 75% WP @ 2 ગ્રામ/લિટર છાંટો", "Propiconazole 25 EC @ 1 મિ.લિ./લિટર છાંટો", "Thiram વડે બીજ માવજત કરો"]
    },
    prevention: {
      en: ["Apply timely and balanced NPK fertilizers", "Ensure a proper watering schedule", "Use certified disease-free seeds"],
      hi: ["सही समय पर संतुलित NPK उर्वरक डालें", "सही सिंचाई सुनिश्चित करें", "प्रमाणित रोग मुक्त बीजों का उपयोग करें"],
      ta: ["சரியான நேரத்தில் சமச்சீர் NPK உரங்களை இடவும்", "முறையான நீர்ப்பாசன திட்டத்தை உறுதி செய்யவும்", "சான்றளிக்கப்பட்ட நோய் இல்லாத விதைகளை பயன்படுத்தவும்"],
      gu: ["સમયસર સંતુલિત NPK ખાતર આપો", "નિયમિત સિંચાઈ સુનિશ્ચિત કરો", "પ્રમાણિત રોગ-મુક્ત બીજ વાપરો"]
    },
    affectedStage: "Seedling to maturity",
    spreadRisk: "medium",
    colorCode: "#FF9800"
  },
  {
    id: "leaf_smut",
    name: {
      en: "Leaf Smut",
      hi: "पत्ती की कंडिका",
      ta: "இலை கரிப்பு நோய்",
      gu: "પર્ણ ઝૂળ (લીફ સ્મટ)"
    },
    severity: "low",
    symptoms: {
      en: ["Small, slightly raised black spots (sori) on leaves", "Spots can rupture and release black powdery spores", "Usually affects only older leaves"],
      hi: ["पत्तियों पर छोटे, उभरे हुए काले धब्बे (सोराई)", "धब्बे फूटकर काले पाउडर जैसे बीजाणु छोड़ते हैं", "आमतौर पर केवल पुरानी पत्तियों को प्रभावित करता है"],
      ta: ["இலைகளில் சிறிய, சற்று உயர்த்தப்பட்ட கருப்பு புள்ளிகள்", "புள்ளிகள் வெடித்து கருப்பு தூள் போன்ற வித்துக்களை வெளியிடும்", "பொதுவாக பழைய இலைகளை மட்டுமே பாதிக்கும்"],
      gu: ["પાંદડાઓ પર નાના, સહેજ ઉપસેલા કાળા ડાઘ", "ડાઘ ફૂટીને કાળા પાવડર જેવા બીજકણ છોડે છે", "સામાન્ય રીતે ફક્ત જૂના પાંદડાઓને પ્રભાવિત કરે છે"]
    },
    causes: {
      en: "A minor fungal disease caused by Entyloma oryzae. High nitrogen and dense canopies can favor it.",
      hi: "एंटिलोमा ओराइजी फफूंद के कारण। अत्यधिक नाइट्रोजन और घने पौधों से बढ़ता है।",
      ta: "என்டிலோமா ஒரைசே என்ற பூஞ்சையால் ஏற்படும் ஒரு சிறிய நோய். அதிக தழைச்சத்து இதற்கு சாதகமானது.",
      gu: "Entyloma oryzae ફૂગ દ્વારા ઉત્પન્ન એક સામાન્ય ફૂગ રોગ. વધારે નાઇટ્રોજન અને ઘટ્ટ વાવેતર આ રોગ માટે અનુકૂળ છે."
    },
    organicTreatment: {
      en: ["Usually requires no treatment as it rarely causes yield loss", "Ensure proper spacing between crops", "Avoid excess manure"],
      hi: ["आमतौर पर किसी उपचार की आवश्यकता नहीं होती", "पौधों के बीच उचित दूरी सुनिश्चित करें", "अत्यधिक खाद से बचें"],
      ta: ["பொதுவாக எந்த சிகிச்சையும் தேவையில்லை, இது மகசூல் இழப்பை ஏற்படுத்துவது அரிது", "பயிர்களுக்கு இடையே சரியான இடைவெளியை உறுதி செய்யவும்", "அதிகப்படியான உரத்தை தவிர்க்கவும்"],
      gu: ["સામાન્ય રીતે કોઈ સારવારની જરૂર નથી, તેનાથી ઉત્પાદનમાં ભાગ્યે જ ઘટાડો થાય છે", "છોડ વચ્ચે યોગ્ય અંતર રાખો", "વધુ પડતા ખાતરથી દૂર રહો"]
    },
    chemicalTreatment: {
      en: ["Copper-based fungicides can be used if severity is unexpectedly high", "Propiconazole @ 1ml/liter"],
      hi: ["गंभीरता अधिक होने पर कॉपर युक्त कवकनाशी का उपयोग किया जा सकता है", "प्रोपिकोनाजोल (1 मिली/लीटर)"],
      ta: ["பாதிப்பு அதிகம் இருந்தால் தாமிர அடிப்படையிலான பூஞ்சாள கொல்லிகளை பயன்படுத்தலாம்", "புரொபிகோனசோல் 1மிலி/லிட்டர்"],
      gu: ["ગંભીર પ્રકોપ સમયે તાંબા આધારિત ફૂગનાશક વાપરી શકાય", "Propiconazole @ 1 મિ.લિ./લિટર"]
    },
    prevention: {
      en: ["Avoid dense planting", "Reduce nitrogen fertilizer dosage"],
      hi: ["घनी रोपाई से बचें", "नाइट्रोजन उर्वरक की खुराक कम करें"],
      ta: ["நெருக்கமான நடவை தவிர்க்கவும்", "தழைச்சத்து உரத்தின் அளவை குறைக்கவும்"],
      gu: ["ગીચ રોપાણ ટાળો", "નાઇટ્રોજન ખાતરની માત્રા ઘટાડો"]
    },
    affectedStage: "Late tillering to maturity",
    spreadRisk: "low",
    colorCode: "#FFEB3B"
  },
  {
    id: "bacterial_blight",
    name: {
      en: "Bacterial Blight",
      hi: "जीवाणु झुलसा",
      ta: "பாக்டீரியா இலை கருகல் நோய்",
      gu: "બૅક્ટેરિયલ ઝળહળ (જીવાણુ ઝળહળ)"
    },
    severity: "high",
    symptoms: {
      en: ["Water-soaked yellowish stripes on leaf blades", "Leaves turn yellow, then white and later die", "Infected seedlings wither and die (Kresek phase)"],
      hi: ["पत्तियों पर पीले रंग की धारियां जो पानी से भीगी लगती हैं", "पत्तियां पीली, फिर सफेद हो जाती हैं और सूख कर मर जाती हैं", "संक्रमित छोटे पौधे सूख कर मर जाते हैं (क्रेसेक चरण)"],
      ta: ["இலைகளில் நீர் கோர்த்த மஞ்சள் நிற கோடுகள்", "இலைகள் மஞ்சளாகி, பின் வெள்ளையாகி காய்ந்துவிடும்", "பாதிக்கப்பட்ட நாற்றுக்கள் வாடி இறந்துவிடும்"],
      gu: ["પાંદડા પર પાણીથી ભીંજાયેલા પીળાશ પડતા પટ્ટાઓ", "પાંદડા પહેલાં પીળા, પછી સફેદ થઈ સૂકાઈ જાય છે", "ચેપગ્રસ્ત રોપાઓ સુકાઈને મરી જાય છે (ક્રેસેક અવસ્થા)"]
    },
    causes: {
      en: "Caused by the bacteria Xanthomonas oryzae. Spreads rapidly during heavy rain, high winds, and continuous flooding.",
      hi: "ज़ैंथोमोनास ओराइजी बैक्टीरिया के कारण। भारी बारिश और तेज़ हवाओं के दौरान तेज़ी से फैलता है।",
      ta: "சாந்தோமோனாஸ் ஒரைசே என்ற பாக்டீரியாவால் ஏற்படுகிறது. பலத்த மழை மற்றும் அதிக காற்று வீசும்போது வேகமாக பரவும்.",
      gu: "Xanthomonas oryzae બૅક્ટેરિયા દ્વારા થાય છે. ભારે વરસાદ, તેજ પવન અને સતત પાણી ભરાવાથી ઝડપથી ફેલાય છે."
    },
    organicTreatment: {
      en: ["Spray fresh cow dung extract (20%)", "Apply Trichoderma as seed treatment", "Drain the field during periods of infection"],
      hi: ["ताजे गाय के गोबर का घोल (20%) का छिड़काव", "ट्राइकोडर्मा से बीज उपचार", "संक्रमण के दौरान खेत से पानी निकाल दें"],
      ta: ["புதிய சாணக்கரைசலை (20%) தெளிக்கவும்", "ட்ரைக்கோடெர்மாவை விதை நேர்த்தியாக பயன்படுத்தவும்", "நோய்த்தொற்றின் போது வயலில் இருந்து தண்ணீரை வடிகட்டவும்"],
      gu: ["તાજા ગાયના છાણના દ્રાવણ (20%) નો છંટકાવ કરો", "Trichoderma વડે બીજ માવજત કરો", "ચેપ સમયે ખેતરમાંથી પાણી કાઢી નાખો"]
    },
    chemicalTreatment: {
      en: ["Spray Streptomycin sulphate + Tetracycline (e.g. Streptocycline) @ 1g/10 liters", "Apply Copper Oxychloride 50% WP @ 2.5g/liter along with antibiotics"],
      hi: ["स्ट्रेप्टोमाइसिन+टेट्रासाइक्लिन (1 ग्राम/10 लीटर) का छिड़काव", "एंटीबायोटिक के साथ कॉपर ऑक्सीक्लोराइड 50% WP (2.5 ग्राम/लीटर) डालें"],
      ta: ["ஸ்ட்ரெப்டோமைசின் + டெட்ராசைக்ளின் (1 கிராம்/10 லிட்டர்) தெளிக்கவும்", "நுண்ணுயிர் கொல்லிகளுடன் காப்பர் ஆக்சிக்குளோரைடு 50% WP (2.5 கிராம்/லிட்டர்) பயன்படுத்தவும்"],
      gu: ["Streptomycin sulphate + Tetracycline @ 1 ગ્રામ/10 લિટર છાંટો", "એન્ટિબાયોટિક સાથે Copper Oxychloride 50% WP @ 2.5 ગ્રામ/લિટર લગાડો"]
    },
    prevention: {
      en: ["Use resistant varieties (e.g., IR 64)", "Do not clip seedling roots before transplanting", "Destroy infected stubble and weeds"],
      hi: ["प्रतिरोधी किस्मों (जैसे IR 64) का उपयोग करें", "रोपाई से पहले पोध की जड़ों को न काटें", "संक्रमित पराली और खरपतवार को नष्ट करें"],
      ta: ["நோய் எதிர்ப்பு ரகங்களை பயன்படுத்தவும்", "நடுவதற்கு முன் நாற்றின் வேர்களை நறுக்குவதை தவிர்க்கவும்", "பாதிக்கப்பட்ட தட்டை மற்றும் களைகளை அழிக்கவும்"],
      gu: ["પ્રતિરોધક જાતો વાપરો (દા.ત. IR 64)", "રોપણી પહેલાં ધરૂના મૂળ કાપશો નહીં", "ચેપગ્રસ્ત જડીયાં અને નીંદણનો નાશ કરો"]
    },
    affectedStage: "Seedling to grain formation",
    spreadRisk: "high",
    colorCode: "#F44336"
  },
  {
    id: "tungro",
    name: {
      en: "Rice Tungro",
      hi: "धान का तुंगरो रोग",
      ta: "நெல் டங்ரோ நோய்",
      gu: "ડાંગરનો ટુંગ્રો રોગ"
    },
    severity: "high",
    symptoms: {
      en: ["Leaves turn yellow to orange from the tip", "Plants become stunted with reduced tillering", "Panicles are poorly filled and grain formation drops sharply"],
      hi: ["पत्तियां सिरे से पीली या नारंगी होने लगती हैं", "पौधे छोटे रह जाते हैं और कल्ले कम बनते हैं", "बालियां ठीक से नहीं भरतीं और दाना बनना घट जाता है"],
      ta: ["இலைகள் நுனியிலிருந்து மஞ்சள் அல்லது ஆரஞ்சு நிறமாக மாறும்", "செடிகள் குறுஞ்சாதனமாகி தூர்கட்டுதல் குறையும்", "கதிர்கள் சரியாக நிரம்பாமல் மகசூல் குறையும்"],
      gu: ["પાંદડા ટોચથી પીળા અથવા નારંગી થાય છે", "છોડનો વિકાસ અટકી જાય છે અને ફૂટ ઓછી થાય છે", "સૂળ બરાબર ભરાતી નથી અને દાણા બનવામાં તીવ્ર ઘટાડો થાય છે"]
    },
    causes: {
      en: "Caused by a virus complex spread mainly by green leafhoppers. Outbreaks increase when infected volunteer plants and vector populations are not controlled.",
      hi: "यह रोग विषाणु समूह के कारण होता है और मुख्य रूप से ग्रीन लीफहॉपर से फैलता है। संक्रमित पौधों और वाहक कीटों पर नियंत्रण न होने पर इसका प्रकोप बढ़ता है।",
      ta: "இந்த நோய் வைரஸ் தொகுப்பால் ஏற்படுகிறது. இது பெரும்பாலும் பச்சை இலைத்தாவர பூச்சியால் பரவுகிறது. பாதிக்கப்பட்ட தன்னிச்சை செடிகள் மற்றும் பூச்சி எண்ணிக்கை அதிகமானால் நோய் விரைவாக பரவும்.",
      gu: "આ રોગ વાયરસ સમૂહ દ્વારા થાય છે અને મુખ્યત્વે ગ્રીન લીફહૉપર દ્વારા ફેલાય છે. ચેપગ્રસ્ત સ્વ-ઉગેલા છોડ અને વાહક જીવાતને નિયંત્રિત કરવામાં ન આવે ત્યારે પ્રકોપ વધે છે."
    },
    organicTreatment: {
      en: ["Remove and destroy infected clumps early", "Use yellow sticky traps to monitor leafhopper activity", "Keep field bunds and nearby weeds clean to reduce vector shelter"],
      hi: ["संक्रमित पौधों के गुच्छों को जल्दी हटाकर नष्ट करें", "लीफहॉपर की निगरानी के लिए पीले चिपचिपे ट्रैप लगाएं", "मेड़ों और आसपास की खरपतवार साफ रखें ताकि वाहक कीट कम हों"],
      ta: ["பாதிக்கப்பட்ட கொத்துகளை ஆரம்பத்திலேயே அகற்றி அழிக்கவும்", "இலைத்தாவர பூச்சியை கண்காணிக்க மஞ்சள் ஒட்டும் கவர்களை பயன்படுத்தவும்", "வயல் கரைகள் மற்றும் அருகிலுள்ள களைகளை சுத்தமாக வைத்து பூச்சி தங்குமிடத்தை குறைக்கவும்"],
      gu: ["ચેપગ્રસ્ત છોડના ઝુંડને વહેલી તકે ઉખાડીને નષ્ટ કરો", "લીફહૉપરની ગતિવિધિ પર દેખરેખ રાખવા પીળા ચીકણા ટ્રેપ વાપરો", "વાહક કીટકોનો આશ્રય ઘટાડવા ખેતરના શેઢા અને નીંદણ સ્વચ્છ રાખો"]
    },
    chemicalTreatment: {
      en: ["Control green leafhopper vectors with recommended systemic insecticides as per local agricultural guidance", "Use nursery-stage vector management if tungro pressure is known in the area"],
      hi: ["स्थानीय कृषि सलाह के अनुसार ग्रीन लीफहॉपर नियंत्रण के लिए उपयुक्त प्रणालीगत कीटनाशकों का उपयोग करें", "यदि क्षेत्र में तुंगरो का दबाव अधिक हो तो नर्सरी अवस्था से ही वाहक कीट नियंत्रण करें"],
      ta: ["உள்ளூர் வேளாண் பரிந்துரைப்படி பச்சை இலைத்தாவர பூச்சியை கட்டுப்படுத்த பொருத்தமான உட்கொள்ளும் பூச்சிக்கொல்லிகளை பயன்படுத்தவும்", "அப்பகுதியில் டங்ரோ அழுத்தம் இருந்தால் நாற்று நிலை முதலே பூச்சி கட்டுப்பாட்டை மேற்கொள்ளவும்"],
      gu: ["સ્થાનિક કૃષિ માર્ગદર્શન અનુસાર ગ્રીન લીફહૉપર નિયંત્રણ માટે યોગ્ય પ્રણાલીગત જંતુનાશકો વાપરો", "વિસ્તારમાં ટુંગ્રોનો ખતરો હોય તો નર્સરી અવસ્થાથી જ વાહક જંતુ નિયંત્રણ કરો"]
    },
    prevention: {
      en: ["Use tungro-tolerant or resistant varieties where available", "Synchronize planting within the area", "Avoid overlapping crop cycles that allow vectors to survive continuously"],
      hi: ["जहां संभव हो तुंगरो सहनशील या प्रतिरोधी किस्में लगाएं", "क्षेत्र में एक साथ रोपाई करें", "ऐसी फसल अवधि से बचें जिससे वाहक कीट लगातार जीवित रहें"],
      ta: ["டங்ரோ தாங்கும் அல்லது எதிர்ப்பு சக்தி உள்ள ரகங்களை பயன்படுத்தவும்", "பகுதியில் ஒரே நேரத்தில் நடவு செய்யவும்", "பூச்சி தொடர்ந்து வாழ உதவும் ஒட்டுமொத்த பயிர் சுழற்சிகளை தவிர்க்கவும்"],
      gu: ["જ્યાં ઉપલબ્ધ હોય ત્યાં ટુંગ્રો-સહનશીલ અથવા પ્રતિરોધક જાત વાવો", "આખા વિસ્તારમાં એક સાથે વાવેતર કરો", "વાહક કીટકોને સતત જીવિત રહેવા દે તેવા ઓવરલેપિંગ પાક-ચક્ર ટાળો"]
    },
    affectedStage: "Nursery to tillering",
    spreadRisk: "high",
    colorCode: "#E53935"
  },
  {
    id: "sheath_blight",
    name: {
      en: "Sheath Blight",
      hi: "शीथ ब्लाइट (पर्णच्छद झुलसा)",
      ta: "இலை உறை கருகல் நோய்",
      gu: "પર્ણાવરણ સુકારો (શીથ બ્લાઇટ)"
    },
    severity: "medium",
    symptoms: {
      en: ["Oval or irregular greenish-grey spots on leaf sheaths near water level", "Spots enlarge and develop brown margins with grey centers", "In severe cases, leads to lodging of the crop"],
      hi: ["पानी की सतह के पास पर्णच्छद (शीथ) पर हरे-भूरे धब्बे", "धब्बे बड़े हो जाते हैं और उनका केंद्र ग्रे और किनारे भूरे होते हैं", "गंभीर स्थिति में फसल गिर सकती है"],
      ta: ["நீர் மட்டத்திற்கு அருகில் இலை உறைகளில் நீள்வட்ட அல்லது ஒழுங்கற்ற பச்சை கலந்த சாம்பல் நிற புள்ளிகள்", "புள்ளிகள் பெரிதாகி, சாம்பல் நிற மையத்துடன் பழுப்பு நிற விளிம்புகளை உருவாக்கும்", "கடுமையான பாதிப்பில் பயிர் சாய்ந்துவிடும்"],
      gu: ["પાણીની સપાટી નજીક પાંદડાના આવરણ પર અંડાકાર અથવા અનિયમિત લીલાશ પડતા-ભૂખરા ડાઘ", "ડાઘ મોટા થઈને ભૂખરા કેન્દ્ર અને બદામી કિનારીઓમાં ફેરવાય છે", "ગંભીર સ્થિતિમાં પાક ઢળી પડે છે"]
    },
    causes: {
      en: "Fungal disease from Rhizoctonia solani. Favored by high seeding rates, closed canopy, and high nitrogen.",
      hi: "राइजोक्टोनिया सोलानी फफूंद के कारण। घनी बुवाई और उच्च नाइट्रोजन से बढ़ता है।",
      ta: "ரைசோக்டோனியா சோலானி என்ற பூஞ்சை நோய். நெருக்கமான நடவு மற்றும் அதிக தழைச்சத்து இதற்கு சாதகமானது.",
      gu: "Rhizoctonia solani ફૂગ દ્વારા થાય છે. વધુ પડતા બિયારણ દર, ગીચ વાવેતર અને ઉચ્ચ નાઇટ્રોજનથી તેને ઉત્તેજન મળે છે."
    },
    organicTreatment: {
      en: ["Soil application of Trichoderma viride", "Use Pseudomonas fluorescens (10g/liter) spray", "Ensure field is weed-free"],
      hi: ["मिट्टी में ट्राइकोडर्मा विरिडी का प्रयोग", "स्यूडोमोनास फ्लूरेसेंस (10 ग्राम/लीटर) का छिड़काव", "खेत को खरपतवार मुक्त रखें"],
      ta: ["மண்ணில் ட்ரைக்கோடெர்மா விரிடியை இடுதல்", "சூடோமோனாஸ் புளோரசன்ஸ் பவுடரை தெளிக்கவும்", "வயலில் களையின்றி பராமரிக்கவும்"],
      gu: ["જમીનમાં Trichoderma viride નો ઉપયોગ કરો", "Pseudomonas fluorescens (10 ગ્રામ/લિટર) નો છંટકાવ કરો", "ખેતરને નીંદણમુક્ત રાખો"]
    },
    chemicalTreatment: {
      en: ["Spray Propiconazole 25% EC @ 1ml/liter", "Spray Hexaconazole 5% EC @ 2ml/liter", "Validamycin 3% L @ 2ml/liter"],
      hi: ["प्रोपिकोनाजोल 25% EC (1 मिली/लीटर) का छिड़काव", "हेक्साकोनाजोल 5% EC (2 मिली/लीटर) का छिड़काव", "वैलिडामाइसिन 3% L (2 मिली/लीटर) का छिड़काव"],
      ta: ["ப்ரோபிகோனசோல் 25% EC (1 மிலி/லிட்டர்) தெளிக்கவும்", "ஹெக்சாகோனசோல் 5% EC (2 மிலி/லிட்டர்) தெளிக்கவும்", "வாலிடமைசின் 3% L (2 மிலி/லிட்டர்) தெளிக்கவும்"],
      gu: ["Propiconazole 25% EC @ 1 મિ.લિ./લિટર છાંટો", "Hexaconazole 5% EC @ 2 મિ.લિ./લિટર છાંટો", "Validamycin 3% L @ 2 મિ.લિ./લિટર છાંટો"]
    },
    prevention: {
      en: ["Increase plant spacing", "Drain the field for a few days at maximum tillering stage", "Apply adequate Potassium fertilizers"],
      hi: ["पौधों के बीच की दूरी बढ़ाएं", "अधिकतम कल्ले फूटने के समय खेत से कुछ दिनों के लिए पानी निकाल दें", "पर्याप्त पोटाश उर्वरक डालें"],
      ta: ["பயிர்களுக்கு இடையே இடைவெளியை அதிகரிக்கவும்", "அதிகபட்ச தூர்கட்டும் பருவத்தில் சில நாட்கள் வயலில் தண்ணீரை வடிக்கவும்", "போதிய பொட்டாஷ் உரங்களை இடவும்"],
      gu: ["છોડ વચ્ચેનું અંતર વધારો", "મહત્તમ ફૂટ આવવાના તબક્કે થોડા દિવસો માટે ખેતરમાંથી પાણી કાઢી નાખો", "પૂરતા પ્રમાણમાં પોટાશ ખાતર આપો"]
    },
    affectedStage: "Tillering to maturity",
    spreadRisk: "medium",
    colorCode: "#FF9800"
  },
  {
    id: "false_smut",
    name: {
      en: "False Smut",
      hi: "आभासी कंड (हल्दी रोग)",
      ta: "பொய் கரிப்பூட்டை நோய்",
      gu: "હળદીયો રોગ (ફોલ્સ સ્મટ)"
    },
    severity: "medium",
    symptoms: {
      en: ["Individual grains transformed into velvety spore balls", "Spore balls are initially orange-yellow, turning dark green/black", "Only a few grains in a panicle are usually affected"],
      hi: ["धान के दाने मखमली बीजाणु गेंदों में बदल जाते हैं", "बीजाणु आरंभ में नारंगी-पीले होते हैं, बाद में गहरे हरे/काले हो जाते हैं", "आमतौर पर एक बाली में कुछ ही दाने प्रभावित होते हैं"],
      ta: ["தனிப்பட்ட தானியங்கள் வெல்வெட் போன்ற வித்து பந்துகளாக மாறும்", "வித்து பந்துகள் ஆரம்பத்தில் ஆரஞ்சு-மஞ்சள் நிறமாகவும், பின்னர் அடர் பச்சை/கருப்பு நிறமாகவும் மாறும்", "பொதுவாக ஒரு கதிரில் சில தானியங்கள் மட்டுமே பாதிக்கப்படும்"],
      gu: ["વ્યક્તિગત દાણા મખમલ જેવા બીજાણુ-ગોળાઓમાં ફેરવાય છે", "આ ગોળા શરૂઆતમાં નારંગી-પીળા અને પછી ઘેરા લીલા/કાળા થાય છે", "સામાન્ય રીતે એક સૂળના થોડા જ દાણાઓ પ્રભાવિત થાય છે"]
    },
    causes: {
      en: "Caused by Ustilaginoidea virens fungus. High humidity and rain during flowering/panicle emergence lead to outbreaks.",
      hi: "अस्टिलैगिनोइडिया विरेन्स फफूंद के कारण। फूल आने के समय उच्च नमी और बारिश से फैलता है।",
      ta: "உஸ்டிலாஜினாய்டியா வைரென்ஸ் பூஞ்சையால் ஏற்படுகிறது. பூக்கும் தருணத்தில் அதிக ஈரப்பதம் மற்றும் மழையால் இது பரவுகிறது.",
      gu: "Ustilaginoidea virens ફૂગ દ્વારા થાય છે. ફૂલ આવવા સમયે ઉચ્ચ ભેજ અને વરસાદ પ્રકોપને વધારે છે."
    },
    organicTreatment: {
      en: ["It is difficult to treat organically once infected", "Avoid late planting", "Remove and destroy infected panicles carefully"],
      hi: ["संक्रमण के बाद जैविक रूप से उपचार करना मुश्किल है", "देर से बुवाई न करें", "संक्रमित बालियों को सावधानी से हटाएं और नष्ट करें"],
      ta: ["தொற்று ஏற்பட்டவுடன் இயற்கையான முறையில் குணப்படுத்துவது கடினம்", "தாமதமாக நடுவிடுவதை தவிர்க்கவும்", "பாதிக்கப்பட்ட கதிர்களை கவனமாக அகற்றி அழிக்கவும்"],
      gu: ["ચેપ લાગ્યા પછી જૈવિક ઉપચાર મુશ્કેલ છે", "મોડી વાવણી ટાળો", "ચેપગ્રસ્ત સૂળને સાવધાનીથી કાઢીને નષ્ટ કરો"]
    },
    chemicalTreatment: {
      en: ["Prophylactic spray of Copper Oxychloride 50 WP @ 2.5g/liter at booting stage", "Propiconazole 25 EC @ 1ml/liter just before flowering"],
      hi: ["फूल आने से पहले कॉपर ऑक्सीक्लोराइड 50 WP (2.5 ग्राम/लीटर) का छिड़काव", "फूल आने से ठीक पहले प्रोपिकोनाजोल 25 EC (1 मिली/लीटर) का छिड़काव"],
      ta: ["கதிர் வரும் பருவத்தில் காப்பர் ஆக்சிக்குளோரைடு 50 WP (2.5 கி/லி) தெளிக்கவும்", "பூக்கும் தருணத்திற்கு சற்று முன்பு ப்ரோபிகோனசோல் 25 EC (1 மிலி/லி) தெளிக்கவும்"],
      gu: ["સૂળ બનવાના તબક્કે Copper Oxychloride 50 WP @ 2.5 ગ્રામ/લિટર નો નિવારક છંટકાવ કરો", "ફૂલ આવતા પહેલાં Propiconazole 25 EC @ 1 મિ.લિ./લિટર નો છંટકાવ કરો"]
    },
    prevention: {
      en: ["Use disease-free seeds from healthy crops", "Provide balanced nitrogen (avoid excessive late applications)", "Apply prophylactic sprays before flowering"],
      hi: ["स्वस्थ फसल से प्राप्त रोग मुक्त बीजों का उपयोग करें", "संतुलित नाइट्रोजन दें (देर से अत्यधिक उपयोग से बचें)", "फूल आने से पहले एहतियाती छिड़काव करें"],
      ta: ["ஆரோக்கியமான பயிர்களில் இருந்து பெறப்பட்ட விதைகளை பயன்படுத்தவும்", "சமச்சீரான தழைச்சத்தை கொடுக்கவும்", "பூப்பதற்கு முன் தடுப்பு மருந்துகளை தெளிக்கவும்"],
      gu: ["સ્વસ્થ પાકમાંથી રોગમુક્ત બીજનો ઉપયોગ કરો", "સંતુલિત નાઇટ્રોજન આપો (મોડો અને વધારે ઉપયોગ ટાળો)", "ફૂલ આવતા પહેલાં રક્ષણાત્મક છંટકાવ કરો"]
    },
    affectedStage: "Flowering and maturity",
    spreadRisk: "medium",
    colorCode: "#FF9800"
  },
  {
    // Cotton diseases
    id: "cotton_bacterial_blight",
    name: {
      en: "Bacterial Blight",
      hi: "जीवाणु अंगमारी",
      ta: "பாக்டீரியா இலை கருகல்",
      gu: "બૅક્ટેરિયલ ઝળહળ (જીવાણુ સુકારો)"
    },
    severity: "high",
    symptoms: {
      en: ["Angular water-soaked spots on leaves that turn brown and necrotic", "Dark-brown to black lesions on stems and bolls (boll rot)", "Infected seedlings develop dark elongated lesions on the hypocotyl"],
      hi: ["पत्तियों पर कोणीय पानी भरे धब्बे जो भूरे और मृत हो जाते हैं", "तने और बीजकोषों पर गहरे भूरे से काले घाव (बॉल रॉट)", "संक्रमित पौधों में हाइपोकोटाइल पर गहरे लंबे घाव होते हैं"],
      ta: ["இலைகளில் கோண வடிவ நீர் கோர்த்த புள்ளிகள் பழுப்பாகி அழுகும்", "தண்டு மற்றும் காய்களில் அடர் பழுப்பு அல்லது கருப்பு நிறக் காயங்கள்", "பாதிக்கப்பட்ட நாற்றுகளில் ஹைபோகோட்டிலில் நீண்ட காயங்கள் தோன்றும்"],
      gu: ["પાંદડા પર પાણીથી ભીંજાયેલા ખૂણાવાળા ડાઘ જે બદામી થઈને સુકાઈ જાય છે", "પ્રકાંડ અને ઝીંડવા (બૉલ) પર ઘેરા બદામી-કાળા ઘા (બૉલ રૉટ)", "ચેપગ્રસ્ત રોપાઓના પ્રકાંડ પર ઘેરા, લાંબા ઘા જોવા મળે છે"]
    },
    causes: {
      en: "Caused by the bacterium Xanthomonas citri pv. malvacearum. Spreads through rain splash, wind, and infected seeds. Warm, wet weather with temperatures between 25-35°C favors rapid spread.",
      hi: "ज़ैंथोमोनास सिट्री pv. मैल्वेसेरम बैक्टीरिया के कारण। बारिश, हवा और संक्रमित बीजों से फैलता है। 25-35°C तापमान और नम मौसम इसे बढ़ावा देते हैं।",
      ta: "சாந்தோமோனாஸ் சிட்ரி pv. மால்வேசியாரம் பாக்டீரியாவால் ஏற்படுகிறது. மழை, காற்று மற்றும் பாதிக்கப்பட்ட விதைகள் மூலம் பரவுகிறது. 25-35°C வெப்பம் மற்றும் ஈரமான வானிலை இதற்கு சாதகமானது.",
      gu: "Xanthomonas citri pv. malvacearum બૅક્ટેરિયા દ્વારા થાય છે. વરસાદના છાંટા, પવન અને ચેપગ્રસ્ત બીજ દ્વારા ફેલાય છે. 25-35°C તાપમાન અને ભેજવાળું હવામાન તેનો ફેલાવો વધારે છે."
    },
    organicTreatment: {
      en: ["Spray Copper Oxychloride solution (3g/liter) as a preventive measure", "Remove and destroy infected plant material immediately", "Apply Pseudomonas fluorescens-based bioagent as foliar spray"],
      hi: ["कॉपर ऑक्सीक्लोराइड घोल (3 ग्राम/लीटर) का निवारक छिड़काव करें", "संक्रमित पौधे सामग्री को तुरंत हटाएं और नष्ट करें", "स्यूडोमोनास फ्लूरेसेंस आधारित बायोएजेंट का पत्तेदार छिड़काव करें"],
      ta: ["தடுப்பு நடவடிக்கையாக காப்பர் ஆக்சிக்குளோரைடு (3 கி/லி) தெளிக்கவும்", "பாதிக்கப்பட்ட பயிர் பகுதிகளை உடனடியாக அகற்றி அழிக்கவும்", "சூடோமோனாஸ் புளோரசன்ஸ் அடிப்படையிலான உயிரியல் முகவரை இலைகளில் தெளிக்கவும்"],
      gu: ["નિવારક માપદંડ તરીકે Copper Oxychloride (3 ગ્રામ/લિટર) ના દ્રાવણનો છંટકાવ કરો", "ચેપગ્રસ્ત છોડના ભાગોને તાત્કાલિક કાઢીને નષ્ટ કરો", "Pseudomonas fluorescens-આધારિત જૈવિક એજન્ટનો પાંદડા પર છંટકાવ કરો"]
    },
    chemicalTreatment: {
      en: ["Seed treatment with Streptomycin sulphate @ 0.1g/liter before sowing", "Spray Streptomycin sulphate + Copper Oxychloride (0.1g + 3g/liter) at first sign", "Spray Bacterinol 100 (0.5ml/liter) during active disease spread"],
      hi: ["बुवाई से पहले स्ट्रेप्टोमाइसिन सल्फेट (0.1 ग्राम/लीटर) से बीज उपचार", "पहले लक्षण पर स्ट्रेप्टोमाइसिन + कॉपर ऑक्सीक्लोराइड (0.1g+3g/लीटर) का छिड़काव", "रोग फैलने पर बैक्टेरिनॉल 100 (0.5 मिली/लीटर) का छिड़काव"],
      ta: ["விதைப்பதற்கு முன் ஸ்ட்ரெப்டோமைசின் சல்பேட் (0.1 கி/லி) கொண்டு விதை நேர்த்தி செய்யவும்", "முதல் அறிகுறியில் ஸ்ட்ரெப்டோமைசின் + காப்பர் ஆக்சிக்குளோரைடு (0.1கி+3கி/லி) தெளிக்கவும்", "நோய் பரவும்போது பாக்டீரினோல் 100 (0.5 மிலி/லி) தெளிக்கவும்"],
      gu: ["વાવણી પહેલાં Streptomycin sulphate @ 0.1 ગ્રામ/લિટર વડે બીજ માવજત કરો", "પ્રથમ ચિહ્ન દેખાવા પર Streptomycin + Copper Oxychloride (0.1 ગ્રામ + 3 ગ્રામ/લિટર) છાંટો", "રોગ સક્રિય હોય ત્યારે Bacterinol 100 (0.5 મિ.લિ./લિટર) નો છંટકાવ કરો"]
    },
    prevention: {
      en: ["Use certified disease-free or resistant seeds (e.g., LRA 5166)", "Avoid overhead irrigation that promotes leaf wetness", "Practice crop rotation with non-host crops like wheat or sorghum"],
      hi: ["प्रमाणित रोग मुक्त या प्रतिरोधी बीजों का उपयोग करें (जैसे LRA 5166)", "ऊपर से सिंचाई से बचें जो पत्तियों को गीला रखती है", "गेहूं या ज्वार जैसी गैर-मेजबान फसलों के साथ फसल चक्र अपनाएं"],
      ta: ["சான்றளிக்கப்பட்ட நோய் இல்லாத அல்லது எதிர்ப்பு விதைகளை பயன்படுத்தவும்", "இலை ஈரப்பதத்தை தடுக்க மேல்நோக்கி பாசனத்தை தவிர்க்கவும்", "கோதுமை அல்லது சோளம் போன்ற பயிர்களுடன் பயிர் சுழற்சி செய்யவும்"],
      gu: ["પ્રમાણિત રોગમુક્ત અથવા રોગ-પ્રતિકારક બીજ વાપરો (દા.ત. LRA 5166)", "ઓવરહેડ સિંચાઈ ટાળો જેનાથી પાંદડા ભીના રહે છે", "ઘઉં અથવા જુવાર જેવા બિન-યજમાન પાકો સાથે પાક ફેરબદલી કરો"]
    },
    affectedStage: "Seedling to boll formation",
    spreadRisk: "high",
    colorCode: "#8D6E63"
  },
  {
    id: "curl_virus",
    name: {
      en: "Cotton Leaf Curl Virus",
      hi: "कपास पत्ती मरोड़ रोग",
      ta: "பருத்தி இலை சுருள் வைரஸ்",
      gu: "કપાસ પર્ણ મરોડ વાયરસ (કોકડવા)"
    },
    severity: "high",
    symptoms: {
      en: ["Upward or downward curling of leaves", "Leaf veins thicken and darken (vein darkening)", "Cup-like outgrowths called enations on the underside of leaves", "Stunted plant growth and poor boll setting"],
      hi: ["पत्तियां ऊपर या नीचे की ओर मुड़ जाती हैं", "पत्ती की नसें मोटी और गहरे रंग की हो जाती हैं", "पत्तियों की निचली सतह पर कप जैसी संरचनाएं (इनेशन) बनती हैं", "पौधे का विकास रुकता है और बीजकोष कम बनते हैं"],
      ta: ["இலைகள் மேல்நோக்கி அல்லது கீழ்நோக்கி சுருண்டு கொள்ளும்", "இலை நரம்புகள் தடிமனாகி கருப்பாகும்", "இலையின் அடிப்பகுதியில் கோப்பை வடிவ வளர்ச்சிகள் (இனேஷன்) தோன்றும்", "செடி வளர்ச்சி குறைந்து காய்பிடிப்பு மோசமாகும்"],
      gu: ["પાંદડા ઉપર અથવા નીચેની તરફ વળી જાય છે", "પાંદડાની નસો જાડી અને ઘેરા રંગની થાય છે", "પાંદડાની નીચેની બાજુએ કપ જેવી રચનાઓ બને છે", "છોડનો વિકાસ અટકે છે અને ઝીંડવા ઓછા બેસે છે"]
    },
    causes: {
      en: "Caused by Cotton Leaf Curl Virus (CLCuV), a begomovirus transmitted persistently by the whitefly Bemisia tabaci. No cure exists once infected; management focuses on controlling the vector.",
      hi: "कॉटन लीफ कर्ल वायरस (CLCuV) के कारण, जो सफेद मक्खी बेमिसिया टैबासी द्वारा फैलाया जाता है। एक बार संक्रमित होने पर कोई इलाज नहीं है; प्रबंधन वाहक कीट को नियंत्रित करने पर केंद्रित है।",
      ta: "பருத்தி இலை சுருள் வைரஸால் (CLCuV) ஏற்படுகிறது. இது வெள்ளை ஈயான பெமிசியா டேபாசியால் பரவுகிறது. நோய் ஏற்பட்ட பிறகு எந்த சிகிச்சையும் இல்லை; வெக்டர் கட்டுப்பாட்டில் மட்டுமே கவனம் செலுத்த வேண்டும்.",
      gu: "કોટન લીફ કર્લ વાયરસ (CLCuV) દ્વારા થાય છે, જે સફેદ માખી (Bemisia tabaci) દ્વારા ફેલાય છે. ચેપ લાગ્યા પછી કોઈ ઈલાજ નથી; વ્યવસ્થાપન વાહક કીટકોને નિયંત્રિત કરવા પર કેન્દ્રિત છે."
    },
    organicTreatment: {
      en: ["Spray Neem oil (5ml/liter) to repel and suppress whitefly populations", "Use yellow sticky traps to monitor and reduce adult whitefly numbers", "Remove and destroy infected plants early to limit virus spread"],
      hi: ["सफेद मक्खी की आबादी को नियंत्रित करने के लिए नीम तेल (5 मिली/लीटर) का छिड़काव", "वयस्क सफेद मक्खियों को कम करने के लिए पीले चिपचिपे ट्रैप लगाएं", "वायरस के प्रसार को सीमित करने के लिए संक्रमित पौधों को जल्दी हटाएं"],
      ta: ["வெள்ளை ஈ எண்ணிக்கையை குறைக்க வேப்ப எண்ணெய் (5 மிலி/லி) தெளிக்கவும்", "வயது வந்த வெள்ளை ஈக்களை கண்காணிக்க மஞ்சள் ஒட்டும் கவர்களை பயன்படுத்தவும்", "வைரஸ் பரவலை கட்டுப்படுத்த பாதிக்கப்பட்ட செடிகளை ஆரம்பத்திலேயே அகற்றவும்"],
      gu: ["સફેદ માખીની વસ્તીને કાબૂમાં રાખવા 5 મિ.લિ./લિટર લીમડાના તેલનો છંટકાવ કરો", "પુખ્ત સફેદ માખીઓની સંખ્યા પર નજર રાખવા અને ઘટાડવા માટે પીળા ચીકણા ટ્રેપનો ઉપયોગ કરો", "વાયરસનો ફેલાવો મર્યાદિત કરવા માટે ચેપગ્રસ્ત છોડને વહેલા દૂર કરો અને નાશ કરો"]
    },
    chemicalTreatment: {
      en: ["Seed treatment with Imidacloprid 70% WS @ 5-7g/kg seed before sowing", "Spray Acetamiprid 20% SP @ 0.3g/liter or Thiamethoxam 25% WG @ 0.3g/liter for whitefly control", "Alternate insecticide groups to prevent resistance buildup in whitefly"],
      hi: ["बुवाई से पहले इमिडाक्लोप्रिड 70% WS (5-7 ग्राम/किलो बीज) से बीज उपचार", "सफेद मक्खी नियंत्रण के लिए एसिटामिप्रिड 20% SP (0.3 ग्राम/लीटर) या थियामेथोक्साम 25% WG (0.3 ग्राम/लीटर) का छिड़काव", "सफेद मक्खी में प्रतिरोध को रोकने के लिए कीटनाशक समूहों को बदलते रहें"],
      ta: ["விதைப்பதற்கு முன் இமிடாக்ளோப்ரிட் 70% WS (5-7 கி/கிலோ விதை) கொண்டு விதை நேர்த்தி செய்யவும்", "வெள்ளை ஈ கட்டுப்பாட்டிற்கு அசிட்டமிப்ரிட் 20% SP (0.3 கி/லி) அல்லது தியாமெத்தோக்சம் 25% WG (0.3 கி/லி) தெளிக்கவும்", "எதிர்ப்பு சக்தி உருவாவதை தடுக்க பூச்சிக்கொல்லி குழுக்களை மாற்றி பயன்படுத்தவும்"],
      gu: ["વાવણી પહેલાં 5-7 ગ્રામ/કિલો બીજ દીઠ ઇમિડાક્લોપ્રિડ 70% WS થી બીજ માવજત કરો", "સફેદ માખીના નિયંત્રણ માટે એસિટામિપ્રિડ 20% SP 0.3 ગ્રામ/લિટર અથવા થિયામેથોક્ઝામ 25% WG 0.3 ગ્રામ/લિટર છાંટો", "સફેદ માખીમાં પ્રતિકાર શક્તિ વધતી અટકાવવા કીટનાશક જૂથો બદલતા રહો"]
    },
    prevention: {
      en: ["Plant CLCuV-tolerant varieties where available (e.g., MNH-886, IUB-13)", "Avoid late sowing which increases whitefly vector pressure", "Eradicate volunteer cotton plants and weed hosts around the field"],
      hi: ["जहाँ उपलब्ध हो CLCuV सहनशील किस्में लगाएं (जैसे MNH-886, IUB-13)", "देर से बुवाई से बचें जिससे सफेद मक्खी का दबाव बढ़ता है", "खेत के आसपास स्व-उगे कपास पौधों और खरपतवार मेजबानों को नष्ट करें"],
      ta: ["கிடைக்கும் இடத்தில் CLCuV தாங்கும் ரகங்களை நடவு செய்யவும்", "வெள்ளை ஈ அழுத்தத்தை அதிகரிக்கும் தாமதமான விதைப்பை தவிர்க்கவும்", "வயல் சுற்றியுள்ள தன்னிச்சை பருத்தி செடிகள் மற்றும் களை தாவரங்களை அழிக்கவும்"],
      gu: ["જ્યાં ઉપલબ્ધ હોય ત્યાં CLCuV-સહનશીલ જાતો વાવો (દા.ત., MNH-886, IUB-13)", "મોડી વાવણી ટાળો જેનાથી સફેદ માખીઓનું દબાણ વધે છે", "ખેતરની આસપાસ આપમેળે ઉગેલા કપાસના છોડ અને નીંદણનો નાશ કરો"]
    },
    affectedStage: "Seedling to boll development",
    spreadRisk: "high",
    colorCode: "#7E57C2"
  },
  {
    id: "herbicide_growth_damage",
    name: {
      en: "Herbicide Growth Damage",
      hi: "खरपतवारनाशक वृद्धि क्षति",
      ta: "களைக்கொல்லி வளர்ச்சி சேதம்",
      gu: "નીંદણનાશક વૃદ્ધિ નુકસાન"
    },
    severity: "medium",
    symptoms: {
      en: ["Distorted, cupped, or strap-shaped leaves (especially from auxin-type herbicides)", "Necrotic leaf edges or interveinal chlorosis depending on herbicide class", "Stunted growth, twisted stems, and malformed bolls in severe cases"],
      hi: ["विकृत, कप जैसी या पट्टी के आकार की पत्तियां (विशेषकर ऑक्सिन-प्रकार के खरपतवारनाशकों से)", "खरपतवारनाशक के प्रकार के अनुसार पत्तियों के किनारों का मरना या शिराओं के बीच पीलापन", "गंभीर मामलों में विकास रुकना, तना मुड़ना और बीजकोष का विकृत होना"],
      ta: ["ஆக்சின் வகை களைக்கொல்லியால் திரிந்த, கோப்பை வடிவ அல்லது பட்டை வடிவ இலைகள்", "களைக்கொல்லியின் வகையைப் பொறுத்து இலை விளிம்புகள் அழுகல் அல்லது நரம்புகளுக்கு இடையே மஞ்சளாதல்", "கடுமையான பாதிப்பில் வளர்ச்சி நின்று தண்டு சுழலும், காய்கள் சிதைவடையும்"],
      gu: ["વિકૃત, કપ આકારના અથવા પટ્ટી આકારના પાંદડા (ખાસ કરીને ઓક્સિન-પ્રકારના નીંદણનાશકોથી)", "નીંદણનાશકના પ્રકાર પર આધાર રાખીને પાંદડાની કિનારીઓ સુકાઈ જાય છે અથવા નસો વચ્ચે પીળાશ આવે છે", "ગંભીર કિસ્સાઓમાં વિકાસ અટકે છે, પ્રકાંડ વાંકા વળે છે અને ઝીંડવા વિકૃત થાય છે"]
    },
    causes: {
      en: "Caused by accidental exposure to herbicides such as 2,4-D, glyphosate, or metolachlor, either by drift from neighboring fields, improper application, or use of contaminated sprayers. Cotton is particularly sensitive to auxin-type herbicides.",
      hi: "पड़ोसी खेतों से बहाव, गलत प्रयोग या दूषित स्प्रेयर के उपयोग से 2,4-D, ग्लाइफोसेट या मेटोलाक्लोर जैसे खरपतवारनाशकों के संपर्क में आने से होता है। कपास ऑक्सिन-प्रकार के खरपतवारनाशकों के प्रति विशेष रूप से संवेदनशील है।",
      ta: "2,4-D, கிளைபோசேட் அல்லது மெட்டோலாக்ளோர் போன்ற களைக்கொல்லிகள் அருகிலுள்ள வயல்களில் இருந்து காற்றில் பரவுவதால் அல்லது தவறான தெளிப்பால் ஏற்படுகிறது. பருத்தி ஆக்சின் வகை களைக்கொல்லிகளுக்கு மிகவும் உணர்திறன் உடையது.",
      gu: "પડોશી ખેતરોમાંથી પવનમાં ઉડીને, અયોગ્ય છંટકાવથી અથવા દૂષિત સ્પ્રેયરના ઉપયોગથી 2,4-D, ગ્લાયફોસેટ અથવા મેટોલાકલોર જેવા નીંદણનાશકોના આકસ્મિક સંપર્કથી થાય છે. કપાસ ઓક્સિન-પ્રકારના નીંદણનાશકો પ્રત્યે વિશેષ સંવેદનશીલ છે."
    },
    organicTreatment: {
      en: ["Irrigate immediately to dilute the herbicide in the soil", "Apply activated charcoal to the soil to adsorb the herbicide", "Spray 1% urea solution as a foliar nutrient boost to aid plant recovery"],
      hi: ["मिट्टी में खरपतवारनाशक को पतला करने के लिए तुरंत सिंचाई करें", "खरपतवारनाशक को अवशोषित करने के लिए मिट्टी में सक्रिय चारकोल डालें", "पौधे की रिकवरी में मदद के लिए 1% यूरिया घोल का पत्तेदार छिड़काव करें"],
      ta: ["மண்ணில் களைக்கொல்லியை நீர்க்கச் செய்ய உடனடியாக நீர்ப்பாசனம் செய்யவும்", "களைக்கொல்லியை உறிஞ்சுவதற்கு மண்ணில் செயல்படுத்தப்பட்ட கரியை இடவும்", "செடி மீட்சிக்கு 1% யூரியா கரைசலை இலைகளில் தெளிக்கவும்"],
      gu: ["જમીનમાં નીંદણનાશકની અસર ઘટાડવા માટે તરત જ પિયત આપો", "નીંદણનાશકને શોષવા માટે જમીનમાં સક્રિય ચારકોલ (એક્ટિવેટેડ ચારકોલ) ઉમેરો", "છોડને પાછા રૂઝવામાં મદદ કરવા માટે 1% યુરિયાના દ્રાવણનો પાંદડા પર છંટકાવ કરો"]
    },
    chemicalTreatment: {
      en: ["No direct chemical cure is available; focus is on recovery support", "Spray Brassinolide 0.1ml/liter (plant growth regulator) to aid recovery in mild cases", "Apply balanced NPK foliar spray to reduce stress and promote new growth"],
      hi: ["कोई सीधा रासायनिक इलाज नहीं है; ध्यान रिकवरी समर्थन पर है", "हल्के मामलों में रिकवरी के लिए ब्रेसिनोलाइड 0.1 मिली/लीटर (पादप वृद्धि नियामक) का छिड़काव", "तनाव कम करने और नई वृद्धि को बढ़ावा देने के लिए संतुलित NPK पत्तेदार छिड़काव"],
      ta: ["நேரடி இரசாயன சிகிச்சை எதுவும் இல்லை; மீட்சி ஆதரவில் கவனம் செலுத்தவும்", "லேசான பாதிப்பில் மீட்சிக்கு பிராசினோலைட் (0.1 மிலி/லி) தெளிக்கவும்", "மன அழுத்தத்தை குறைக்கவும் புதிய வளர்ச்சியை ஊக்குவிக்கவும் NPK இலை தெளிப்பை இடவும்"],
      gu: ["કોઈ સીધો રાસાયણિક ઈલાજ ઉપલબ્ધ નથી; છોડને સાજા કરવામાં મદદ કરવા પર ધ્યાન આપો", "હળવા કિસ્સાઓમાં છોડને રિકવર કરવામાં મદદ માટે બ્રાસિનોલાઈડ 0.1 મિ.લિ./લિટર નો છંટકાવ કરો", "તાણ ઘટાડવા અને નવી વૃદ્ધિને પ્રોત્સાહન આપવા માટે સંતુલિત NPK નો છંટકાવ કરો"]
    },
    prevention: {
      en: ["Clean sprayers thoroughly with water and soap before use on cotton", "Avoid spraying herbicides on neighboring crops when wind blows towards cotton fields", "Do not use 2,4-D or glyphosate near cotton; switch to cotton-safe herbicides like pendimethalin"],
      hi: ["कपास पर उपयोग से पहले स्प्रेयर को पानी और साबुन से अच्छी तरह साफ करें", "जब हवा कपास के खेत की ओर बह रही हो तो पड़ोसी फसलों पर खरपतवारनाशक का छिड़काव न करें", "कपास के पास 2,4-D या ग्लाइफोसेट का उपयोग न करें; पेंडिमेथालिन जैसे कपास-सुरक्षित खरपतवारनाशकों पर स्विच करें"],
      ta: ["பருத்தியில் பயன்படுத்துவதற்கு முன் தெளிப்பான்களை நீர் மற்றும் சோப்பில் நன்றாக கழுவுங்கள்", "காற்று பருத்தி வயல் பக்கம் வீசும்போது அருகில் உள்ள பயிர்களில் களைக்கொல்லி தெளிக்காதீர்கள்", "பருத்தி அருகில் 2,4-D அல்லது கிளைபோசேட் பயன்படுத்தாதீர்கள்; பெண்டிமெத்தாலின் போன்ற பருத்திக்கு பாதுகாப்பான களைக்கொல்லிகளை பயன்படுத்துங்கள்"],
      gu: ["કપાસ પર વાપરતા પહેલા સ્પ્રેયરને પાણી અને સાબુથી બરાબર સાફ કરો", "જ્યારે પવન કપાસના ખેતર તરફ હોય ત્યારે પડોશી પાક પર નીંદણનાશકનો છંટકાવ ટાળો", "કપાસની નજીક 2,4-D અથવા ગ્લાયફોસેટનો ઉપયોગ કરશો નહીં; પેન્ડીમેથાલીન જેવા કપાસ-સલામત નીંદણનાશકો વાપરો"]
    },
    affectedStage: "Any stage depending on exposure timing",
    spreadRisk: "low",
    colorCode: "#5D4037"
  },
  {
    id: "leaf_hopper_jassids",
    name: {
      en: "Leaf Hopper (Jassids)",
      hi: "पत्ती फुदका (जैसिड)",
      ta: "இலை தாவர பூச்சி (ஜாசிட்)",
      gu: "તડતડીયા (જેસીડ્સ)"
    },
    severity: "high",
    symptoms: {
      en: ["Leaf margins curl downward and turn yellow (called 'hopper burn')", "Triangular yellowing starting from leaf tip and margins", "Severe infestation causes entire leaves to turn reddish-brown and dry up", "Stunted plant growth with reduced boll setting"],
      hi: ["पत्तियों के किनारे नीचे की ओर मुड़कर पीले हो जाते हैं ('हॉपर बर्न')", "पत्ती की नोक और किनारों से त्रिकोणीय पीलापन शुरू होता है", "गंभीर संक्रमण में पत्तियां लाल-भूरी होकर सूख जाती हैं", "पौधे का विकास रुकता है और बीजकोष कम बनते हैं"],
      ta: ["இலை விளிம்புகள் கீழ்நோக்கி சுருண்டு மஞ்சளாகும் ('ஹாப்பர் பர்ன்')", "இலையின் நுனி மற்றும் விளிம்புகளில் இருந்து முக்கோண மஞ்சளாதல் தொடங்கும்", "கடுமையான பூச்சி தாக்குதலில் இலைகள் சிவப்பு-பழுப்பாகி உலர்ந்து விடும்", "செடி வளர்ச்சி குன்றி காய்பிடிப்பு குறையும்"],
      gu: ["પાંદડાની કિનારીઓ નીચે તરફ વળે છે અને પીળી પડે છે ('હોપર બર્ન')", "પાંદડાની ટોચ અને કિનારીઓથી શરૂ થતી ત્રિકોણાકાર પીળાશ", "ગંભીર ચેપને કારણે આખા પાંદડા લાલ-ભૂરા થઈને સુકાઈ જાય છે", "છોડનો વિકાસ અટકે છે અને ઝીંડવા ઓછા બેસે છે"]
    },
    causes: {
      en: "Caused by the sucking pest Amrasca biguttula biguttula (cotton jassid). Nymphs and adults feed on the underside of leaves, injecting toxic saliva that disrupts phloem sap flow. Hot, dry weather with temperatures around 35-40°C promotes rapid multiplication.",
      hi: "चूसक कीट अम्राशका बिगुट्टुला बिगुट्टुला (कॉटन जैसिड) के कारण। निम्फ और वयस्क पत्तियों की निचली सतह पर भोजन करते हैं, जहरीली लार इंजेक्ट करते हैं जो फ्लोएम रस प्रवाह को बाधित करती है। गर्म और शुष्क मौसम में इनकी संख्या तेजी से बढ़ती है।",
      ta: "அம்ராஸ்கா பிகுட்டுலா பிகுட்டுலா என்ற உறிஞ்சும் பூச்சியால் ஏற்படுகிறது. இளம் பூச்சிகள் மற்றும் வயது வந்தவை இலையின் அடிப்புறத்தில் உண்டு நச்சு உமிழ்நீரை செலுத்துகின்றன. 35-40°C வெப்பம் மற்றும் வறண்ட வானிலை இவற்றின் பெருக்கத்திற்கு சாதகமானது.",
      gu: "ચૂસિયા પ્રકારની જીવાત અમ્રાસ્કા બિગટ્ટુલા બિગટ્ટુલા (કપાસના જેસીડ) દ્વારા થાય છે. બચ્ચાં અને પુખ્ત જીવાત પાંદડાની નીચેની સપાટી પરથી રસ ચૂસે છે અને ઝેરી લાળ છોડે છે. 35-40°C આસપાસના તાપમાન સાથે ગરમ અને સૂકું હવામાન તેમના ઝડપી ગુણાકારને ઉત્તેજન આપે છે."
    },
    organicTreatment: {
      en: ["Spray Neem oil 5% solution or NSKE (Neem Seed Kernel Extract) 5% as repellent", "Dust sulphur powder on the undersides of leaves to deter nymphs", "Introduce natural predators like Chrysoperla carnea (green lacewing)"],
      hi: ["निरोधक के रूप में नीम तेल 5% घोल या NSKE (नीम बीज कर्नल अर्क) 5% का छिड़काव", "निम्फ को रोकने के लिए पत्तियों की निचली सतह पर सल्फर पाउडर छिड़कें", "क्राइसोपर्ला कार्निया (ग्रीन लेसविंग) जैसे प्राकृतिक शिकारियों को शामिल करें"],
      ta: ["இலைப்பூச்சிகளை விரட்ட வேப்ப எண்ணெய் 5% அல்லது NSKE 5% தெளிக்கவும்", "இளம் பூச்சிகளை தடுக்க இலையின் அடிப்பகுதியில் கந்தகத் தூள் தூவுங்கள்", "கிரைசோபெர்லா கார்னியா போன்ற இயற்கை எதிரிகளை அறிமுகப்படுத்தவும்"],
      gu: ["જીવાતને દૂર રાખવા માટે 5% લીમડાના તેલના દ્રાવણ અથવા 5% લીંબોળીના અર્કનો છંટકાવ કરો", "બચ્ચાંને રોકવા માટે પાંદડાની નીચે ગંધકનો પાવડર છાંટો", "ક્રાયસોપર્લા કાર્નિયા (લીલી લેસવિંગ) જેવા કુદરતી શિકારી કીટકોનો ઉછેર કરો"]
    },
    chemicalTreatment: {
      en: ["Spray Imidacloprid 17.8% SL @ 0.3ml/liter at first sign of infestation", "Apply Thiamethoxam 25% WG @ 0.3g/liter as a systemic alternative", "Spray Dimethoate 30% EC @ 2ml/liter if populations exceed Economic Threshold Level"],
      hi: ["संक्रमण के पहले लक्षण पर इमिडाक्लोप्रिड 17.8% SL (0.3 मिली/लीटर) का छिड़काव", "प्रणालीगत विकल्प के रूप में थियामेथोक्साम 25% WG (0.3 ग्राम/लीटर) डालें", "यदि जनसंख्या आर्थिक दहलीज स्तर से अधिक हो तो डाइमेथोएट 30% EC (2 मिली/लीटर) का छिड़काव"],
      ta: ["தாக்குதலின் முதல் அறிகுறியில் இமிடாக்ளோப்ரிட் 17.8% SL (0.3 மிலி/லி) தெளிக்கவும்", "உட்கொள்ளும் மாற்றாக தியாமெத்தோக்சம் 25% WG (0.3 கி/லி) பயன்படுத்தவும்", "எண்ணிக்கை பொருளாதார வரம்பை மீறினால் டைமெத்தோயேட் 30% EC (2 மிலி/லி) தெளிக்கவும்"],
      gu: ["જીવાતનો પહેલો સંકેત દેખાય ત્યારે ઇમિડાક્લોપ્રિડ 17.8% SL 0.3 મિ.લિ./લિટર છાંટો", "પ્રણાલીગત વિકલ્પ તરીકે થિયામેથોક્ઝામ 25% WG 0.3 ગ્રામ/લિટર વાપરો", "જો જીવાતની સંખ્યા આર્થિક નુકસાનની સપાટી વટાવી જાય તો ડાયમેથોએટ 30% EC 2 મિ.લિ./લિટર છાંટો"]
    },
    prevention: {
      en: ["Sow cotton on time; avoid delayed sowing which increases jassid pressure", "Select hairy-leaf varieties which are less preferred by jassids (e.g., MCU 5)", "Maintain field hygiene by removing weed hosts and crop debris"],
      hi: ["कपास को समय पर बोएं; देर से बुवाई से जैसिड का दबाव बढ़ता है", "बालदार पत्ती वाली किस्में चुनें जो जैसिड को कम पसंद होती हैं (जैसे MCU 5)", "खरपतवार और फसल अवशेषों को हटाकर खेत की स्वच्छता बनाए रखें"],
      ta: ["பருத்தியை சரியான நேரத்தில் விதைக்கவும்; தாமதமான விதைப்பு ஜாசிட் அழுத்தத்தை அதிகரிக்கும்", "ஜாசிட்கள் விரும்பாத இறகு வகை ரகங்களை தேர்வு செய்யவும்", "களைகள் மற்றும் பயிர் எச்சங்களை அகற்றி வயல் சுகாதாரத்தை பராமரிக்கவும்"],
      gu: ["સમયસર કપાસનું વાવેતર કરો; મોડી વાવણી ટાળો જેનાથી જેસીડનું દબાણ વધે છે", "રૂંવાટીવાળા પાંદડાવાળી જાતો પસંદ કરો જે જેસીડને ઓછી પસંદ આવે છે (દા.ત., MCU 5)", "નીંદણ અને પાકના અવશેષો દૂર કરીને ખેતરમાં સ્વચ્છતા જાળવો"]
    },
    affectedStage: "Seedling to boll maturity",
    spreadRisk: "high",
    colorCode: "#6D4C41"
  },
  {
    id: "leaf_redding",
    name: {
      en: "Leaf Redding",
      hi: "पत्ती लाली (रेडिंग)",
      ta: "இலை சிவப்பு நிறமாதல்",
      gu: "પાંદડા લાલ થવા (રેડિંગ)"
    },
    severity: "low",
    symptoms: {
      en: ["Leaves turn red or purplish-red, starting from older lower leaves", "Reddening may progress upward in severe cases of potassium deficiency", "Affected leaves may eventually dry up and fall prematurely"],
      hi: ["पत्तियां लाल या बैंगनी-लाल हो जाती हैं, शुरुआत पुरानी निचली पत्तियों से होती है", "पोटाश की गंभीर कमी में लाली ऊपर की पत्तियों तक फैल सकती है", "प्रभावित पत्तियां समय से पहले सूख कर गिर सकती हैं"],
      ta: ["இலைகள் சிவப்பு அல்லது ஊதா-சிவப்பு நிறமாகும், பழைய கீழ் இலைகளில் இருந்து தொடங்கும்", "கடுமையான பொட்டாஷ் குறைபாட்டில் சிவத்தல் மேல் இலைகளுக்கு பரவலாம்", "பாதிக்கப்பட்ட இலைகள் முன்கூட்டியே உலர்ந்து உதிரலாம்"],
      gu: ["જૂના નીચેના પાંદડાઓથી શરૂ થઈને, પાંદડા લાલ અથવા જાંબલી-લાલ થઈ જાય છે", "પોટેશિયમની ગંભીર ઉણપ હોય તો લાલાશ ઉપરના પાંદડાઓ સુધી પહોંચી શકે છે", "પ્રભાવિત પાંદડા છેવટે સુકાઈ શકે છે અને અકાળે ખરી શકે છે"]
    },
    causes: {
      en: "Primarily caused by potassium (K) deficiency in the soil, which disrupts sugar transport and leads to anthocyanin pigment accumulation in leaves. Can also be triggered by waterlogging, drought stress, or natural senescence at crop maturity.",
      hi: "मुख्य रूप से मिट्टी में पोटाश (K) की कमी के कारण होता है, जो शर्करा परिवहन को बाधित करता है और पत्तियों में एंथोसायनिन रंगद्रव्य का संचय करता है। जलभराव, सूखे के तनाव या फसल परिपक्वता पर प्राकृतिक उम्र बढ़ने से भी हो सकता है।",
      ta: "முக்கியமாக மண்ணில் பொட்டாஷ் (K) குறைபாட்டால் ஏற்படுகிறது. இது சர்க்கரை கடத்தலை சீர்குலைத்து இலைகளில் ஆந்தோசயனின் நிறமி குவிவதை ஏற்படுத்துகிறது. நீர்தேக்கம், வறட்சி அழுத்தம் அல்லது இயற்கை முதிர்வினாலும் ஏற்படலாம்.",
      gu: "મુખ્યત્વે જમીનમાં પોટેશિયમ (K) ની ઉણપથી થાય છે, જે શર્કરાના પરિવહનમાં વિક્ષેપ પાડે છે અને પાંદડાઓમાં એન્થોસાયનિન રંજકદ્રવ્ય જમા કરે છે. પાણી ભરાવા, દુષ્કાળના તાણ અથવા પાકની પરિપક્વતા સમયે કુદરતી વૃદ્ધત્વ દ્વારા પણ થઈ શકે છે."
    },
    organicTreatment: {
      en: ["Apply wood ash (rich in potassium) around the base of plants", "Use compost or farmyard manure to improve overall soil nutrition", "Mulching helps conserve soil moisture and reduce drought-induced reddening"],
      hi: ["पौधों की जड़ के पास लकड़ी की राख (पोटाश से भरपूर) डालें", "समग्र मिट्टी पोषण सुधारने के लिए खाद या गोबर खाद का उपयोग करें", "मल्चिंग से मिट्टी की नमी बचती है और सूखे के कारण लाली कम होती है"],
      ta: ["செடியின் அடிவேரில் கட்டை சாம்பல் (பொட்டாஷ் நிறைந்தது) இடுங்கள்", "ஒட்டுமொத்த மண் வளத்தை மேம்படுத்த மக்கிய உரம் அல்லது தொழு உரம் பயன்படுத்துங்கள்", "மண் ஈரப்பதத்தை பாதுகாக்கவும் வறட்சியால் ஏற்படும் சிவத்தலை குறைக்கவும் மல்ச்சிங் செய்யவும்"],
      gu: ["છોડના થડની આસપાસ લાકડાની રાખ (પોટેશિયમથી ભરપૂર) નાખો", "એકંદર જમીનનું પોષણ સુધારવા માટે કમ્પોસ્ટ અથવા છાણિયા ખાતરનો ઉપયોગ કરો", "મલ્ચિંગ જમીનનો ભેજ જાળવવામાં અને દુષ્કાળ પ્રેરિત લાલાશ ઘટાડવામાં મદદ કરે છે"]
    },
    chemicalTreatment: {
      en: ["Foliar spray of Potassium Nitrate (KNO3) @ 1% (10g/liter) for quick uptake", "Soil application of Muriate of Potash (MoP) @ 30-40 kg/acre if deficiency is confirmed", "Spray 0.5% Zinc Sulphate solution if combined micronutrient deficiency is observed"],
      hi: ["त्वरित अवशोषण के लिए पोटाशियम नाइट्रेट (KNO3) @ 1% (10 ग्राम/लीटर) का पत्तेदार छिड़काव", "यदि कमी की पुष्टि हो तो म्यूरिएट ऑफ पोटाश (MoP) @ 30-40 किलो/एकड़ मिट्टी में डालें", "संयुक्त सूक्ष्म पोषक तत्व की कमी दिखे तो 0.5% जिंक सल्फेट घोल का छिड़काव"],
      ta: ["விரைவான உறிஞ்சுதலுக்கு பொட்டாசியம் நைட்ரேட் (KNO3) 1% (10 கி/லி) இலைகளில் தெளிக்கவும்", "குறைபாடு உறுதியானால் மியூரியேட் ஆஃப் பொட்டாஷ் (MoP) 30-40 கிலோ/ஏக்கர் மண்ணில் இடவும்", "கலப்பு நுண்ணூட்டக் குறைபாடு தென்பட்டால் 0.5% சிங்க் சல்பேட் தெளிக்கவும்"],
      gu: ["ઝડપી શોષણ માટે પોટેશિયમ નાઈટ્રેટ (KNO3) @ 1% (10 ગ્રામ/લિટર) નો પાંદડા પર છંટકાવ કરો", "જો ઉણપની ખાતરી થાય તો મ્યુરિએટ ઓફ પોટાશ (MoP) 30-40 કિગ્રા/એકર જમીનમાં નાખો", "જો સંયુક્ત સૂક્ષ્મ પોષકતત્ત્વોની ઉણપ જોવા મળે તો 0.5% ઝિંક સલ્ફેટ દ્રાવણ છાંટો"]
    },
    prevention: {
      en: ["Conduct soil testing before sowing and apply recommended potassium fertilizers", "Ensure proper drainage to prevent waterlogging-induced stress", "Avoid excessive nitrogen without matching potassium levels"],
      hi: ["बुवाई से पहले मिट्टी परीक्षण करें और अनुशंसित पोटाश उर्वरक डालें", "जलभराव के कारण होने वाले तनाव को रोकने के लिए उचित जल निकासी सुनिश्चित करें", "पोटाश स्तर से मेल खाए बिना अत्यधिक नाइट्रोजन से बचें"],
      ta: ["விதைப்பதற்கு முன் மண் பரிசோதனை மேற்கொண்டு பரிந்துரைக்கப்பட்ட பொட்டாஷ் உரங்களை இடுங்கள்", "நீர்தேக்கத்தினால் ஏற்படும் அழுத்தத்தை தடுக்க சரியான வடிகால் உறுதி செய்யவும்", "பொட்டாஷ் அளவுகளுடன் பொருந்தாமல் அதிக தழைச்சத்தை தவிர்க்கவும்"],
      gu: ["વાવણી પહેલાં જમીનનું પરીક્ષણ કરો અને ભલામણ મુજબ પોટાશ ખાતર આપો", "પાણી ભરાઈ જવાના કારણે થતા તાણને રોકવા માટે યોગ્ય ડ્રેનેજ સિસ્ટમ સુનિશ્ચિત કરો", "પોટેશિયમના સ્તરને સંતુલિત કર્યા વિના વધુ પડતા નાઈટ્રોજનનો ઉપયોગ ટાળો"]
    },
    affectedStage: "Boll formation to maturity",
    spreadRisk: "low",
    colorCode: "#BF360C"
  },
  {
    id: "leaf_variegation",
    name: {
      en: "Leaf Variegation",
      hi: "पत्ती विविधवर्णता (मोज़ेक)",
      ta: "இலை வண்ண மாற்றம் (மொசைக்)",
      gu: "પર્ણ વિવિધવર્ણતા (મોઝેક)"
    },
    severity: "low",
    symptoms: {
      en: ["Irregular patches of yellow or light green on otherwise dark green leaves (mosaic pattern)", "Mottled or streaked discoloration along leaf veins", "Affected leaves may be slightly distorted but plant growth is often unaffected in mild cases"],
      hi: ["गहरे हरे पत्तों पर पीले या हल्के हरे रंग के अनियमित धब्बे (मोज़ेक पैटर्न)", "पत्ती की नसों के साथ धब्बेदार या धारीदार रंग परिवर्तन", "हल्के मामलों में प्रभावित पत्तियां थोड़ी विकृत हो सकती हैं लेकिन पौधे की वृद्धि अक्सर अप्रभावित रहती है"],
      ta: ["கருப்பு பச்சை இலைகளில் மஞ்சள் அல்லது வெளிர் பச்சை நிற ஒழுங்கற்ற திட்டுகள் (மொசைக் வடிவம்)", "இலை நரம்புகளுக்கு இடையே புள்ளிகளும் கோடுகளும் நிற மாற்றம்", "லேசான பாதிப்பில் இலைகள் சிறிதளவு திரிந்திருந்தாலும் செடி வளர்ச்சி பாதிக்கப்படாமல் இருக்கலாம்"],
      gu: ["ઘેરા લીલા પાંદડા પર પીળા અથવા આછા લીલા રંગના અનિયમિત ડાઘ (મોઝેક પેટર્ન)", "પાંદડાની નસો સાથે ડાઘવાળો અથવા પટ્ટાવાળો રંગ બદલાવો", "પ્રભાવિત પાંદડા સહેજ વિકૃત થઈ શકે છે પરંતુ હળવા કિસ્સાઓમાં છોડની વૃદ્ધિ મોટેભાગે અપ્રભાવિત રહે છે"]
    },
    causes: {
      en: "Can result from viral infection (such as Cotton Mosaic Virus or CLCuV sub-strains), thrips feeding, or micronutrient deficiencies - particularly iron (Fe) or magnesium (Mg). Whitefly and thrips vectors drive viral spread, while compacted or alkaline soils promote nutritional causes.",
      hi: "वायरल संक्रमण (जैसे कॉटन मोज़ेक वायरस या CLCuV उप-उपभेद), थ्रिप्स भक्षण, या सूक्ष्म पोषक तत्वों की कमी - विशेष रूप से आयरन (Fe) या मैग्नीशियम (Mg) के कारण हो सकता है।",
      ta: "வைரஸ் தொற்று (பருத்தி மொசைக் வைரஸ் அல்லது CLCuV துணை வகைகள்), த்ரிப்ஸ் உணவு உண்ணல் அல்லது நுண்ணூட்டக் குறைபாடுகள் - குறிப்பாக இரும்பு (Fe) அல்லது மெக்னீசியம் (Mg) குறைபாட்டினால் ஏற்படலாம்.",
      gu: "વાયરલ ચેપ (જેમ કે કોટન મોઝેક વાયરસ અથવા CLCuV), થ્રીપ્સના નુકસાન, અથવા સૂક્ષ્મ પોષકતત્ત્વોની ઉણપ - ખાસ કરીને આયર્ન (Fe) અથવા મેગ્નેશિયમ (Mg) ને પરિણામે થઈ શકે છે."
    },
    organicTreatment: {
      en: ["Spray 0.5% ferrous sulphate solution if iron deficiency is suspected", "Apply dolomite lime to correct magnesium deficiency in acidic soils", "Use Trichoderma-enriched compost to improve micronutrient availability"],
      hi: ["यदि आयरन की कमी का संदेह हो तो 0.5% फेरस सल्फेट घोल का छिड़काव", "अम्लीय मिट्टी में मैग्नीशियम की कमी को ठीक करने के लिए डोलोमाइट चूना डालें", "सूक्ष्म पोषक तत्वों की उपलब्धता सुधारने के लिए ट्राइकोडर्मा-समृद्ध खाद का उपयोग करें"],
      ta: ["இரும்பு குறைபாடு சந்தேகிக்கப்பட்டால் 0.5% ஃபெரஸ் சல்பேட் கரைசல் தெளிக்கவும்", "அமிலக் மண்ணில் மெக்னீசியம் குறைபாட்டை சரிசெய்ய டோலோமைட் சுண்ணாம்பு இடுங்கள்", "நுண்ணூட்டச்சத்து கிடைக்கும் தன்மையை மேம்படுத்த ட்ரைக்கோடெர்மா செறிவூட்டப்பட்ட உரம் பயன்படுத்தவும்"],
      gu: ["જો આયર્નની ઉણપની શંકા હોય તો 0.5% ફેરસ સલ્ફેટ દ્રાવણનો છંટકાવ કરો", "એસિડિક જમીનમાં મેગ્નેશિયમની ઉણપ સુધારવા માટે ડોલોમાઇટ ચૂનો ઉમેરો", "સૂક્ષ્મ પોષકતત્ત્વોની ઉપલબ્ધતા સુધારવા માટે ટ્રાઇકોડર્મા-સમૃદ્ધ ખાતરનો ઉપયોગ કરો"]
    },
    chemicalTreatment: {
      en: ["Spray chelated micronutrient mixture (Fe, Zn, Mn, Mg) @ 2ml/liter to correct combined deficiencies", "Control vector insects (whitefly, thrips) with Spinosad 45 SC @ 0.3ml/liter if virus is suspected", "Seed treatment with Imidacloprid to reduce early vector colonization"],
      hi: ["संयुक्त कमियों को ठीक करने के लिए चेलेटेड सूक्ष्म पोषक मिश्रण (Fe, Zn, Mn, Mg) @ 2 मिली/लीटर का छिड़काव", "यदि वायरस संदिग्ध हो तो वाहक कीटों (सफेद मक्खी, थ्रिप्स) को स्पिनोसेड 45 SC (0.3 मिली/लीटर) से नियंत्रित करें", "शुरुआती वाहक उपनिवेशीकरण को कम करने के लिए इमिडाक्लोप्रिड से बीज उपचार"],
      ta: ["கலப்பு குறைபாடுகளை சரிசெய்ய கீலேட் நுண்ணூட்ட கலவை (Fe, Zn, Mn, Mg) 2 மிலி/லி தெளிக்கவும்", "வைரஸ் சந்தேகிக்கப்பட்டால் ஸ்பினோசேட் 45 SC (0.3 மிலி/லி) கொண்டு வெக்டர் பூச்சிகளை கட்டுப்படுத்தவும்", "ஆரம்பகால வெக்டர் குடியேற்றத்தை குறைக்க இமிடாக்ளோப்ரிட் கொண்டு விதை நேர்த்தி செய்யவும்"],
      gu: ["સંયુક્ત ઉણપને સુધારવા માટે ચેલેટેડ માઇક્રોન્યુટ્રિઅન્ટ મિશ્રણ (Fe, Zn, Mn, Mg) @ 2 મિ.લિ./લિટર છાંટો", "જો વાયરસની શંકા હોય તો સ્પિનોસેડ 45 SC @ 0.3 મિ.લિ./લિટરથી વાહક જંતુઓ (સફેદ માખી, થ્રીપ્સ) ને નિયંત્રિત કરો", "શરૂઆતના વાહક જીવાતોને ઘટાડવા ઇમિડાક્લોપ્રિડથી બીજ માવજત કરો"]
    },
    prevention: {
      en: ["Conduct regular soil and leaf tissue tests to detect micronutrient imbalances early", "Control whitefly and thrips populations from seedling stage", "Remove heavily variegated plants early to prevent virus spread if infection is confirmed"],
      hi: ["सूक्ष्म पोषक तत्वों के असंतुलन का जल्दी पता लगाने के लिए नियमित मिट्टी और पत्ती ऊतक परीक्षण करें", "पौध अवस्था से सफेद मक्खी और थ्रिप्स की आबादी को नियंत्रित करें", "यदि संक्रमण की पुष्टि हो तो वायरस के प्रसार को रोकने के लिए अत्यधिक विविधवर्णी पौधों को जल्दी हटाएं"],
      ta: ["நுண்ணூட்டச்சத்து ஏற்றத்தாழ்வுகளை ஆரம்பத்திலேயே கண்டறிய தொடர் மண் மற்றும் இலை திசு பரிசோதனைகள் செய்யவும்", "நாற்று பருவம் முதலே வெள்ளை ஈ மற்றும் த்ரிப்ஸ் எண்ணிக்கையை கட்டுப்படுத்தவும்", "வைரஸ் தொற்று உறுதியானால் பரவலை தடுக்க அதிக நிற மாற்றமுள்ள செடிகளை ஆரம்பத்திலேயே அகற்றவும்"],
      gu: ["સૂક્ષ્મ પોષકતત્ત્વોના અસંતુલનને વહેલા ઓળખવા માટે નિયમિત જમીન અને પાંદડાની પેશી પરીક્ષણ કરો", "રોપ અવસ્થાથી જ સફેદ માખી અને થ્રીપ્સની વસ્તીને નિયંત્રિત કરો", "જો ચેપની પુષ્ટિ થાય તો વાયરસનો ફેલાવો રોકવા માટે અત્યંત પ્રભાવિત છોડને વહેલા દૂર કરો"]
    },
    affectedStage: "Seedling to vegetative growth",
    spreadRisk: "low",
    colorCode: "#00897B"
  },
  {
    // Potato diseases
    id: "early_blight",
    name: {
      en: "Early Blight",
      hi: "अगेती झुलसा रोग",
      ta: "ஆரம்ப கருகல் நோய்",
      gu: "આગોતરો સુકારો (અર્લી બ્લાઇટ)"
    },
    severity: "medium",
    symptoms: {
      en: ["Dark brown circular spots with concentric rings forming a 'target board' pattern on older leaves", "Yellowing around the lesions (chlorotic halo)", "Infected leaves dry up and fall prematurely, causing defoliation from the bottom upward"],
      hi: ["पुरानी पत्तियों पर केंद्रित वलय के साथ गहरे भूरे गोलाकार धब्बे ('टारगेट बोर्ड' पैटर्न)", "घावों के चारों ओर पीलापन (क्लोरोटिक हेलो)", "संक्रमित पत्तियां सूखकर जल्दी गिर जाती हैं, नीचे से ऊपर की ओर पत्ती झड़ती है"],
      ta: ["பழைய இலைகளில் குவிய வளையங்களுடன் அடர் பழுப்பு நிற வட்ட வடிவ புள்ளிகள் ('இலக்கு பலகை' வடிவம்)", "காயங்களைச் சுற்றி மஞ்சளாதல் (குளோரோடிக் ஹேலோ)", "பாதிக்கப்பட்ட இலைகள் முன்கூட்டியே உலர்ந்து உதிரும், கீழிருந்து மேலாக இலை உதிர்வு நிகழும்"],
      gu: ["જૂના પાંદડાઓ પર 'ટાર્ગેટ બોર્ડ' પેટર્ન બનાવતા કેન્દ્રિત વલયો સાથે ઘેરા ભૂરા રંગના ગોળાકાર ડાઘ", "ઘાની આસપાસ પીળાશ (ક્લોરોટિક હાલો)", "ચેપગ્રસ્ત પાંદડા સુકાઈ જાય છે અને અકાળે ખરી પડે છે, જેનાથી નીચેથી ઉપર તરફ પાંદડા ખરે છે"]
    },
    causes: {
      en: "Caused by the fungus Alternaria solani. Favored by warm days (24-29°C), cool nights, and alternating wet and dry periods. Spread occurs through infected plant debris and wind-dispersed spores. Nutrient-stressed or older plants are most susceptible.",
      hi: "ऑल्टरनेरिया सोलानी फफूंद के कारण। गर्म दिन (24-29°C), ठंडी रातें और गीले-सूखे मौसम के बदलाव से बढ़ता है। संक्रमित पौधे के अवशेषों और हवा से फैलने वाले बीजाणुओं से फैलता है।",
      ta: "ஆல்டர்னேரியா சோலானி என்ற பூஞ்சையால் ஏற்படுகிறது. வெப்பமான பகல் (24-29°C), குளிர்ந்த இரவு மற்றும் ஈரம்-வறட்சி மாற்றங்கள் இதற்கு சாதகமானது. பாதிக்கப்பட்ட பயிர் எச்சங்கள் மற்றும் காற்றில் பரவும் வித்துக்கள் மூலம் பரவுகிறது.",
      gu: "ઓલ્ટરનેરિયા સોલાની ફૂગના કારણે થાય છે. ગરમ દિવસો (24-29°C), ઠંડી રાતો અને વારાફરતી ભીના અને સૂકા સમયગાળાથી તેને અનુકૂળતા મળે છે. ચેપગ્રસ્ત છોડના અવશેષો અને પવનથી ફેલાતા બીજકણો દ્વારા ફેલાય છે."
    },
    organicTreatment: {
      en: ["Spray Copper Oxychloride (3g/liter) at first sign of disease", "Apply Neem oil extract (5ml/liter) as a preventive foliar spray", "Remove and destroy infected lower leaves to slow spread"],
      hi: ["रोग के पहले लक्षण पर कॉपर ऑक्सीक्लोराइड (3 ग्राम/लीटर) का छिड़काव करें", "निवारक पत्तेदार छिड़काव के रूप में नीम तेल अर्क (5 मिली/लीटर) का प्रयोग करें", "प्रसार को धीमा करने के लिए संक्रमित निचली पत्तियों को हटाएं और नष्ट करें"],
      ta: ["நோயின் முதல் அறிகுறியில் காப்பர் ஆக்சிக்குளோரைடு (3 கி/லி) தெளிக்கவும்", "தடுப்பு இலைத் தெளிப்பாக வேப்ப எண்ணெய் (5 மிலி/லி) பயன்படுத்தவும்", "பரவலை மெதுவாக்க பாதிக்கப்பட்ட கீழ் இலைகளை அகற்றி அழிக்கவும்"],
      gu: ["રોગના પ્રથમ સંકેત પર કોપર ઓક્સીક્લોરાઇડ (3 ગ્રામ/લિટર) નો છંટકાવ કરો", "નિવારક છંટકાવ તરીકે લીમડાના તેલના અર્ક (5 મિ.લિ./લિટર) નો ઉપયોગ કરો", "રોગનો ફેલાવો ધીમો કરવા માટે ચેપગ્રસ્ત નીચેના પાંદડા કાઢીને નાશ કરો"]
    },
    chemicalTreatment: {
      en: ["Spray Mancozeb 75% WP @ 2g/liter at 7-10 day intervals", "Apply Azoxystrobin 23% SC @ 1ml/liter for systemic control", "Use Chlorothalonil 75% WP @ 2g/liter as a contact fungicide"],
      hi: ["7-10 दिन के अंतराल पर मैनकोजेब 75% WP (2 ग्राम/लीटर) का छिड़काव करें", "प्रणालीगत नियंत्रण के लिए एजोक्सीस्ट्रोबिन 23% SC (1 मिली/लीटर) का प्रयोग करें", "संपर्क कवकनाशी के रूप में क्लोरोथालोनिल 75% WP (2 ग्राम/लीटर) का उपयोग करें"],
      ta: ["7-10 நாள் இடைவெளியில் மேன்கோசெப் 75% WP (2 கி/லி) தெளிக்கவும்", "அமைப்பு கட்டுப்பாட்டிற்கு அசோக்ஸிஸ்ட்ரோபின் 23% SC (1 மிலி/லி) பயன்படுத்தவும்", "தொடர்பு பூஞ்சாள கொல்லியாக குளோரோதலோனில் 75% WP (2 கி/லி) பயன்படுத்தவும்"],
      gu: ["7-10 દિવસના અંતરે મેન્કોઝેબ 75% WP @ 2 ગ્રામ/લિટર છાંટો", "પ્રણાલીગત નિયંત્રણ માટે એઝોક્સીસ્ટ્રોબિન 23% SC @ 1 મિ.લિ./લિટર વાપરો", "સંપર્ક ફૂગનાશક તરીકે ક્લોરોથાલોનીલ 75% WP @ 2 ગ્રામ/લિટરનો ઉપયોગ કરો"]
    },
    prevention: {
      en: ["Use certified disease-free seed tubers", "Practice crop rotation with non-solanaceous crops for at least 2-3 years", "Ensure balanced NPK fertilization; avoid nitrogen excess which increases susceptibility"],
      hi: ["प्रमाणित रोग मुक्त बीज कंदों का उपयोग करें", "कम से कम 2-3 साल के लिए गैर-सोलेनेसियस फसलों के साथ फसल चक्र अपनाएं", "संतुलित NPK उर्वरण सुनिश्चित करें; नाइट्रोजन की अधिकता से बचें जो संवेदनशीलता बढ़ाती है"],
      ta: ["சான்றளிக்கப்பட்ட நோய் இல்லாத விதை கிழங்குகளை பயன்படுத்தவும்", "குறைந்தது 2-3 ஆண்டுகளுக்கு சோலனேசியஸ் அல்லாத பயிர்களுடன் பயிர் சுழற்சி செய்யவும்", "சமச்சீர் NPK உரமிடுதலை உறுதி செய்யவும்; உணர்திறனை அதிகரிக்கும் தழைச்சத்து அதிகப்படிவை தவிர்க்கவும்"],
      gu: ["પ્રમાણિત રોગમુક્ત બીજ બટાકા (કંદ) નો ઉપયોગ કરો", "ઓછામાં ઓછા 2-3 વર્ષ સુધી સોલાનેસીયસ ન હોય તેવા પાકો સાથે પાક ફેરબદલી કરો", "સંતુલિત NPK ખાતર સુનિશ્ચિત કરો; વધુ પડતો નાઇટ્રોજન ટાળો જે રોગ પ્રત્યે સંવેદનશીલતા વધારે છે"]
    },
    affectedStage: "Vegetative to tuber bulking",
    spreadRisk: "medium",
    colorCode: "#D97706"
  },
  {
    id: "late_blight",
    name: {
      en: "Late Blight",
      hi: "पिछेती झुलसा रोग",
      ta: "தாமத கருகல் நோய்",
      gu: "પાછોતરો સુકારો (લેટ બ્લાઇટ)"
    },
    severity: "high",
    symptoms: {
      en: ["Water-soaked pale green to brown lesions on leaves that expand rapidly", "White cottony sporulation visible on the underside of leaves in humid conditions", "Dark brown to black lesions on stems; infected tubers show reddish-brown rot under the skin"],
      hi: ["पत्तियों पर पानी से भीगे हरे से भूरे धब्बे जो तेजी से फैलते हैं", "नमी की स्थिति में पत्तियों की निचली सतह पर सफेद रोएंदार फफूंद", "तनों पर गहरे भूरे से काले घाव; संक्रमित कंद की त्वचा के नीचे लाल-भूरा सड़ना"],
      ta: ["இலைகளில் நீர் கோர்த்த வெளிர் பச்சை முதல் பழுப்பு நிற காயங்கள் விரைவாக பரவும்", "ஈரமான நிலையில் இலையின் அடிப்புறத்தில் வெள்ளை பஞ்சு போன்ற வித்து உற்பத்தி தெரியும்", "தண்டுகளில் அடர் பழுப்பு முதல் கருப்பு காயங்கள்; பாதிக்கப்பட்ட கிழங்கின் தோலுக்கு அடியில் சிவப்பு-பழுப்பு அழுகல்"],
      gu: ["પાંદડા પર પાણીથી ભીંજાયેલા આછા લીલાથી ભૂરા રંગના ડાઘ જે ઝડપથી ફેલાય છે", "ભેજવાળા વાતાવરણમાં પાંદડાની નીચેની બાજુએ સફેદ રૂ જેવી ફૂગ જોવા મળે છે", "પ્રકાંડ પર ઘેરા ભૂરાથી કાળા રંગના ડાઘ; ચેપગ્રસ્ત બટાકાની છાલ નીચે લાલ-ભૂરા રંગનો સડો જોવા મળે છે"]
    },
    causes: {
      en: "Caused by the water mold Phytophthora infestans. Thrives in cool (10-20°C), wet weather with high humidity above 90%. Spreads explosively via wind-dispersed sporangia and can destroy an entire field within days under favorable conditions.",
      hi: "जल फफूंद फाइटोफ्थोरा इन्फेस्टेन्स के कारण। ठंडे (10-20°C), गीले मौसम और 90% से अधिक आर्द्रता में पनपता है। हवा द्वारा फैलने वाले स्पोरंगिया से विस्फोटक रूप से फैलता है और अनुकूल परिस्थितियों में पूरे खेत को कुछ ही दिनों में नष्ट कर सकता है।",
      ta: "ஃபைட்டோப்த்தோரா இன்ஃபெஸ்டான்ஸ் என்ற நீர் பூஞ்சையால் ஏற்படுகிறது. குளிர்ந்த (10-20°C), ஈரமான வானிலை மற்றும் 90% க்கும் அதிகமான ஈரப்பதத்தில் செழிக்கிறது. காற்றில் பரவும் ஸ்போரங்கியா மூலம் வேகமாக பரவி, சாதகமான நிலையில் சில நாட்களில் முழு வயலையும் அழிக்கும்.",
      gu: "ફાઇટોફથોરા ઇન્ફેસ્ટન્સ (Phytophthora infestans) નામની જળ ફૂગથી થાય છે. 90% થી વધુ ભેજવાળા ઠંડા (10-20°C), ભીના હવામાનમાં ખીલે છે. પવન દ્વારા ફેલાતા સ્પોર્સ દ્વારા વિસ્ફોટક રીતે ફેલાય છે અને સાનુકૂળ સ્થિતિમાં થોડા જ દિવસોમાં આખું ખેતર નષ્ટ કરી શકે છે."
    },
    organicTreatment: {
      en: ["Spray Copper-based fungicides (Copper Hydroxide or Bordeaux mixture 1%) preventively before disease onset", "Remove and destroy infected plant tissue immediately; do not compost", "Improve air circulation by avoiding dense planting"],
      hi: ["रोग शुरू होने से पहले कॉपर आधारित कवकनाशी (कॉपर हाइड्रोक्साइड या बोर्डो मिश्रण 1%) का निवारक छिड़काव करें", "संक्रमित पौधे के ऊतकों को तुरंत हटाएं और नष्ट करें; खाद न बनाएं", "घनी रोपाई से बचकर वायु संचार में सुधार करें"],
      ta: ["நோய் தொடங்குவதற்கு முன்பே தாமிர அடிப்படையிலான பூஞ்சாள கொல்லிகளை (காப்பர் ஹைட்ராக்சைடு அல்லது போர்டோ கலவை 1%) தடுப்பு நடவடிக்கையாக தெளிக்கவும்", "பாதிக்கப்பட்ட பயிர் திசுக்களை உடனடியாக அகற்றி அழிக்கவும்; உரமாக்காதீர்கள்", "நெருக்கமான நடவை தவிர்த்து காற்று ஓட்டத்தை மேம்படுத்தவும்"],
      gu: ["રોગ શરૂ થાય તે પહેલાં નિવારક પગલાં તરીકે કોપર-આધારિત ફૂગનાશક (કોપર હાઇડ્રોક્સાઇડ અથવા બોર્ડેક્સ મિશ્રણ 1%) નો છંટકાવ કરો", "ચેપગ્રસ્ત છોડની પેશીઓને તરત જ દૂર કરી નાશ કરો; તેનું ખાતર બનાવશો નહીં", "ગીચ વાવેતર ટાળીને હવાની અવરજવર સુધારો"]
    },
    chemicalTreatment: {
      en: ["Spray Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold) @ 2.5g/liter at first sign", "Apply Cymoxanil 8% + Mancozeb 64% WP @ 2.5g/liter as an alternative systemic option", "Spray Dimethomorph 50% WP @ 1g/liter during active disease spread"],
      hi: ["पहले लक्षण पर मेटालेक्सिल 8% + मैनकोजेब 64% WP (रिडोमिल गोल्ड) @ 2.5 ग्राम/लीटर का छिड़काव करें", "वैकल्पिक प्रणालीगत विकल्प के रूप में साइमोक्सेनिल 8% + मैनकोजेब 64% WP @ 2.5 ग्राम/लीटर का प्रयोग करें", "सक्रिय रोग प्रसार के दौरान डाइमेथोमोर्फ 50% WP @ 1 ग्राम/लीटर का छिड़काव करें"],
      ta: ["முதல் அறிகுறியில் மெட்டாலேக்சில் 8% + மேன்கோசெப் 64% WP (ரிடோமில் கோல்ட்) 2.5 கி/லி தெளிக்கவும்", "மாற்று அமைப்பு தேர்வாக சைமோக்சனில் 8% + மேன்கோசெப் 64% WP 2.5 கி/லி பயன்படுத்தவும்", "செயலில் நோய் பரவும்போது டைமெத்தோமார்ப் 50% WP 1 கி/லி தெளிக்கவும்"],
      gu: ["રોગના પ્રથમ ચિહ્ન પર મેટાલેક્સિલ 8% + મેન્કોઝેબ 64% WP (રિડોમિલ ગોલ્ડ) @ 2.5 ગ્રામ/લિટર છાંટો", "વૈકલ્પિક પ્રણાલીગત વિકલ્પ તરીકે સાયમોક્સાનીલ 8% + મેન્કોઝેબ 64% WP @ 2.5 ગ્રામ/લિટર વાપરો", "રોગ સક્રિય રીતે ફેલાતો હોય ત્યારે ડાયમેથોમોર્ફ 50% WP @ 1 ગ્રામ/લિટર છાંટો"]
    },
    prevention: {
      en: ["Plant resistant or tolerant varieties (e.g., Kufri Jyoti, Kufri Bahar in India)", "Avoid overhead irrigation; use drip irrigation to keep foliage dry", "Destroy volunteer potato plants and infected crop debris after harvest"],
      hi: ["प्रतिरोधी या सहनशील किस्में लगाएं (जैसे भारत में कुफरी ज्योति, कुफरी बहार)", "ऊपर से सिंचाई से बचें; पत्तियों को सूखा रखने के लिए ड्रिप सिंचाई का उपयोग करें", "कटाई के बाद स्व-उगे आलू के पौधों और संक्रमित फसल अवशेषों को नष्ट करें"],
      ta: ["நோய் எதிர்ப்பு அல்லது தாங்கும் ரகங்களை நடவு செய்யவும் (உதா. இந்தியாவில் குஃப்ரி ஜோதி, குஃப்ரி பஹார்)", "மேல்நோக்கி பாசனத்தை தவிர்க்கவும்; இலைகளை உலர்வாக வைக்க தெளிப்பு நீர்ப்பாசனம் பயன்படுத்தவும்", "அறுவடைக்கு பிறகு தன்னிச்சை உருளைக்கிழங்கு செடிகளை மற்றும் பாதிக்கப்பட்ட பயிர் எச்சங்களை அழிக்கவும்"],
      gu: ["રોગ પ્રતિકારક અથવા સહનશીલ જાતોનું વાવેતર કરો (દા.ત. કુફરી જ્યોતિ, કુફરી બહાર)", "ઓવરહેડ સિંચાઈ ટાળો; પાંદડાં સૂકાં રાખવા ટપક સિંચાઈનો ઉપયોગ કરો", "કાપણી પછી સ્વયં ઉગી નીકળેલા બટાકાના છોડ અને ચેપગ્રસ્ત પાકના અવશેષોનો નાશ કરો"]
    },
    affectedStage: "Vegetative to tuber maturity",
    spreadRisk: "high",
    colorCode: "#B91C1C"
  },
  {
    // Corn diseases
    id: "corn_blight",
    name: {
      en: "Corn Blight",
      hi: "मक्का झुलसा रोग",
      ta: "மக்காச்சோள கருகல் நோய்",
      gu: "મકાઈનો સુકારો (કોર્ન બ્લાઇટ)"
    },
    severity: "medium",
    symptoms: {
      en: ["Long, elliptical grey-green to tan lesions (3-15 cm) on leaves running parallel to the leaf margin", "Lesions turn tan-brown with dark green or grey borders as they mature", "Severe infection causes leaves to die from the tip downward, reducing photosynthesis and grain fill"],
      hi: ["पत्तियों पर पत्ती के किनारे के समानांतर लंबे, अण्डाकार धूसर-हरे से भूरे घाव (3-15 सेमी)", "घाव परिपक्व होने पर भूरे हो जाते हैं जिनके किनारे गहरे हरे या ग्रे होते हैं", "गंभीर संक्रमण में पत्तियां सिरे से नीचे की ओर मरती हैं, जिससे प्रकाश संश्लेषण और दाना भरना कम होता है"],
      ta: ["இலை விளிம்பிற்கு இணையாக இலைகளில் நீண்ட, நீள்வட்ட சாம்பல்-பச்சை முதல் மஞ்சள்-பழுப்பு காயங்கள் (3-15 செமீ)", "காயங்கள் முதிர்ந்தவுடன் அடர் பச்சை அல்லது சாம்பல் விளிம்புகளுடன் மஞ்சள்-பழுப்பாக மாறும்", "கடுமையான தொற்றில் இலைகள் நுனியிலிருந்து கீழ்நோக்கி இறக்கும், ஒளிச்சேர்க்கை மற்றும் தானிய நிரப்பல் குறையும்"],
      gu: ["પાંદડાની કિનારીને સમાંતર પાંદડા પર લાંબા, અંડાકાર રાખોડી-લીલાથી બદામી રંગના ઘા (3-15 સેમી)", "પરિપક્વ થતાં જ ઘા ઘેરા લીલા અથવા રાખોડી કિનારીઓ સાથે બદામી રંગના થઈ જાય છે", "ગંભીર ચેપથી પાંદડા ટોચથી નીચે તરફ સુકાઈ જાય છે, પ્રકાશસંશ્લેષણ અને દાણા ભરાવવાનું ઘટે છે"]
    },
    causes: {
      en: "Caused by the fungus Exserohilum turcicum (formerly Helminthosporium turcicum). Favored by moderate temperatures (18-27°C), high humidity, and extended periods of leaf wetness. Spreads via wind-dispersed spores from infected crop residues.",
      hi: "एक्सेरोहिलम टर्सिकम फफूंद के कारण। मध्यम तापमान (18-27°C), उच्च आर्द्रता और लंबे समय तक पत्तियों के गीले रहने से बढ़ता है। संक्रमित फसल अवशेषों से हवा द्वारा फैलने वाले बीजाणुओं से फैलता है।",
      ta: "எக்ஸெரோஹிலம் டர்சிகம் என்ற பூஞ்சையால் ஏற்படுகிறது. மிதமான வெப்பம் (18-27°C), அதிக ஈரப்பதம் மற்றும் நீண்ட நேர இலை ஈரப்பதம் இதற்கு சாதகமானது. பாதிக்கப்பட்ட பயிர் எச்சங்களில் இருந்து காற்றில் பரவும் வித்துக்கள் மூலம் பரவுகிறது.",
      gu: "એક્સેરોહિલમ ટર્સિકમ ફૂગ દ્વારા થાય છે. મધ્યમ તાપમાન (18-27°C), ઊંચો ભેજ અને લાંબા સમય સુધી પાંદડા ભીના રહેવાથી ફેલાય છે. ચેપગ્રસ્ત પાકના અવશેષોમાંથી પવન દ્વારા ફેલાતા બીજકણો દ્વારા ફેલાય છે."
    },
    organicTreatment: {
      en: ["Spray Trichoderma-based bioagent (5g/liter) as a preventive foliar application", "Apply Pseudomonas fluorescens (10g/liter) spray at disease onset", "Deep plow and incorporate infected crop residues to reduce primary inoculum"],
      hi: ["निवारक पत्तेदार छिड़काव के रूप में ट्राइकोडर्मा आधारित बायोएजेंट (5 ग्राम/लीटर) का प्रयोग करें", "रोग शुरू होने पर स्यूडोमोनास फ्लूरेसेंस (10 ग्राम/लीटर) का छिड़काव करें", "प्राथमिक टीकाकारक को कम करने के लिए संक्रमित फसल अवशेषों को गहरी जुताई करके मिलाएं"],
      ta: ["தடுப்பு இலைத் தெளிப்பாக ட்ரைக்கோடெர்மா அடிப்படையிலான உயிரியல் முகவர் (5 கி/லி) பயன்படுத்தவும்", "நோய் தொடங்கும்போது சூடோமோனாஸ் புளோரசன்ஸ் (10 கி/லி) தெளிக்கவும்", "முதன்மை தொற்று ஊடகத்தை குறைக்க பாதிக்கப்பட்ட பயிர் எச்சங்களை ஆழமாக உழவு செய்து சேர்க்கவும்"],
      gu: ["નિવારક છંટકાવ તરીકે ટ્રાઇકોડર્મા-આધારિત બાયોએજન્ટ (5 ગ્રામ/લિટર) નો ઉપયોગ કરો", "રોગની શરૂઆતમાં સુડોમોનાસ ફ્લોરોસેન્સ (10 ગ્રામ/લિટર) નો છંટકાવ કરો", "જમીનમાં રોગના જીવાણુઓ ઘટાડવા માટે ચેપગ્રસ્ત પાકના અવશેષોને ઊંડી ખેડ કરીને જમીનમાં દાટી દો"]
    },
    chemicalTreatment: {
      en: ["Spray Mancozeb 75% WP @ 2g/liter at first sign of lesions", "Apply Propiconazole 25% EC @ 1ml/liter for systemic control", "Use Azoxystrobin 23% SC @ 1ml/liter during active spread"],
      hi: ["घावों के पहले लक्षण पर मैनकोजेब 75% WP (2 ग्राम/लीटर) का छिड़काव करें", "प्रणालीगत नियंत्रण के लिए प्रोपिकोनाजोल 25% EC (1 मिली/लीटर) का प्रयोग करें", "सक्रिय प्रसार के दौरान एजोक्सीस्ट्रोबिन 23% SC (1 मिली/लीटर) का उपयोग करें"],
      ta: ["காயங்களின் முதல் அறிகுறியில் மேன்கோசெப் 75% WP (2 கி/லி) தெளிக்கவும்", "அமைப்பு கட்டுப்பாட்டிற்கு ப்ரோபிகோனசோல் 25% EC (1 மிலி/லி) பயன்படுத்தவும்", "செயலில் பரவலின்போது அசோக்ஸிஸ்ட்ரோபின் 23% SC (1 மிலி/லி) பயன்படுத்தவும்"],
      gu: ["પાંદડા પર ઘા દેખાય કે તરત મેન્કોઝેબ 75% WP @ 2 ગ્રામ/લિટર છાંટો", "પ્રણાલીગત નિયંત્રણ માટે પ્રોપિકોનાઝોલ 25% EC @ 1 મિ.લિ./લિટર વાપરો", "રોગ સક્રિય હોય ત્યારે એઝોક્સીસ્ટ્રોબિન 23% SC @ 1 મિ.લિ./લિટરનો ઉપયોગ કરો"]
    },
    prevention: {
      en: ["Plant resistant hybrids where available", "Practice crop rotation with non-host crops like legumes or vegetables", "Avoid dense planting; maintain recommended row spacing to improve airflow"],
      hi: ["जहां उपलब्ध हो प्रतिरोधी हाइब्रिड लगाएं", "फलियों या सब्जियों जैसी गैर-मेजबान फसलों के साथ फसल चक्र अपनाएं", "घनी बुवाई से बचें; वायु प्रवाह सुधारने के लिए अनुशंसित पंक्ति दूरी बनाए रखें"],
      ta: ["கிடைக்கும் இடத்தில் நோய் எதிர்ப்பு கலப்பின ரகங்களை நடவு செய்யவும்", "பயறு வகைகள் அல்லது காய்கறிகள் போன்ற இல்லாத பயிர்களுடன் பயிர் சுழற்சி செய்யவும்", "நெருக்கமான விதைப்பை தவிர்க்கவும்; காற்றோட்டத்தை மேம்படுத்த பரிந்துரைக்கப்பட்ட வரிசை இடைவெளியை பராமரிக்கவும்"],
      gu: ["ઉપલબ્ધ હોય ત્યાં રોગ પ્રતિકારક વર્ણસંકર (હાઇબ્રિડ) જાતો વાવો", "કઠોળ અથવા શાકભાજી જેવા અન્ય પાકો સાથે પાક ફેરબદલી કરો", "ગીચ વાવેતર ટાળો; હવાની અવરજવર સુધારવા ભલામણ કરેલ હરોળ વચ્ચેનું અંતર જાળવો"]
    },
    affectedStage: "Vegetative to grain fill",
    spreadRisk: "medium",
    colorCode: "#A16207"
  },
  {
    id: "common_rust",
    name: {
      en: "Common Rust",
      hi: "सामान्य रतुआ रोग",
      ta: "பொதுவான துரு நோய்",
      gu: "સામાન્ય ગેરુ રોગ (રસ્ટ)"
    },
    severity: "medium",
    symptoms: {
      en: ["Small, powdery, brick-red to dark brown pustules (uredia) scattered on both leaf surfaces", "Pustules elongate and rupture the leaf epidermis, releasing reddish-brown spores", "Heavy infection causes leaves to yellow and die, and reduces grain quality significantly"],
      hi: ["पत्तियों की दोनों सतहों पर छोटे, पाउडरनुमा, ईंट-लाल से गहरे भूरे फफोले बिखरे होते हैं", "फफोले फैलते हैं और पत्ती की एपिडर्मिस को फाड़कर लाल-भूरे बीजाणु छोड़ते हैं", "भारी संक्रमण में पत्तियां पीली होकर मर जाती हैं और अनाज की गुणवत्ता काफी कम हो जाती है"],
      ta: ["இலையின் இரு பரப்புகளிலும் சிறிய, தூள் போன்ற, செங்கல் சிவப்பு முதல் அடர் பழுப்பு நிற கொப்புளங்கள் சிதறியிருக்கும்", "கொப்புளங்கள் நீண்டு இலை வெளிப்புறத்தை கிழித்து சிவப்பு-பழுப்பு வித்துக்களை வெளியிடும்", "அதிக தொற்றில் இலைகள் மஞ்சளாகி இறக்கும், தானிய தரம் கணிசமாக குறையும்"],
      gu: ["પાંદડાની બંને સપાટીઓ પર પથરાયેલા નાના, પાવડર જેવા, ઈંટ-લાલથી ઘેરા ભૂરા રંગના ફોલ્લા", "ફોલ્લા વિસ્તરે છે અને પાંદડાની સપાટીને તોડીને લાલ-ભૂરા બીજકણો બહાર કાઢે છે", "ભારે ચેપથી પાંદડા પીળા થઈ જાય છે અને મરી જાય છે, અને અનાજની ગુણવત્તામાં નોંધપાત્ર ઘટાડો થાય છે"]
    },
    causes: {
      en: "Caused by the obligate fungal pathogen Puccinia sorghi. Spores are wind-borne over long distances. Cool temperatures (16-23°C) with high humidity and dew favor pustule development. Infection is most severe during early silking.",
      hi: "अनिवार्य कवक रोगज़नक़ पुक्सिनिया सोर्घी के कारण। बीजाणु लंबी दूरी तक हवा द्वारा फैलते हैं। ठंडा तापमान (16-23°C) और उच्च आर्द्रता फफोलों के विकास के लिए अनुकूल है। सिल्किंग के शुरुआती दौरान संक्रमण सबसे गंभीर होता है।",
      ta: "புக்கினியா சோர்கி என்ற கட்டாய பூஞ்சை நோய்க்கிருமியால் ஏற்படுகிறது. வித்துக்கள் காற்றில் நீண்ட தூரம் பரவுகின்றன. குளிர்ந்த வெப்பம் (16-23°C) மற்றும் அதிக ஈரப்பதம் கொப்புள வளர்ச்சிக்கு சாதகமானது. ஆரம்ப சில்கிங் காலத்தில் தொற்று மிகவும் கடுமையாக இருக்கும்.",
      gu: "પુક્સીનિયા સોર્ઘી ફૂગ દ્વારા થાય છે. બીજકણો પવન દ્વારા લાંબા અંતર સુધી ફેલાય છે. ઉચ્ચ ભેજ અને ઝાકળ સાથે ઠંડુ તાપમાન (16-23°C) ફોલ્લાના વિકાસની તરફેણ કરે છે. શરૂઆતના સિલ્કિંગ (રેસા આવવા) સમયે ચેપ સૌથી ગંભીર હોય છે."
    },
    organicTreatment: {
      en: ["Spray Neem oil (5ml/liter) as a preventive measure to slow spore germination", "Remove and destroy heavily infected leaves to reduce local spore load", "Apply sulphur dust or wettable sulphur (3g/liter) as a contact option"],
      hi: ["बीजाणु अंकुरण को धीमा करने के निवारक उपाय के रूप में नीम तेल (5 मिली/लीटर) का छिड़काव करें", "स्थानीय बीजाणु भार को कम करने के लिए भारी संक्रमित पत्तियों को हटाएं और नष्ट करें", "संपर्क विकल्प के रूप में सल्फर डस्ट या वेटेबल सल्फर (3 ग्राम/लीटर) का प्रयोग करें"],
      ta: ["வித்து முளைப்பை குறைக்க தடுப்பு நடவடிக்கையாக வேப்ப எண்ணெய் (5 மிலி/லி) தெளிக்கவும்", "உள்ளூர் வித்து சுமையை குறைக்க அதிகமாக பாதிக்கப்பட்ட இலைகளை அகற்றி அழிக்கவும்", "தொடர்பு தேர்வாக கந்தக தூள் அல்லது வெட்டேபிள் சல்பர் (3 கி/லி) பயன்படுத்தவும்"],
      gu: ["બીજકણના અંકુરણને ધીમું કરવા નિવારક પગલા તરીકે લીમડાના તેલ (5 મિ.લિ./લિટર) નો છંટકાવ કરો", "સ્થાનિક બીજકણનો ભાર ઘટાડવા માટે ભારે ચેપવાળા પાંદડાઓને દૂર કરો અને નાશ કરો", "સંપર્ક વિકલ્પ તરીકે સલ્ફર ડસ્ટ અથવા વેટેબલ સલ્ફર (3 ગ્રામ/લિટર) નો ઉપયોગ કરો"]
    },
    chemicalTreatment: {
      en: ["Spray Propiconazole 25% EC @ 1ml/liter at first pustule appearance", "Apply Tebuconazole 25.9% EC @ 1ml/liter for systemic and curative action", "Use Mancozeb 75% WP @ 2g/liter as a protective spray before disease onset"],
      hi: ["पहले फफोले दिखने पर प्रोपिकोनाजोल 25% EC (1 मिली/लीटर) का छिड़काव करें", "प्रणालीगत और उपचारात्मक कार्रवाई के लिए टेबुकोनाजोल 25.9% EC (1 मिली/लीटर) का प्रयोग करें", "रोग शुरू होने से पहले सुरक्षात्मक छिड़काव के रूप में मैनकोजेब 75% WP (2 ग्राम/लीटर) का उपयोग करें"],
      ta: ["முதல் கொப்புள தோற்றத்தில் ப்ரோபிகோனசோல் 25% EC (1 மிலி/லி) தெளிக்கவும்", "அமைப்பு மற்றும் குணப்படுத்தும் செயலுக்கு டெபுகோனசோல் 25.9% EC (1 மிலி/லி) பயன்படுத்தவும்", "நோய் தொடங்குவதற்கு முன் பாதுகாப்பு தெளிப்பாக மேன்கோசெப் 75% WP (2 கி/லி) பயன்படுத்தவும்"],
      gu: ["પ્રથમ ફોલ્લો દેખાય ત્યારે પ્રોપિકોનાઝોલ 25% EC @ 1 મિ.લિ./લિટર છાંટો", "પ્રણાલીગત અને ઉપચારાત્મક ક્રિયા માટે ટેબુકોનાઝોલ 25.9% EC @ 1 મિ.લિ./લિટર વાપરો", "રોગ શરૂ થાય તે પહેલાં રક્ષણાત્મક છંટકાવ તરીકે મેન્કોઝેબ 75% WP @ 2 ગ્રામ/લિટરનો ઉપયોગ કરો"]
    },
    prevention: {
      en: ["Use rust-resistant hybrid varieties as the first line of defence", "Avoid late planting which exposes the crop to higher rust pressure during silking", "Monitor fields regularly from the vegetative stage for early detection"],
      hi: ["बचाव की पहली पंक्ति के रूप में रतुआ प्रतिरोधी हाइब्रिड किस्मों का उपयोग करें", "देर से बुवाई से बचें जो सिल्किंग के दौरान रतुआ के अधिक दबाव में फसल को उजागर करती है", "जल्दी पहचान के लिए वानस्पतिक अवस्था से खेतों की नियमित निगरानी करें"],
      ta: ["பாதுகாப்பின் முதல் வரியாக துரு எதிர்ப்பு கலப்பின ரகங்களை பயன்படுத்தவும்", "சில்கிங் காலத்தில் அதிக துரு அழுத்தத்திற்கு பயிரை வெளிப்படுத்தும் தாமதமான விதைப்பை தவிர்க்கவும்", "ஆரம்பகால கண்டறிவிற்காக தாவர வளர்ச்சி பருவம் முதல் வயல்களை தொடர்ந்து கண்காணிக்கவும்"],
      gu: ["સંરક્ષણની પ્રથમ લાઇન તરીકે ગેરુ-પ્રતિરોધક વર્ણસંકર જાતોનો ઉપયોગ કરો", "મોડું વાવેતર ટાળો જે સિલ્કિંગ દરમિયાન પાકને રસ્ટના ઊંચા દબાણ સામે લાવે છે", "વહેલી ઓળખ માટે વનસ્પતિ અવસ્થાથી ખેતરોનું નિયમિત નિરીક્ષણ કરો"]
    },
    affectedStage: "Vegetative to silking",
    spreadRisk: "medium",
    colorCode: "#B45309"
  },
  {
    id: "gray_leaf_spot",
    name: {
      en: "Gray Leaf Spot",
      hi: "धूसर पत्ती धब्बा रोग",
      ta: "சாம்பல் இலை புள்ளி நோய்",
      gu: "ભૂખરા પાંદડાનો ડાઘ રોગ"
    },
    severity: "medium",
    symptoms: {
      en: ["Rectangular, tan to grey lesions with parallel edges running between leaf veins", "Lesions have no distinct border and appear pale grey on both sides of the leaf under humid conditions", "Coalescing lesions cause large sections of leaf to die, leading to significant yield loss in severe cases"],
      hi: ["पत्ती की नसों के बीच समानांतर किनारों के साथ आयताकार, भूरे से ग्रे घाव", "नम स्थितियों में घावों की कोई स्पष्ट सीमा नहीं होती और पत्ती के दोनों तरफ हल्के ग्रे दिखते हैं", "मिलने वाले घाव पत्ती के बड़े हिस्से को मार देते हैं, जिससे गंभीर मामलों में महत्वपूर्ण उपज हानि होती है"],
      ta: ["இலை நரம்புகளுக்கு இடையே இணையான விளிம்புகளுடன் செவ்வக வடிவ, மஞ்சள்-பழுப்பு முதல் சாம்பல் நிற காயங்கள்", "ஈரமான நிலையில் காயங்களுக்கு தெளிவான விளிம்பு இல்லாமல் இலையின் இரு பக்கங்களிலும் வெளிர் சாம்பல் நிறத்தில் தெரியும்", "இணைந்த காயங்கள் இலையின் பெரிய பகுதிகளை கொல்லும், கடுமையான பாதிப்பில் குறிப்பிடத்தக்க மகசூல் இழப்பு ஏற்படும்"],
      gu: ["પાંદડાની નસો વચ્ચે સમાંતર કિનારીઓ ધરાવતા લંબચોરસ, ભૂખરાથી રાખોડી રંગના ડાઘ", "ડાઘને કોઈ સ્પષ્ટ કિનારી હોતી નથી અને ભેજવાળી સ્થિતિમાં પાંદડાની બંને બાજુએ આછા રાખોડી રંગના દેખાય છે", "એકબીજામાં ભળતા ડાઘ પાંદડાના મોટા ભાગને મારી નાખે છે, જેનાથી ગંભીર કિસ્સાઓમાં નોંધપાત્ર ઉપજમાં ઘટાડો થાય છે"]
    },
    causes: {
      en: "Caused by the fungus Cercospora zeae-maydis. Thrives in warm (25-30°C), humid conditions with prolonged leaf wetness and poor air circulation. Infected crop residues are the primary inoculum source and the disease is most severe in continuous maize cropping systems.",
      hi: "सर्कोस्पोरा जी-मेडिस फफूंद के कारण। गर्म (25-30°C), आर्द्र परिस्थितियों और लंबे समय तक पत्तियों के गीले रहने और खराब वायु संचार में पनपता है। संक्रमित फसल अवशेष प्राथमिक टीकाकारक स्रोत हैं और यह रोग निरंतर मक्का फसल प्रणालियों में सबसे गंभीर है।",
      ta: "சர்கோஸ்போரா ஜீ-மெய்டிஸ் என்ற பூஞ்சையால் ஏற்படுகிறது. வெப்பமான (25-30°C), ஈரமான நிலையில் நீண்ட நேர இலை ஈரப்பதம் மற்றும் மோசமான காற்றோட்டத்தில் செழிக்கிறது. பாதிக்கப்பட்ட பயிர் எச்சங்கள் முதன்மை தொற்று ஊடக மூலமாகும். தொடர் மக்காச்சோள சாகுபடி முறைகளில் நோய் மிகவும் கடுமையாக இருக்கும்.",
      gu: "સર્કોસ્પોરા ઝીઆ-મેડીસ ફૂગ દ્વારા થાય છે. લાંબા સમય સુધી પાંદડાની ભીનાશ અને નબળી હવાની અવરજવર સાથે ગરમ (25-30°C), ભેજવાળી સ્થિતિમાં ખીલે છે. ચેપગ્રસ્ત પાકના અવશેષો પ્રાથમિક ચેપનું સ્ત્રોત છે."
    },
    organicTreatment: {
      en: ["Deep till infected crop residues after harvest to reduce inoculum in the soil", "Spray Trichoderma viride (5g/liter) as a preventive biocontrol measure", "Improve field drainage and reduce canopy density to lower humidity within the crop"],
      hi: ["मिट्टी में टीकाकारक को कम करने के लिए कटाई के बाद संक्रमित फसल अवशेषों को गहरी जुताई करें", "निवारक जैव नियंत्रण उपाय के रूप में ट्राइकोडर्मा विरिडी (5 ग्राम/लीटर) का छिड़काव करें", "फसल के भीतर आर्द्रता कम करने के लिए खेत की जल निकासी में सुधार करें और छत्र घनत्व कम करें"],
      ta: ["மண்ணில் தொற்று ஊடகத்தை குறைக்க அறுவடைக்கு பிறகு பாதிக்கப்பட்ட பயிர் எச்சங்களை ஆழமாக உழவு செய்யவும்", "தடுப்பு உயிரியல் கட்டுப்பாட்டு நடவடிக்கையாக ட்ரைக்கோடெர்மா விரிடி (5 கி/லி) தெளிக்கவும்", "பயிருக்குள் ஈரப்பதத்தை குறைக்க வயல் வடிகாலை மேம்படுத்தவும் மற்றும் மேலாடை அடர்த்தியை குறைக்கவும்"],
      gu: ["જમીનમાં રોગકારક ઘટાડવા માટે લણણી પછી ચેપગ્રસ્ત પાકના અવશેષો સાથે ઊંડી ખેડ કરો", "નિવારક જૈવિક નિયંત્રણ પગલા તરીકે ટ્રાઇકોડર્મા વિરિડી (5 ગ્રામ/લિટર) નો છંટકાવ કરો", "પાકમાં ભેજ ઘટાડવા માટે ખેતરની ડ્રેનેજમાં સુધારો કરો અને કેનોપીની ઘનતા ઘટાડો"]
    },
    chemicalTreatment: {
      en: ["Spray Azoxystrobin 23% SC @ 1ml/liter at early disease onset for systemic protection", "Apply Propiconazole 25% EC @ 1ml/liter or Tebuconazole 25.9% EC @ 1ml/liter as alternatives", "Repeat sprays at 10-14 day intervals if disease pressure remains high"],
      hi: ["प्रणालीगत सुरक्षा के लिए रोग शुरू होने पर एजोक्सीस्ट्रोबिन 23% SC (1 मिली/लीटर) का छिड़काव करें", "विकल्प के रूप में प्रोपिकोनाजोल 25% EC (1 मिली/लीटर) या टेबुकोनाजोल 25.9% EC (1 मिली/लीटर) का प्रयोग करें", "यदि रोग दबाव अधिक रहे तो 10-14 दिन के अंतराल पर छिड़काव दोहराएं"],
      ta: ["அமைப்பு பாதுகாப்பிற்கு ஆரம்ப நோய் தொடக்கத்தில் அசோக்ஸிஸ்ட்ரோபின் 23% SC (1 மிலி/லி) தெளிக்கவும்", "மாற்றாக ப்ரோபிகோனசோல் 25% EC (1 மிலி/லி) அல்லது டெபுகோனசோல் 25.9% EC (1 மிலி/லி) பயன்படுத்தவும்", "நோய் அழுத்தம் அதிகமாக இருந்தால் 10-14 நாள் இடைவெளியில் தெளிப்பை மீண்டும் செய்யவும்"],
      gu: ["પ્રણાલીગત રક્ષણ માટે રોગની શરૂઆતમાં એઝોક્સીસ્ટ્રોબિન 23% SC @ 1 મિ.લિ./લિટર છાંટો", "વિકલ્પ તરીકે પ્રોપિકોનાઝોલ 25% EC @ 1 મિ.લિ./લિટર અથવા ટેબુકોનાઝોલ 25.9% EC @ 1 મિ.લિ./લિટર વાપરો", "જો રોગનું દબાણ વધુ રહે તો 10-14 દિવસના અંતરે છંટકાવનું પુનરાવર્તન કરો"]
    },
    prevention: {
      en: ["Plant resistant hybrid varieties as the primary management strategy", "Rotate maize with soybeans, wheat, or other non-host crops to break the disease cycle", "Avoid planting in fields with a history of gray leaf spot without tillage or rotation"],
      hi: ["प्राथमिक प्रबंधन रणनीति के रूप में प्रतिरोधी हाइब्रिड किस्में लगाएं", "रोग चक्र तोड़ने के लिए मक्के को सोयाबीन, गेहूं या अन्य गैर-मेजबान फसलों के साथ बदलें", "जुताई या फसल चक्र के बिना धूसर पत्ती धब्बे के इतिहास वाले खेतों में बुवाई से बचें"],
      ta: ["முதன்மை மேலாண்மை உத்தியாக நோய் எதிர்ப்பு கலப்பின ரகங்களை நடவு செய்யவும்", "நோய் சுழற்சியை உடைக்க மக்காச்சோளத்தை சோயாபீன், கோதுமை அல்லது பிற இல்லாத பயிர்களுடன் சுழற்றவும்", "உழவு அல்லது பயிர் சுழற்சி இல்லாமல் சாம்பல் இலை புள்ளி வரலாறு உள்ள வயல்களில் விதைப்பை தவிர்க்கவும்"],
      gu: ["પ્રાથમિક વ્યવસ્થાપન વ્યૂહરચના તરીકે રોગ-પ્રતિકારક વર્ણસંકર જાતો વાવો", "રોગચક્રને તોડવા માટે મકાઈને સોયાબીન, ઘઉં અથવા અન્ય બિન-યજમાન પાકો સાથે ફેરબદલી કરો", "ખેડ અથવા ફેરબદલી વિના ગ્રે લીફ સ્પોટનો ઇતિહાસ ધરાવતા ખેતરોમાં વાવેતર કરવાનું ટાળો"]
    },
    affectedStage: "Vegetative to grain fill",
    spreadRisk: "medium",
    colorCode: "#6B7280"
  }
];

export const getDiseaseInfo = (diseaseName: string, _lang: string = "en"): DiseaseInfo | undefined => {
  if (!diseaseName) return undefined;

  const normalizedSearch = normalizeDiseaseKey(diseaseName);

  return ALL_DISEASES.find(disease => {
    if (disease.id === normalizedSearch) return true;

    const normalizedEnglishName = disease.name.en.toLowerCase().trim().replace(/[\s-]+/g, '_');
    if (normalizedEnglishName === normalizedSearch) return true;

    return false;
  });
};

const DISEASE_ALIASES: Record<string, string> = {
  healthy: 'healthy',
  healthy_leaf: 'healthy',
  healthyleaf: 'healthy',
  rice_blast: 'rice_blast',
  riceblast: 'rice_blast',
  blast: 'rice_blast',
  rice_tungro: 'tungro',
  ricetungro: 'tungro',
  tungro: 'tungro',
  brown_spot: 'brown_spot',
  brownspot: 'brown_spot',
  leaf_smut: 'leaf_smut',
  leafsmut: 'leaf_smut',
  bacterial_blight: 'bacterial_blight',
  bacterialblight: 'bacterial_blight',
  cotton_bacterial_blight: 'cotton_bacterial_blight',
  cottonbacterialblight: 'cotton_bacterial_blight',
  sheath_blight: 'sheath_blight',
  sheathblight: 'sheath_blight',
  false_smut: 'false_smut',
  falsesmut: 'false_smut',
  curl_virus: 'curl_virus',
  curlvirus: 'curl_virus',
  herbicide_growth_damage: 'herbicide_growth_damage',
  herbicidegrowthdamage: 'herbicide_growth_damage',
  leaf_hopper_jassids: 'leaf_hopper_jassids',
  leafhopperjassids: 'leaf_hopper_jassids',
  leaf_redding: 'leaf_redding',
  leafredding: 'leaf_redding',
  leaf_variegation: 'leaf_variegation',
  leafvariegation: 'leaf_variegation',
  early_blight: 'early_blight',
  earlyblight: 'early_blight',
  late_blight: 'late_blight',
  lateblight: 'late_blight',
  corn_blight: 'corn_blight',
  cornblight: 'corn_blight',
  common_rust: 'common_rust',
  commonrust: 'common_rust',
  gray_leaf_spot: 'gray_leaf_spot',
  grayleafspot: 'gray_leaf_spot',
};

export const normalizeDiseaseKey = (diseaseName: string): string => {
  const normalized = diseaseName.toLowerCase().trim().replace(/[\s-]+/g, '_');
  const collapsed = normalized.replace(/_/g, '');
  return DISEASE_ALIASES[normalized] || DISEASE_ALIASES[collapsed] || normalized;
};
