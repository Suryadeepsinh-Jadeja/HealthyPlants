import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules, Platform } from 'react-native';

const LANGUAGE_STORE_KEY = '@app_language';

const resources: Record<string, { translation: any }> = {
  en: {
    translation: {
      app: {
        name: "HealthyPlants",
        tagline: "Protect your crop, protect your income"
      },
      nav: {
        home: "Home",
        camera: "Scan",
        history: "History",
        about: "About"
      },
      home: {
        title: "Crop Health Scanner",
        subtitle: "Identify crop diseases instantly",
        scanButton: "Scan Crop",
        galleryButton: "Upload from Gallery",
        cameraEyebrow: "Instant camera analysis",
        galleryEyebrow: "Use existing crop photos",
        historyButton: "View Scan History",
        recentScans: "Recent Scans",
        noScansYet: "No scans found yet. Try scanning an affected crop leaf!",
        tipLabel: "Farming Tip",
        tip: "Farming Tip: Start with a clear close-up image of the affected leaf for the most reliable result.",
        modelReady: "AI model ready",
        modelLoading: "Loading model...",
        demoMode: "Demo mode active",
        galleryAnalyzing: "Analyzing selected image..."
      },
      camera: {
        title: "Scan",
        instruction: "Point camera at the affected leaf",
        analyzing: "Analyzing...",
        openingGallery: "Opening gallery...",
        galleryShort: "Gallery",
        autoOn: "AUTO ON",
        autoOff: "AUTO OFF",
        holdStill: "Hold Still",
        tapToCapture: "Tap to Capture",
        initializing: "Initializing Camera..."
      },
      result: {
        healthy: "Healthy Crop",
        diseaseFound: "Detection Result",
        crop: "Crop",
        cropConfidence: "Crop Confidence",
        confidence: "Confidence",
        symptoms: "Symptoms",
        causes: "Causes",
        overview: "Overview",
        treatment: "Recommended Treatment",
        organic: "Organic Methods",
        chemical: "Chemical Methods",
        prevention: "Prevention Strategies",
        severity: "Severity Level",
        noTreatments: "No specific treatments listed for this category.",
        healthyFallback: "Your crop looks great! Keep up the good work.",
        genericOverviewLine1: "Detected crop: {{crop}}",
        genericOverviewLine2: "Detected condition: {{disease}}",
        genericOverviewBody: "This result comes from the crop-specific screening pipeline. Detailed in-app care notes for this disease have not been added yet, so please use the prediction as a screening aid and confirm it with field inspection before treatment.",
        genericTreatmentBody: "Isolate heavily affected plants if possible, monitor spread across nearby leaves, and consult a local agronomist or extension worker before applying pesticides or herbicides.",
        genericPrevention1: "Keep a few clear photos of the leaf, stem, and surrounding plants for verification.",
        genericPrevention2: "Avoid spraying broad treatments until the diagnosis is confirmed.",
        genericPrevention3: "Track whether symptoms are increasing, spreading, or linked to recent chemical use.",
        scanAgain: "Scan Another Crop",
        saveResult: "Share Result",
        lowConfidence: "Image unclear, please retake in good lighting",
        severityLevels: {
          high: "High",
          medium: "Medium",
          low: "Low"
        },
        riskLevels: {
          high: "High",
          medium: "Medium",
          low: "Low"
        },
        affectedStages: {
          all_stages: "All stages",
          seedling_to_grain_formation: "Seedling to grain formation",
          seedling_to_maturity: "Seedling to maturity",
          late_tillering_to_maturity: "Late tillering to maturity",
          nursery_to_tillering: "Nursery to tillering",
          tillering_to_maturity: "Tillering to maturity",
          flowering_and_maturity: "Flowering and maturity",
          seedling_to_boll_formation: "Seedling to boll formation",
          seedling_to_boll_development: "Seedling to boll development",
          any_stage_depending_on_exposure_timing: "Any stage depending on exposure timing",
          seedling_to_boll_maturity: "Seedling to boll maturity",
          boll_formation_to_maturity: "Boll formation to maturity",
          seedling_to_vegetative_growth: "Seedling to vegetative growth",
          vegetative_to_tuber_bulking: "Vegetative to tuber bulking",
          vegetative_to_tuber_maturity: "Vegetative to tuber maturity",
          vegetative_to_grain_fill: "Vegetative to grain fill",
          vegetative_to_silking: "Vegetative to silking"
        }
      },
      error: {
        title: "Error",
        modelNotLoaded: "AI Model could not be loaded. Please restart the app.",
        cameraPermission: "Camera access is required to scan leaves.",
        generic: "Something went wrong. Please try again.",
        openSelectedImage: "Unable to open selected image.",
        analysisFailed: "An error occurred during analysis.",
        shareFailed: "Could not share the result.",
        openSettings: "Open Settings"
      },
      language: {
        select: "Select Language",
        en: "English",
        hi: "हिन्दी (Hindi)",
        ta: "தமிழ் (Tamil)",
        gu: "ગુજરાતી (Gujarati)"
      },
      crops: {
        rice: "Rice",
        cotton: "Cotton",
        potato: "Potato",
        corn: "Corn",
        unknown: "Unknown Crop"
      },
      history: {
        title: "Scan History",
        subtitle: "Recent detections are stored on this device for quick review.",
        loading: "Loading saved scans...",
        emptyTitle: "No saved scans yet",
        emptyBody: "Your captured results will appear here automatically after each analysis.",
        clearAction: "Clear History",
        clearConfirmTitle: "Clear saved scan history?",
        clearConfirmMessage: "This removes all saved scan entries from this device.",
        reviewBadge: "Review"
      },
      dev: {
        title: "Developer Menu",
        version: "Version: {{value}}",
        inferenceMode: "Inference Mode: {{value}}",
        runTests: "Run Local Contract Tests",
        testsResult: "{{passed}} passed, {{failed}} failed.",
        openDemo: "Open Demo Result",
        clearHistoryDoneTitle: "History Cleared",
        clearHistoryDoneBody: "Saved scan history has been removed.",
        closeMenu: "Close Dev Menu"
      },
      boundary: {
        title: "Something went wrong",
        description: "The analysis engine encountered an unexpected issue. This usually happens because of memory pressure or a temporary model/runtime fault.",
        unknown: "Unknown Exception",
        retry: "Try Again"
      },
      common: {
        cancel: "Cancel"
      }
    }
  },
  hi: {
    translation: {
      app: {
        name: "HealthyPlants",
        tagline: "अपनी फसल बचाएं, अपनी आय बचाएं"
      },
      nav: {
        home: "होम",
        camera: "स्कैन",
        history: "इतिहास",
        about: "हमारे बारे में"
      },
      home: {
        title: "फसल स्वास्थ्य स्कैनर",
        subtitle: "फसल के रोगों की तुरंत पहचान करें",
        scanButton: "कैमरा खोलें",
        galleryButton: "गैलरी से चुनें",
        cameraEyebrow: "तुरंत कैमरा विश्लेषण",
        galleryEyebrow: "मौजूदा फसल तस्वीरें चुनें",
        historyButton: "स्कैन इतिहास देखें",
        recentScans: "हाल के स्कैन",
        noScansYet: "अभी तक कोई स्कैन नहीं। प्रभावित पत्ती को स्कैन करके देखें!",
        tipLabel: "कृषि टिप",
        tip: "कृषि टिप: सबसे भरोसेमंद परिणाम के लिए प्रभावित पत्ती की साफ और नज़दीकी तस्वीर लें।",
        modelReady: "AI मॉडल तैयार है",
        modelLoading: "मॉडल लोड हो रहा है...",
        demoMode: "डेमो मोड सक्रिय है",
        galleryAnalyzing: "चयनित छवि का विश्लेषण हो रहा है..."
      },
      camera: {
        title: "स्कैन",
        instruction: "कैमरे को प्रभावित पत्ती की ओर करें",
        analyzing: "विश्लेषण कर रहा है...",
        openingGallery: "गैलरी खोली जा रही है...",
        galleryShort: "गैलरी",
        autoOn: "ऑटो चालू",
        autoOff: "ऑटो बंद",
        holdStill: "स्थिर रखें",
        tapToCapture: "फोटो खींचने के लिए टैप करें",
        initializing: "कैमरा शुरू हो रहा है..."
      },
      result: {
        healthy: "स्वस्थ फसल",
        diseaseFound: "विश्लेषण परिणाम",
        crop: "फसल",
        cropConfidence: "फसल सटीकता",
        confidence: "सटीकता",
        symptoms: "लक्षण",
        causes: "कारण",
        overview: "सारांश",
        treatment: "सुझाया गया उपचार",
        organic: "जैविक तरीके",
        chemical: "रासायनिक तरीके",
        prevention: "बचाव के तरीके",
        severity: "गंभीरता स्तर",
        noTreatments: "इस श्रेणी के लिए कोई विशेष उपचार सूचीबद्ध नहीं है।",
        healthyFallback: "आपकी फसल अच्छी दिख रही है। इसे ऐसे ही बनाए रखें।",
        genericOverviewLine1: "पहचानी गई फसल: {{crop}}",
        genericOverviewLine2: "पहचानी गई स्थिति: {{disease}}",
        genericOverviewBody: "यह परिणाम फसल-विशिष्ट स्क्रीनिंग पाइपलाइन से आया है। इस रोग के लिए विस्तृत इन-ऐप देखभाल नोट्स अभी जोड़े नहीं गए हैं, इसलिए कृपया इस भविष्यवाणी को केवल प्रारंभिक संकेत मानें और उपचार से पहले खेत में जांच कर पुष्टि करें।",
        genericTreatmentBody: "यदि संभव हो तो अधिक प्रभावित पौधों को अलग करें, आसपास की पत्तियों पर फैलाव की निगरानी करें, और किसी भी कीटनाशक या खरपतवारनाशी के उपयोग से पहले स्थानीय कृषि विशेषज्ञ से सलाह लें।",
        genericPrevention1: "पुष्टि के लिए पत्ती, तने और आसपास के पौधों की कुछ साफ तस्वीरें रखें।",
        genericPrevention2: "रोग की पुष्टि होने से पहले व्यापक उपचार का छिड़काव न करें।",
        genericPrevention3: "ध्यान रखें कि लक्षण बढ़ रहे हैं, फैल रहे हैं, या हाल के रसायन उपयोग से जुड़े हैं या नहीं।",
        scanAgain: "दूसरी फसल स्कैन करें",
        saveResult: "परिणाम साझा करें",
        lowConfidence: "छवि अस्पष्ट है, कृपया अच्छी रोशनी में फिर से लें",
        severityLevels: {
          high: "गंभीर",
          medium: "मध्यम",
          low: "कम"
        },
        riskLevels: {
          high: "उच्च",
          medium: "मध्यम",
          low: "कम"
        },
        affectedStages: {
          all_stages: "सभी अवस्थाएँ",
          seedling_to_grain_formation: "रोपाई से दाना बनने तक",
          seedling_to_maturity: "रोपाई से परिपक्वता तक",
          late_tillering_to_maturity: "देर से कल्ले बनने से परिपक्वता तक",
          nursery_to_tillering: "नर्सरी से कल्ले बनने तक",
          tillering_to_maturity: "कल्ले बनने से परिपक्वता तक",
          flowering_and_maturity: "फूल आने से परिपक्वता तक",
          seedling_to_boll_formation: "अंकुर अवस्था से बीजकोष बनने तक",
          seedling_to_boll_development: "अंकुर अवस्था से बीजकोष विकास तक",
          any_stage_depending_on_exposure_timing: "संपर्क के समय के अनुसार किसी भी अवस्था में",
          seedling_to_boll_maturity: "अंकुर अवस्था से बीजकोष परिपक्वता तक",
          boll_formation_to_maturity: "बीजकोष बनने से परिपक्वता तक",
          seedling_to_vegetative_growth: "अंकुर अवस्था से वनस्पतिक वृद्धि तक",
          vegetative_to_tuber_bulking: "वनस्पतिक वृद्धि से कंद भराव तक",
          vegetative_to_tuber_maturity: "वनस्पतिक वृद्धि से कंद परिपक्वता तक",
          vegetative_to_grain_fill: "वनस्पतिक वृद्धि से दाना भराव तक",
          vegetative_to_silking: "वनस्पतिक वृद्धि से सिल्किंग तक"
        }
      },
      error: {
        title: "त्रुटि",
        modelNotLoaded: "एआई मॉडल लोड नहीं हो सका। कृपया ऐप को फिर से शुरू करें।",
        cameraPermission: "पत्तियों को स्कैन करने के लिए कैमरे की अनुमति आवश्यक है।",
        generic: "कुछ गलत हो गया। कृपया पुन: प्रयास करें।",
        openSelectedImage: "चयनित छवि खोली नहीं जा सकी।",
        analysisFailed: "विश्लेषण के दौरान एक त्रुटि हुई।",
        shareFailed: "परिणाम साझा नहीं किया जा सका।",
        openSettings: "सेटिंग्स खोलें"
      },
      language: {
        select: "भाषा चुनें",
        en: "English",
        hi: "हिन्दी",
        ta: "தமிழ் (Tamil)",
        gu: "ગુજરાતી"
      },
      crops: {
        rice: "धान",
        cotton: "कपास",
        potato: "आलू",
        corn: "मक्का",
        unknown: "अज्ञात फसल"
      },
      history: {
        title: "स्कैन इतिहास",
        subtitle: "हाल के परिणाम इसी डिवाइस पर सुरक्षित रखे जाते हैं ताकि आप उन्हें फिर से देख सकें।",
        loading: "सहेजे गए स्कैन लोड हो रहे हैं...",
        emptyTitle: "अभी तक कोई सहेजा गया स्कैन नहीं",
        emptyBody: "हर विश्लेषण के बाद आपके परिणाम यहां अपने-आप दिखने लगेंगे।",
        clearAction: "इतिहास साफ करें",
        clearConfirmTitle: "सहेजा गया स्कैन इतिहास साफ करें?",
        clearConfirmMessage: "इस डिवाइस से सभी सहेजे गए स्कैन हट जाएंगे।",
        reviewBadge: "जांचें"
      },
      dev: {
        title: "डेवलपर मेनू",
        version: "संस्करण: {{value}}",
        inferenceMode: "इन्फेरेंस मोड: {{value}}",
        runTests: "स्थानीय कॉन्ट्रैक्ट परीक्षण चलाएं",
        testsResult: "{{passed}} पास, {{failed}} असफल।",
        openDemo: "डेमो परिणाम खोलें",
        clearHistoryDoneTitle: "इतिहास साफ किया गया",
        clearHistoryDoneBody: "सहेजा गया स्कैन इतिहास हटा दिया गया है।",
        closeMenu: "डेव मेनू बंद करें"
      },
      boundary: {
        title: "कुछ गलत हो गया",
        description: "विश्लेषण इंजन में एक अप्रत्याशित समस्या आई। यह आमतौर पर मेमोरी दबाव या अस्थायी मॉडल/रनटाइम त्रुटि के कारण होता है।",
        unknown: "अज्ञात अपवाद",
        retry: "फिर से प्रयास करें"
      },
      common: {
        cancel: "रद्द करें"
      }
    }
  },
  ta: {
    translation: {
      app: {
        name: "HealthyPlants",
        tagline: "உங்கள் பயிரைப் பாதுகாக்கவும், உங்கள் வருமானத்தைப் பாதுகாக்கவும்"
      },
      nav: {
        home: "முகப்பு",
        camera: "ஸ்கேன்",
        history: "வரலாறு",
        about: "பற்றி"
      },
      home: {
        title: "பயிர் சுகாதார ஸ்கேனர்",
        subtitle: "பயிர் நோய்களை உடனடியாக அடையாளம் காணவும்",
        scanButton: "கேமராவை திறக்கவும்",
        galleryButton: "தொகுப்பிலிருந்து பதிவேற்றவும்",
        cameraEyebrow: "உடனடி கேமரா பகுப்பாய்வு",
        galleryEyebrow: "இருக்கும் பயிர் புகைப்படங்களை பயன்படுத்தவும்",
        historyButton: "ஸ்கேன் வரலாற்றைக் காண்க",
        recentScans: "சமீபத்திய ஸ்கேன்கள்",
        noScansYet: "இன்னும் ஸ்கேன்கள் இல்லை. பாதிக்கப்பட்ட இலையை ஸ்கேன் செய்து பார்க்கவும்!",
        tipLabel: "விவசாய குறிப்பு",
        tip: "விவசாய குறிப்பு: மிக நம்பகமான முடிவிற்கு பாதிக்கப்பட்ட இலையின் தெளிவான நெருக்கப் புகைப்படத்தை எடுக்கவும்.",
        modelReady: "AI மாதிரி தயார்",
        modelLoading: "மாதிரி ஏற்றப்படுகிறது...",
        demoMode: "டெமோ முறை செயல்பாட்டில் உள்ளது",
        galleryAnalyzing: "தேர்ந்தெடுக்கப்பட்ட படத்தை பகுப்பாய்வு செய்கிறது..."
      },
      camera: {
        title: "ஸ்கேன்",
        instruction: "பாதிக்கப்பட்ட இலையை நோக்கி கேமராவைக் காட்டுங்கள்",
        analyzing: "பகுப்பாய்வு செய்கிறது...",
        openingGallery: "தொகுப்பு திறக்கப்படுகிறது...",
        galleryShort: "தொகுப்பு",
        autoOn: "ஆட்டோ ஆன்",
        autoOff: "ஆட்டோ ஆஃப்",
        holdStill: "அசையாமல் நிற்கவும்",
        tapToCapture: "புகைப்படம் எடுக்க தொடவும்",
        initializing: "கேமரா துவங்குகிறது..."
      },
      result: {
        healthy: "ஆரோக்கியமான பயிர்",
        diseaseFound: "பகுப்பாய்வு முடிவு",
        crop: "பயிர்",
        cropConfidence: "பயிர் நம்பிக்கை",
        confidence: "நம்பிக்கை",
        symptoms: "அறிகுறிகள்",
        causes: "காரணங்கள்",
        overview: "மேலோட்டம்",
        treatment: "பரிந்துரைக்கப்பட்ட சிகிச்சை",
        organic: "இயற்கை முறைகள்",
        chemical: "இரசாயன முறைகள்",
        prevention: "தடுப்பு உத்திகள்",
        severity: "தீவிர நிலை",
        noTreatments: "இந்த பிரிவிற்கான குறிப்பிட்ட சிகிச்சைகள் பட்டியலிடப்படவில்லை.",
        healthyFallback: "உங்கள் பயிர் நன்றாக உள்ளது. இதேபோல் பராமரியுங்கள்.",
        genericOverviewLine1: "கண்டறியப்பட்ட பயிர்: {{crop}}",
        genericOverviewLine2: "கண்டறியப்பட்ட நிலை: {{disease}}",
        genericOverviewBody: "இந்த முடிவு பயிர்-சார்ந்த ஸ்கிரீனிங் செயல்முறையிலிருந்து வருகிறது. இந்த நோய்க்கான விரிவான பயன்பாட்டு குறிப்புகள் இன்னும் சேர்க்கப்படவில்லை, எனவே இந்த கணிப்பை ஆரம்ப சிக்னலாக மட்டும் பயன்படுத்தி, சிகிச்சைக்கு முன் வயல் ஆய்வில் உறுதிப்படுத்தவும்.",
        genericTreatmentBody: "சாத்தியமானால் கடுமையாக பாதிக்கப்பட்ட செடிகளை தனியாக வைத்துக் கொள்ளுங்கள், அருகிலுள்ள இலைகளில் பரவலை கவனியுங்கள், மற்றும் பூச்சிக்கொல்லி அல்லது களைக்கொல்லி பயன்படுத்துவதற்கு முன் உள்ளூர் வேளாண் நிபுணருடன் ஆலோசிக்கவும்.",
        genericPrevention1: "உறுதிப்படுத்துவதற்காக இலை, தண்டு மற்றும் சுற்றியுள்ள செடிகளின் தெளிவான சில புகைப்படங்களை வைத்திருங்கள்.",
        genericPrevention2: "நோய் உறுதிப்படுத்தப்படும் வரை பரவலான தெளிப்பை தவிர்க்கவும்.",
        genericPrevention3: "அறிகுறிகள் அதிகரிக்கிறதா, பரவுகிறதா, அல்லது சமீபத்திய இரசாயன பயன்பாட்டுடன் தொடர்புடையதா என்பதை கவனிக்கவும்.",
        scanAgain: "மற்றொரு பயிரை ஸ்கேன் செய்யவும்",
        saveResult: "முடிவை பகிரவும்",
        lowConfidence: "படம் தெளிவாக இல்லை, தயவுசெய்து நல்ல வெளிச்சத்தில் மீண்டும் எடுக்கவும்",
        severityLevels: {
          high: "அதிகம்",
          medium: "நடுத்தரம்",
          low: "குறைவு"
        },
        riskLevels: {
          high: "அதிகம்",
          medium: "நடுத்தரம்",
          low: "குறைவு"
        },
        affectedStages: {
          all_stages: "அனைத்து நிலைகளும்",
          seedling_to_grain_formation: "நாற்று முதல் தானிய உருவாக்கம் வரை",
          seedling_to_maturity: "நாற்று முதல் முதிர்ச்சி வரை",
          late_tillering_to_maturity: "பிந்தைய கிளை உருவாக்கம் முதல் முதிர்ச்சி வரை",
          nursery_to_tillering: "நாற்றங்கால் முதல் கிளை உருவாக்கம் வரை",
          tillering_to_maturity: "கிளை உருவாக்கம் முதல் முதிர்ச்சி வரை",
          flowering_and_maturity: "மலர்ச்சி மற்றும் முதிர்ச்சி",
          seedling_to_boll_formation: "நாற்று முதல் கொட்டை உருவாக்கம் வரை",
          seedling_to_boll_development: "நாற்று முதல் கொட்டை வளர்ச்சி வரை",
          any_stage_depending_on_exposure_timing: "பாதிப்பு நேரத்தைப் பொறுத்து எந்த நிலையிலும்",
          seedling_to_boll_maturity: "நாற்று முதல் கொட்டை முதிர்ச்சி வரை",
          boll_formation_to_maturity: "கொட்டை உருவாக்கம் முதல் முதிர்ச்சி வரை",
          seedling_to_vegetative_growth: "நாற்று முதல் தாவர வளர்ச்சி வரை",
          vegetative_to_tuber_bulking: "தாவர வளர்ச்சி முதல் கிழங்கு நிரப்பு வரை",
          vegetative_to_tuber_maturity: "தாவர வளர்ச்சி முதல் கிழங்கு முதிர்ச்சி வரை",
          vegetative_to_grain_fill: "தாவர வளர்ச்சி முதல் தானிய நிரப்பு வரை",
          vegetative_to_silking: "தாவர வளர்ச்சி முதல் சில்கிங் வரை"
        }
      },
      error: {
        title: "பிழை",
        modelNotLoaded: "AI மாடலை ஏற்ற முடியவில்லை. தயவுசெய்து ஆப்ஸை மறுதொடக்கம் செய்யவும்.",
        cameraPermission: "இலைகளை ஸ்கேன் செய்ய கேமரா அணுகல் தேவை.",
        generic: "ஏதோ தவறு நடந்துவிட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",
        openSelectedImage: "தேர்ந்தெடுத்த படத்தை திறக்க முடியவில்லை.",
        analysisFailed: "பகுப்பாய்வின் போது பிழை ஏற்பட்டது.",
        shareFailed: "முடிவை பகிர முடியவில்லை.",
        openSettings: "அமைப்புகளைத் திறக்கவும்"
      },
      language: {
        select: "மொழியைத் தேர்ந்தெடுக்கவும்",
        en: "English",
        hi: "हिन्दी (Hindi)",
        ta: "தமிழ்",
        gu: "ગુજરાતી"
      },
      crops: {
        rice: "நெல்",
        cotton: "பருத்தி",
        potato: "உருளைக்கிழங்கு",
        corn: "மக்காச்சோளம்",
        unknown: "அறியப்படாத பயிர்"
      },
      history: {
        title: "ஸ்கேன் வரலாறு",
        subtitle: "சமீபத்திய கண்டறிதல்கள் விரைவாக மீண்டும் பார்க்க இந்த சாதனத்திலேயே சேமிக்கப்படுகின்றன.",
        loading: "சேமிக்கப்பட்ட ஸ்கேன்கள் ஏற்றப்படுகின்றன...",
        emptyTitle: "இன்னும் சேமிக்கப்பட்ட ஸ்கேன்கள் இல்லை",
        emptyBody: "ஒவ்வொரு பகுப்பாய்விற்குப் பிறகும் உங்கள் முடிவுகள் தானாகவே இங்கே தோன்றும்.",
        clearAction: "வரலாற்றை அழிக்கவும்",
        clearConfirmTitle: "சேமித்த ஸ்கேன் வரலாற்றை அழிக்கவா?",
        clearConfirmMessage: "இந்த சாதனத்தில் சேமிக்கப்பட்ட அனைத்து ஸ்கேன்களும் அகற்றப்படும்.",
        reviewBadge: "சரிபார்"
      },
      dev: {
        title: "டெவலப்பர் மெனு",
        version: "பதிப்பு: {{value}}",
        inferenceMode: "இன்ஃபெரென்ஸ் முறை: {{value}}",
        runTests: "உள்ளூர் ஒப்பந்த சோதனைகளை இயக்கவும்",
        testsResult: "{{passed}} வெற்றி, {{failed}} தோல்வி.",
        openDemo: "டெமோ முடிவைத் திறக்கவும்",
        clearHistoryDoneTitle: "வரலாறு அழிக்கப்பட்டது",
        clearHistoryDoneBody: "சேமிக்கப்பட்ட ஸ்கேன் வரலாறு அகற்றப்பட்டது.",
        closeMenu: "டெவ் மெனுவை மூடு"
      },
      boundary: {
        title: "ஏதோ தவறு ஏற்பட்டது",
        description: "பகுப்பாய்வு இயந்திரத்தில் எதிர்பாராத சிக்கல் ஏற்பட்டது. இது பொதுவாக நினைவக அழுத்தம் அல்லது தற்காலிக மாதிரி/இயக்கப் பிழையால் ஏற்படுகிறது.",
        unknown: "அறியப்படாத விதிவிலக்கு",
        retry: "மீண்டும் முயற்சிக்கவும்"
      },
      common: {
        cancel: "ரத்து செய்"
      }
    }
  }
};

// Gujarati translations.
resources.gu = {
  translation: {
    app: {
      name: "HealthyPlants",
      tagline: "તમારો પાક બચાવો, તમારી આવક બચાવો"
    },
    nav: {
      home: "હોમ",
      camera: "સ્કેન",
      history: "ઇતિહાસ",
      about: "અમારા વિશે"
    },
    home: {
      title: "પાક સ્વાસ્થ્ય સ્કેનર",
      subtitle: "પાકના રોગોને તરત ઓળખો",
      scanButton: "કેમેરા ખોલો",
      galleryButton: "ગેલેરીમાંથી પસંદ કરો",
      cameraEyebrow: "તત્કાળ કેમેરા વિશ્લેષણ",
      galleryEyebrow: "હાલની પાક તસવીરોનો ઉપયોગ કરો",
      historyButton: "સ્કેન ઇતિહાસ જુઓ",
      recentScans: "તાજેતરના સ્કેન",
      noScansYet: "હજી સુધી કોઈ સ્કેન નથી. અસરગ્રસ્ત પાંદડું સ્કેન કરી જુઓ!",
      tipLabel: "ખેતી ટિપ",
      tip: "ખેતી ટિપ: સૌથી વિશ્વસનીય પરિણામ માટે અસરગ્રસ્ત પાંદડાની સ્પષ્ટ અને નજીકની તસવીર લો.",
      modelReady: "AI મોડેલ તૈયાર છે",
      modelLoading: "મોડેલ લોડ થઈ રહ્યું છે...",
      demoMode: "ડેમો મોડ સક્રિય છે",
      galleryAnalyzing: "પસંદ કરેલી છબીનું વિશ્લેષણ થઈ રહ્યું છે..."
    },
    camera: {
      title: "સ્કેન",
      instruction: "કેમેરાને અસરગ્રસ્ત પાંદડા તરફ કરો",
      analyzing: "વિશ્લેષણ થઈ રહ્યું છે...",
      openingGallery: "ગેલેરી ખોલાઈ રહી છે...",
      galleryShort: "ગેલેરી",
      autoOn: "ઓટો ચાલુ",
      autoOff: "ઓટો બંધ",
      holdStill: "સ્થિર રાખો",
      tapToCapture: "ફોટો લેવા ટૅપ કરો",
      initializing: "કેમેરા શરૂ થઈ રહ્યો છે..."
    },
    result: {
      healthy: "સ્વસ્થ પાક",
      diseaseFound: "વિશ્લેષણ પરિણામ",
      crop: "પાક",
      cropConfidence: "પાક વિશ્વાસ",
      confidence: "વિશ્વાસ",
      symptoms: "લક્ષણો",
      causes: "કારણો",
      overview: "સારાંશ",
      treatment: "ભલામણ કરેલ સારવાર",
      organic: "જૈવિક પદ્ધતિઓ",
      chemical: "રાસાયણિક પદ્ધતિઓ",
      prevention: "નિવારણ વ્યૂહરચનાઓ",
      severity: "ગંભીરતાનું સ્તર",
      noTreatments: "આ શ્રેણી માટે કોઈ ચોક્કસ સારવાર સૂચિબદ્ધ નથી.",
      healthyFallback: "તમારો પાક સારો દેખાય છે! આ જ રીતે ચાલુ રાખો.",
      genericOverviewLine1: "ઓળખાયેલ પાક: {{crop}}",
      genericOverviewLine2: "ઓળખાયેલ સ્થિતિ: {{disease}}",
      genericOverviewBody: "આ પરિણામ પાક-વિશિષ્ટ સ્ક્રીનિંગ પ્રક્રિયામાંથી આવ્યું છે. આ રોગ માટેની વિગતવાર ઇન-એપ સંભાળ નોંધો હજી ઉમેરવામાં આવી નથી, તેથી કૃપા કરી આ આગાહીને માત્ર પ્રારંભિક સંકેત તરીકે ઉપયોગ કરો અને સારવાર પહેલાં ખેતરમાં તપાસ કરીને પુષ્ટિ કરો.",
      genericTreatmentBody: "શક્ય હોય તો વધુ અસરગ્રસ્ત છોડને અલગ કરો, આસપાસના પાંદડામાં ફેલાવો પર નજર રાખો, અને કોઈ પણ જંતુનાશક અથવા નીંદણનાશક વાપરતા પહેલાં સ્થાનિક કૃષિ નિષ્ણાત સાથે પરામર્શ કરો.",
      genericPrevention1: "ચકાસણી માટે પાંદડા, દાંડી અને આસપાસના છોડના થોડા સ્પષ્ટ ફોટા રાખો.",
      genericPrevention2: "નિદાનની પુષ્ટિ ન થાય ત્યાં સુધી વ્યાપક સારવારનો છંટકાવ ટાળો.",
      genericPrevention3: "ધ્યાન રાખો કે લક્ષણો વધી રહ્યા છે, ફેલાઈ રહ્યા છે, કે તાજેતરના રસાયણ ઉપયોગ સાથે જોડાયેલા છે.",
      scanAgain: "બીજો પાક સ્કેન કરો",
      saveResult: "પરિણામ શેર કરો",
      lowConfidence: "છબી અસ્પષ્ટ છે, કૃપા કરી સારા પ્રકાશમાં ફરીથી લો",
      severityLevels: {
        high: "ઊંચી",
        medium: "મધ્યમ",
        low: "ઓછી"
      },
      riskLevels: {
        high: "ઊંચું",
        medium: "મધ્યમ",
        low: "ઓછું"
      },
      affectedStages: {
        all_stages: "બધા તબક્કા",
        seedling_to_grain_formation: "રોપ અવસ્થાથી દાણા બનવા સુધી",
        seedling_to_maturity: "રોપ અવસ્થાથી પરિપક્વતા સુધી",
        late_tillering_to_maturity: "મોડી ફૂટ અવસ્થાથી પરિપક્વતા સુધી",
        nursery_to_tillering: "નર્સરીથી ફૂટ અવસ્થા સુધી",
        tillering_to_maturity: "ફૂટ અવસ્થાથી પરિપક્વતા સુધી",
        flowering_and_maturity: "ફૂલ આવવાથી પરિપક્વતા સુધી",
        seedling_to_boll_formation: "રોપ અવસ્થાથી જીંડવા બનવા સુધી",
        seedling_to_boll_development: "રોપ અવસ્થાથી જીંડવા વિકાસ સુધી",
        any_stage_depending_on_exposure_timing: "સંપર્કના સમય પ્રમાણે કોઈ પણ તબક્કે",
        seedling_to_boll_maturity: "રોપ અવસ્થાથી જીંડવા પરિપક્વતા સુધી",
        boll_formation_to_maturity: "જીંડવા બનવાથી પરિપક્વતા સુધી",
        seedling_to_vegetative_growth: "રોપ અવસ્થાથી વનસ્પતિ વૃદ્ધિ સુધી",
        vegetative_to_tuber_bulking: "વનસ્પતિ વૃદ્ધિથી કંદ ભરાવ સુધી",
        vegetative_to_tuber_maturity: "વનસ્પતિ વૃદ્ધિથી કંદ પરિપક્વતા સુધી",
        vegetative_to_grain_fill: "વનસ્પતિ વૃદ્ધિથી દાણા ભરાવ સુધી",
        vegetative_to_silking: "વનસ્પતિ વૃદ્ધિથી સિલ્કિંગ સુધી"
      }
    },
    error: {
      title: "ભૂલ",
      modelNotLoaded: "AI મોડેલ લોડ થઈ શક્યું નહીં. કૃપા કરી એપ ફરી શરૂ કરો.",
      cameraPermission: "પાંદડા સ્કેન કરવા કેમેરાની પરવાનગી જરૂરી છે.",
      generic: "કંઈક ખોટું થયું. કૃપા કરી ફરી પ્રયાસ કરો.",
      openSelectedImage: "પસંદ કરેલી છબી ખોલી શકાઈ નહીં.",
      analysisFailed: "વિશ્લેષણ દરમ્યાન ભૂલ આવી.",
      shareFailed: "પરિણામ શેર કરી શકાયું નહીં.",
      openSettings: "સેટિંગ્સ ખોલો"
    },
    language: {
      select: "ભાષા પસંદ કરો",
      en: "English",
      hi: "हिन्दी (Hindi)",
      ta: "தமிழ் (Tamil)",
      gu: "ગુજરાતી"
    },
    crops: {
      rice: "ડાંગર",
      cotton: "કપાસ",
      potato: "બટાકા",
      corn: "મકાઈ",
      unknown: "અજ્ઞાત પાક"
    },
    history: {
      title: "સ્કેન ઇતિહાસ",
      subtitle: "તાજેતરના પરિણામો ઝડપથી ફરી જોવા માટે આ ઉપકરણ પર સંગ્રહિત છે.",
      loading: "સાચવેલ સ્કેન લોડ થઈ રહ્યા છે...",
      emptyTitle: "હજી સુધી કોઈ સાચવેલ સ્કેન નથી",
      emptyBody: "દરેક વિશ્લેષણ પછી તમારા પરિણામો આપોઆપ અહીં દેખાશે.",
      clearAction: "ઇતિહાસ સાફ કરો",
      clearConfirmTitle: "સાચવેલ સ્કેન ઇતિહાસ સાફ કરવો?",
      clearConfirmMessage: "આ ઉપકરણ પરથી બધી સાચવેલ સ્કેન નોંધો દૂર થઈ જશે.",
      reviewBadge: "તપાસો"
    },
    dev: {
      title: "ડેવલપર મેનૂ",
      version: "આવૃત્તિ: {{value}}",
      inferenceMode: "ઇન્ફરન્સ મોડ: {{value}}",
      runTests: "સ્થાનિક કોન્ટ્રેક્ટ ટેસ્ટ ચલાવો",
      testsResult: "{{passed}} પાસ, {{failed}} નિષ્ફળ.",
      openDemo: "ડેમો પરિણામ ખોલો",
      clearHistoryDoneTitle: "ઇતિહાસ સાફ થઈ ગયો",
      clearHistoryDoneBody: "સાચવેલ સ્કેન ઇતિહાસ દૂર કરવામાં આવ્યો છે.",
      closeMenu: "ડેવ મેનૂ બંધ કરો"
    },
    boundary: {
      title: "કંઈક ખોટું થયું",
      description: "વિશ્લેષણ એન્જિનમાં અણધાર્યો પ્રશ્ન આવ્યો. આ સામાન્ય રીતે મેમરીના દબાણ અથવા અસ્થાયી મોડેલ/રનટાઇમ ભૂલને કારણે થાય છે.",
      unknown: "અજ્ઞાત અપવાદ",
      retry: "ફરી પ્રયાસ કરો"
    },
    common: {
      cancel: "રદ કરો"
    },
  },
};

const getDeviceLanguage = (): string => {
  try {
    const locale =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

    const shortLocale = locale ? locale.substring(0, 2) : 'en';

    if (Object.keys(resources).includes(shortLocale)) {
      return shortLocale;
    }
  } catch (error) {
    console.warn("Could not retrieve device locale. Defaulting to 'en'.", error);
  }
  return 'en';
};

const languageDetectorPlugin = {
  type: 'languageDetector' as const,
  async: true,
  init: () => {},
  detect: async (callback: (lng: string) => void) => {
    try {
      const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORE_KEY);
      if (storedLanguage) {
        return callback(storedLanguage);
      } else {
        return callback(getDeviceLanguage());
      }
    } catch (error) {
      console.warn('Error reading language from AsyncStorage', error);
      return callback(getDeviceLanguage());
    }
  },
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORE_KEY, language);
    } catch (error) {
      console.warn('Error setting language to AsyncStorage', error);
    }
  },
};

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already inherently protects from XSS
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
