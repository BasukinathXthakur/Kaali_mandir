// Simple transliteration service for Hindi, Maithili, and English
// Since @ai4bharat/indic-transliterate had compatibility issues,
// we'll use a simpler approach with pre-defined translations

// Language configuration
export const LANGUAGES = {
  ENGLISH: "en",
  HINDI: "hi",
  MAITHILI: "mai",
};

// Language display names
export const LANGUAGE_NAMES = {
  [LANGUAGES.ENGLISH]: "English",
  [LANGUAGES.HINDI]: "हिन्दी",
  [LANGUAGES.MAITHILI]: "मैथली",
};

// Text translations for different languages
export const TRANSLATIONS = {
  [LANGUAGES.ENGLISH]: {
    // Navbar
    home: "Home",
    services: "Services",
    events: "Events",
    yatra: "Yatra & Darshan",
    community: "Community",
    donations: "Donations",
    admin: "Admin",
    login: "Login / Register",
    logout: "Logout",
    adminDashboard: "Admin Dashboard",

    // Home page
    welcomeToKaaliMandir: "Welcome to Kaali Mandir",
    yourTempleAnytimeAnywhere: "Your Temple, Anytime, Anywhere",
    bookAPuja: "Book a Puja",
    joinCommunity: "Join Community",
    nextEvent: "Next Event",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    divineServices: "Divine Services",
    connectWithSpiritualJourney:
      "Connect with your spiritual journey through our offerings",
    bookPujaChadhava: "Book Puja & Chadhava",
    scheduleSacredRituals: "Schedule sacred rituals",
    panchangHoroscope: "Panchang & Horoscope",
    dailyAstrologicalGuidance: "Daily astrological guidance",
    devotionalMusic: "Devotional Music",
    sacredBhajansMantras: "Sacred bhajans and mantras",
    hinduLiterature: "Hindu Literature",
    ancientWisdomScriptures: "Ancient wisdom & scriptures",
    divineTemple: "Divine Temple",
    virtualMandirExperience: "Virtual mandir experience",
    sanataniCommunity: "Sanatani Community",
    connectWithDevotees: "Connect with devotees",
    yatraDarshan: "Yatra & Darshan",
    pilgrimageJourneys: "Pilgrimage journeys",
    chandaDonations: "Chanda & Donations",
    supportTempleActivities: "Support temple activities",
    upcomingEvents: "Upcoming Events",
    joinUsForSacredCeremonies:
      "Join us for these sacred ceremonies and celebrations",
    bookNow: "Book Now",
    viewAllEvents: "View All Events",
    supportOurTemple: "Support Our Temple",
    yourGenerousDonations:
      "Your generous donations help us maintain the temple, organize religious ceremonies, and serve the community. Every contribution, no matter how small, makes a difference.",
    donateNow: "Donate Now",
    ourServices: "Our Services",
    weOfferVariousReligious:
      "We offer various religious and community services",
    pujaServices: "Puja Services",
    wePerformVariousPujas:
      "We perform various pujas and rituals for different occasions and purposes.",
    hawanCeremonies: "Hawan Ceremonies",
    sacredFireCeremonies:
      "Sacred fire ceremonies performed by our experienced priests for purification and blessings.",
    weddingCeremonies: "Wedding Ceremonies",
    traditionalHinduWedding:
      "Traditional Hindu wedding ceremonies conducted with all rituals and customs.",
    noUpcomingEvents:
      "No upcoming events at the moment. Please check back later.",

    // Events page
    pastEvents: "Past Events",
    allEvents: "All Events",
    viewDetails: "View Details",
    pastEvent: "Past Event",
    upcoming: "Upcoming",
    noUpcomingEventsFound: "No upcoming events",
    noPastEventsFound: "No past events",
    noEventsFound: "No events found",
    checkBackLater: "Check back later for new events.",
    checkOtherCategories: "Please check other categories or come back later.",

    // Footer
    footerAbout:
      "A sacred place dedicated to Goddess Kali, offering spiritual guidance, divine rituals, and community services for devotees worldwide.",
    quickLinks: "Quick Links",
    gallery: "Gallery",
    footerServices: "Services",
    hawan: "Hawan",
    marriageCeremonies: "Marriage Ceremonies",
    spiritualGuidance: "Spiritual Guidance",
    contactUs: "Contact Us",
    copyright: "All rights reserved.",
  },

  [LANGUAGES.HINDI]: {
    // Navbar
    home: "होम",
    services: "सेवाएं",
    events: "कार्यक्रम",
    yatra: "यात्रा और दर्शन",
    community: "समुदाय",
    donations: "दान",
    admin: "प्रशासन",
    login: "लॉगिन / रजिस्टर",
    logout: "लॉग आउट",
    adminDashboard: "प्रशासनिक डैशबोर्ड",

    // Home page
    welcomeToKaaliMandir: "काली मंदिर में आपका स्वागत है",
    yourTempleAnytimeAnywhere: "आपका मंदिर, कभी भी, कहीं भी",
    bookAPuja: "पूजा बुक करें",
    joinCommunity: "समुदाय में शामिल हों",
    nextEvent: "अगला कार्यक्रम",
    days: "दिन",
    hours: "घंटे",
    minutes: "मिनट",
    seconds: "सेकंड",
    divineServices: "दिव्य सेवाएं",
    connectWithSpiritualJourney:
      "हमारी पेशकशों के माध्यम से अपनी आध्यात्मिक यात्रा से जुड़ें",
    bookPujaChadhava: "पूजा और चढ़ावा बुक करें",
    scheduleSacredRituals: "पवित्र अनुष्ठानों की व्यवस्था करें",
    panchangHoroscope: "पंचांग और राशिफल",
    dailyAstrologicalGuidance: "दैनिक ज्योतिषीय मार्गदर्शन",
    devotionalMusic: "भक्ति संगीत",
    sacredBhajansMantras: "पवित्र भजन और मंत्र",
    hinduLiterature: "हिंदू साहित्य",
    ancientWisdomScriptures: "प्राचीन ज्ञान और शास्त्र",
    divineTemple: "दिव्य मंदिर",
    virtualMandirExperience: "आभासी मंदिर अनुभव",
    sanataniCommunity: "सनातनी समुदाय",
    connectWithDevotees: "भक्तों से जुड़ें",
    yatraDarshan: "यात्रा और दर्शन",
    pilgrimageJourneys: "तीर्थ यात्राएं",
    chandaDonations: "चंदा और दान",
    supportTempleActivities: "मंदिर गतिविधियों का समर्थन करें",
    upcomingEvents: "आगामी कार्यक्रम",
    joinUsForSacredCeremonies:
      "इन पवित्र समारोहों और उत्सवों में हमारे साथ शामिल हों",
    bookNow: "अभी बुक करें",
    viewAllEvents: "सभी कार्यक्रम देखें",
    supportOurTemple: "हमारे मंदिर का समर्थन करें",
    yourGenerousDonations:
      "आपके उदार दान हमें मंदिर को बनाए रखने, धार्मिक समारोहों का आयोजन करने और समुदाय की सेवा करने में मदद करते हैं। हर योगदान, चाहे कितना भी छोटा हो, फर्क लाता है।",
    donateNow: "अभी दान करें",
    ourServices: "हमारी सेवाएं",
    weOfferVariousReligious:
      "हम विभिन्न धार्मिक और सामुदायिक सेवाएं प्रदान करते हैं",
    pujaServices: "पूजा सेवाएं",
    wePerformVariousPujas:
      "हम विभिन्न अवसरों और उद्देश्यों के लिए विभिन्न पूजा और अनुष्ठान करते हैं।",
    hawanCeremonies: "हवन समारोह",
    sacredFireCeremonies:
      "हमारे अनुभवी पुजारियों द्वारा शुद्धि और आशीर्वाद के लिए किए गए पवित्र अग्नि समारोह।",
    weddingCeremonies: "विवाह समारोह",
    traditionalHinduWedding:
      "सभी रीति-रिवाजों और परंपराओं के साथ आयोजित पारंपरिक हिंदू विवाह समारोह।",
    noUpcomingEvents:
      "फिलहाल कोई आगामी कार्यक्रम नहीं है। कृपया बाद में जांचें।",

    // Events page
    pastEvents: "पिछले कार्यक्रम",
    allEvents: "सभी कार्यक्रम",
    viewDetails: "विवरण देखें",
    pastEvent: "पिछला कार्यक्रम",
    upcoming: "आगामी",
    noUpcomingEventsFound: "कोई आगामी कार्यक्रम नहीं",
    noPastEventsFound: "कोई पिछला कार्यक्रम नहीं",
    noEventsFound: "कोई कार्यक्रम नहीं मिला",
    checkBackLater: "नए कार्यक्रमों के लिए बाद में जांचें।",
    checkOtherCategories: "कृपया अन्य श्रेणियों की जांच करें या बाद में आएं।",

    // Footer
    footerAbout:
      "मां काली को समर्पित एक पवित्र स्थान, जो दुनिया भर के भक्तों के लिए आध्यात्मिक मार्गदर्शन, दिव्य अनुष्ठान और सामुदायिक सेवाएं प्रदान करता है।",
    quickLinks: "त्वरित लिंक",
    gallery: "गैलरी",
    footerServices: "सेवाएं",
    hawan: "हवन",
    marriageCeremonies: "विवाह समारोह",
    spiritualGuidance: "आध्यात्मिक मार्गदर्शन",
    contactUs: "संपर्क करें",
    copyright: "सभी अधिकार सुरक्षित।",
  },

  [LANGUAGES.MAITHILI]: {
    // Navbar
    home: "घर",
    services: "सेवा",
    events: "कार्यक्रम",
    yatra: "यात्रा आ दर्शन",
    community: "समुदाय",
    donations: "दान",
    admin: "प्रशासन",
    login: "लॉगिन / रजिस्टर",
    logout: "लॉग आउट",
    adminDashboard: "प्रशासनिक डैशबोर्ड",

    // Home page
    welcomeToKaaliMandir: "काली मंदिर मे आपक स्वागत छै",
    yourTempleAnytimeAnywhere: "आपक मंदिर, कखनो भी, कहीं भी",
    bookAPuja: "पूजा बुक करू",
    joinCommunity: "समुदाय मे शामिल होऊ",
    nextEvent: "अगिला कार्यक्रम",
    days: "दिन",
    hours: "घंटा",
    minutes: "मिनट",
    seconds: "सेकंड",
    divineServices: "दिव्य सेवा",
    connectWithSpiritualJourney:
      "हमर पेशकश के माध्यम स आपक आध्यात्मिक यात्रा स जुड़ू",
    bookPujaChadhava: "पूजा आ चढ़ावा बुक करू",
    scheduleSacredRituals: "पवित्र अनुष्ठान के व्यवस्था करू",
    panchangHoroscope: "पंचांग आ राशिफल",
    dailyAstrologicalGuidance: "दैनिक ज्योतिषीय मार्गदर्शन",
    devotionalMusic: "भक्ति संगीत",
    sacredBhajansMantras: "पवित्र भजन आ मंत्र",
    hinduLiterature: "हिंदू साहित्य",
    ancientWisdomScriptures: "प्राचीन ज्ञान आ शास्त्र",
    divineTemple: "दिव्य मंदिर",
    virtualMandirExperience: "आभासी मंदिर अनुभव",
    sanataniCommunity: "सनातनी समुदाय",
    connectWithDevotees: "भक्त स जुड़ू",
    yatraDarshan: "यात्रा आ दर्शन",
    pilgrimageJourneys: "तीर्थ यात्रा",
    chandaDonations: "चंदा आ दान",
    supportTempleActivities: "मंदिर गतिविधि के समर्थन करू",
    upcomingEvents: "आगामी कार्यक्रम",
    joinUsForSacredCeremonies: "एह पवित्र समारोह आ उत्सव म हमर साथ शामिल होऊ",
    bookNow: "अभी बुक करू",
    viewAllEvents: "सभी कार्यक्रम देखू",
    supportOurTemple: "हमर मंदिर के समर्थन करू",
    yourGenerousDonations:
      "आपक उदार दान हमरा मंदिर के बनाए रखै म, धार्मिक समारोह के आयोजन करै म आ समुदाय के सेवा करै म मदद करै छै। हर योगदान, चाहे कतना भी छोटा हो, फर्क लावै छै।",
    donateNow: "अभी दान करू",
    ourServices: "हमर सेवा",
    weOfferVariousReligious:
      "हम विभिन्न धार्मिक आ सामुदायिक सेवा प्रदान करै छी",
    pujaServices: "पूजा सेवा",
    wePerformVariousPujas:
      "हम विभिन्न अवसर आ उद्देश्य के लेल विभिन्न पूजा आ अनुष्ठान करै छी।",
    hawanCeremonies: "हवन समारोह",
    sacredFireCeremonies:
      "हमर अनुभवी पुजारी द्वारा शुद्धि आ आशीर्वाद के लेल कएल गेल पवित्र अग्नि समारोह।",
    weddingCeremonies: "विवाह समारोह",
    traditionalHinduWedding:
      "सभी रीति-रिवाज आ परंपरा के साथ आयोजित पारंपरिक हिंदू विवाह समारोह।",
    noUpcomingEvents: "फिलहाल कोनो आगामी कार्यक्रम नहीं छै। कृपया बाद म जांचू।",

    // Events page
    pastEvents: "पिछला कार्यक्रम",
    allEvents: "सभी कार्यक्रम",
    viewDetails: "विवरण देखू",
    pastEvent: "पिछला कार्यक्रम",
    upcoming: "आगामी",
    noUpcomingEventsFound: "कोनो आगामी कार्यक्रम नहीं",
    noPastEventsFound: "कोनो पिछला कार्यक्रम नहीं",
    noEventsFound: "कोनो कार्यक्रम नहीं मिलल",
    checkBackLater: "नए कार्यक्रम के लेल बाद म जांचू।",
    checkOtherCategories: "कृपया अन्य श्रेणी के जांच करू या बाद म आऊ।",

    // Footer
    footerAbout:
      "मां काली के समर्पित एक पवित्र जगह, जे दुनिया भर के भक्त के लेल आध्यात्मिक मार्गदर्शन, दिव्य अनुष्ठान आ सामुदायिक सेवा प्रदान करै छै।",
    quickLinks: "त्वरित लिंक",
    gallery: "गैलरी",
    footerServices: "सेवा",
    hawan: "हवन",
    marriageCeremonies: "विवाह समारोह",
    spiritualGuidance: "आध्यात्मिक मार्गदर्शन",
    contactUs: "संपर्क करू",
    copyright: "सभी अधिकार सुरक्षित।",
  },
};

// Simple transliteration service
export class TransliterationService {
  static async transliterateText(text, fromLang, toLang) {
    // For now, we'll use direct translations instead of transliteration
    // This ensures compatibility and reliability
    if (fromLang === toLang || !text) {
      return text;
    }

    // Return the text as-is since we have direct translations
    // In a production app, you could integrate with a transliteration API here
    return text;
  }

  static getTranslation(key, language) {
    return TRANSLATIONS[language]?.[key] || key;
  }

  static async translateAndTransliterate(key, language) {
    const translation = this.getTranslation(key, language);

    // Return the direct translation since we have comprehensive translations
    return translation;
  }
}
