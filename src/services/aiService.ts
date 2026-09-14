export interface AIInterpretationResult {
  specialty: string;
  gender: string;
  date: string;
  time: string;
  location: string;
  rawSymptoms: string;
  language: string;
  matchedKeywords?: string[];
  explanation?: string;
}

type Rule = { specialty: string; label: string; keywords: string[] };

/**
 * Offline multilingual NLP-style symptom classifier.
 * Supports English, Telugu, Hindi and Tamil, including common mixed-language
 * / transliterated phrases (for example: "naaku skin rash undhi").
 * This is a care-navigation aid, not a diagnosis engine.
 */
export async function interpretNaturalLanguageQuery(query: string): Promise<AIInterpretationResult> {
  const text = query.trim().toLowerCase();
  const normalized = text.replace(/[.,!?;:()]/g, ' ').replace(/\s+/g, ' ');

  const rules: Rule[] = [
    {
      specialty: 'Dermatology', label: 'skin-related symptoms',
      keywords: [
        'skin', 'rash', 'acne', 'pimple', 'itch', 'itchy', 'eczema', 'psoriasis', 'hair fall', 'dandruff', 'hives',
        'చర్మం', 'చర్మ', 'దద్దుర్లు', 'దద్దుర్లు', 'దురద', 'మొటిమలు', 'మొటిమ', 'జుట్టు రాలడం', 'చర్మ సమస్య',
        'त्वचा', 'त्वचा में', 'चकत्ते', 'चकत्ता', 'खुजली', 'मुंहासे', 'बाल झड़ना', 'त्वचा की समस्या',
        'தோல்', 'தோலில்', 'தடிப்பு', 'சொறி', 'அரிப்பு', 'முகப்பரு', 'முடி உதிர்வு', 'தோல் பிரச்சனை',
        'skin rash', 'skin problem', 'skin allergy'
      ]
    },
    {
      specialty: 'Cardiology', label: 'heart or chest-related symptoms',
      keywords: [
        'heart', 'chest pain', 'chest pressure', 'palpitation', 'palpitations', 'heartbeat', 'blood pressure', 'bp', 'cholesterol', 'breathlessness',
        'గుండె', 'గుండె నొప్పి', 'ఛాతి నొప్పి', 'గుండె దడ', 'బీపీ', 'రక్తపోటు',
        'दिल', 'सीने में दर्द', 'दिल की धड़कन', 'ब्लड प्रेशर', 'बीपी', 'कोलेस्ट्रॉल',
        'இதயம்', 'மார்பு வலி', 'இதயத் துடிப்பு', 'ரத்த அழுத்தம்', 'பிபி', 'கொலஸ்ட்ரால்'
      ]
    },
    {
      specialty: 'Orthopedics', label: 'bone, joint, or muscle symptoms',
      keywords: [
        'bone', 'joint', 'knee', 'knee pain', 'back pain', 'shoulder', 'neck pain', 'fracture', 'arthritis', 'sprain', 'muscle', 'leg pain', 'wrist',
        'ఎముక', 'కీళ్ల నొప్పి', 'మోకాలి నొప్పి', 'వెన్ను నొప్పి', 'భుజం నొప్పి', 'మెడ నొప్పి', 'ఎముక విరిగింది', 'ఆర్థరైటిస్',
'కాళ్లు నొప్పి', 'కాలు నొప్పి', 'కాళ్ళ నొప్పి', 'కాళ్ళు నొప్పి', 'కాలు', 'కాళ్లు', 'కాళ్ళు',
        'हड्डी', 'जोड़ों का दर्द', 'घुटने में दर्द', 'कमर दर्द', 'कंधे का दर्द', 'गर्दन दर्द', 'फ्रैक्चर', 'गठिया',
        'எலும்பு', 'மூட்டு வலி', 'முழங்கால் வலி', 'முதுகு வலி', 'தோள் வலி', 'கழுத்து வலி', 'எலும்பு முறிவு', 'மூட்டுவலி'
      ]
    },
    {
      specialty: 'Pediatrics', label: 'child healthcare needs',
      keywords: [
        'child', 'children', 'baby', 'infant', 'kid', 'son', 'daughter', 'pediatric',
        'పిల్ల', 'పిల్లలు', 'బాబు', 'బేబీ', 'చిన్నారి', 'నా బాబు', 'మా బాబు',
        'बच्चा', 'बच्चे', 'बच्चों', 'बेटा', 'बेटी', 'शिशु', 'मेरा बच्चा', 'मेरे बच्चे',
        'குழந்தை', 'குழந்தைகள்', 'குழந்தைக்கு', 'பாப்பா', 'சிறுவன்', 'சிறுமி', 'என் குழந்தை'
      ]
    },
    {
      specialty: 'Dentistry', label: 'dental symptoms',
      keywords: [
        'tooth', 'teeth', 'toothache', 'gum', 'gums', 'dental', 'cavity', 'mouth pain', 'braces',
        'పంటి', 'పళ్ళు', 'పంటి నొప్పి', 'చిగుళ్లు', 'దంత', 'దంత సమస్య',
        'दांत', 'दांतों में दर्द', 'दांत दर्द', 'मसूड़े', 'दंत', 'कैविटी',
        'பல்', 'பற்கள்', 'பல் வலி', 'ஈறுகள்', 'பல் பிரச்சனை', 'பல் சொத்தை'
      ]
    },
    {
      specialty: 'Ophthalmology', label: 'eye or vision symptoms',
      keywords: [
        'eye', 'eyes', 'vision', 'blurred vision', 'spectacles', 'glasses', 'red eye', 'dry eye', 'cataract',
        'కంటి', 'కళ్ళు', 'కంటి నొప్పి', 'చూపు', 'చూపు మసక', 'కళ్ల సమస్య',
        'आंख', 'आंखों', 'दृष्टि', 'धुंधला दिखना', 'चश्मा', 'लाल आंख', 'सूखी आंख', 'मोतियाबिंद',
        'கண்', 'கண்கள்', 'கண் வலி', 'பார்வை', 'மங்கலான பார்வை', 'கண்ணாடி', 'சிவந்த கண்', 'கண்புரை'
      ]
    },
    {
      specialty: 'ENT', label: 'ear, nose, or throat symptoms',
      keywords: [
        'ear', 'hearing', 'nose', 'sinus', 'sore throat', 'throat', 'tonsil', 'tonsils', 'blocked nose',
        'చెవి', 'వినికిడి', 'ముక్కు', 'సైనస్', 'గొంతు నొప్పి', 'గొంతు', 'ముక్కు బ్లాక్', 'గొంతు సమస్య',
        'कान', 'सुनाई', 'नाक', 'साइनस', 'गले में दर्द', 'गला', 'नाक बंद', 'गले की समस्या',
        'காது', 'கேட்கும்', 'மூக்கு', 'சைனஸ்', 'தொண்டை வலி', 'தொண்டை', 'மூக்கு அடைப்பு', 'தொண்டை பிரச்சனை'
      ]
    },
    {
      specialty: 'Neurology', label: 'neurological symptoms',
      keywords: [
        'migraine', 'headache', 'head pain', 'vertigo', 'dizziness', 'seizure', 'numbness', 'tingling', 'memory loss', 'neurology',
        'తలనొప్పి', 'తల నొప్పి', 'మైగ్రేన్', 'తిరగడం', 'తల తిరగడం', 'మూర్ఛ', 'నిస్పృహ', 'చేతి కాలు మొద్దుబారడం',
        'सिरदर्द', 'सिर दर्द', 'माइग्रेन', 'चक्कर', 'चक्कर आना', 'दौरा', 'सुन्नपन', 'झुनझुनी', 'याददाश्त',
        'தலைவலி', 'தலை வலி', 'ஒற்றைத் தலைவலி', 'மயக்கம்', 'தலைசுற்றல்', 'வலிப்பு', 'உணர்வின்மை', 'கூச்சம்'
      ]
    },
    {
      specialty: 'Gynecology', label: 'women’s reproductive or menstrual healthcare needs',
      keywords: [
        'period', 'periods', 'menstrual', 'menstruation', 'pcos', 'pregnancy', 'pregnant', 'ovary', 'ovarian', 'gynecologist', 'gynaecologist', 'women health',
        'పీరియడ్స్', 'నెలసరి', 'మాసిక', 'పిసిఒఎస్', 'గర్భం', 'గర్భిణి', 'అండాశయం', 'మహిళల ఆరోగ్యం',
        'पीरियड', 'पीरियड्स', 'मासिक धर्म', 'पीसीओएस', 'गर्भावस्था', 'गर्भवती', 'अंडाशय', 'महिला स्वास्थ्य',
        'மாதவிடாய்', 'மாதவிடாய் வலி', 'பிசிஓஎஸ்', 'கர்ப்பம்', 'கர்ப்பிணி', 'கருப்பை முட்டை', 'பெண்கள் நலம்'
      ]
    },
    {
      specialty: 'General Medicine', label: 'general or common symptoms',
      keywords: [
        'fever', 'cough', 'flu', 'vomiting', 'diarrhea', 'diarrhoea', 'stomach pain', 'cold', 'weakness', 'fatigue', 'diabetes', 'sugar', 'infection', 'checkup', 'check-up', 'general',
        'జ్వరం', 'దగ్గు', 'వాంతులు', 'విరేచనాలు', 'కడుపు నొప్పి', 'జలుబు', 'బలహీనత', 'అలసట', 'మధుమేహం', 'షుగర్', 'ఇన్ఫెక్షన్',
        'बुखार', 'खांसी', 'उल्टी', 'दस्त', 'पेट दर्द', 'जुकाम', 'कमजोरी', 'थकान', 'मधुमेह', 'शुगर', 'संक्रमण',
        'காய்ச்சல்', 'இருமல்', 'வாந்தி', 'வயிற்றுப்போக்கு', 'வயிற்று வலி', 'சளி', 'பலவீனம்', 'சோர்வு', 'நீரிழிவு', 'சர்க்கரை', 'தொற்று'
      ]
    }
  ];

  // Detect broad language signals so the UI can explain that mixed-language input was understood.
  const languageScores = {
    Telugu: (text.match(/[\u0C00-\u0C7F]/g) || []).length + (text.match(/\b(naaku|naku|undhi|undi|ki|kosam|maa|babu|noppi|undi)\b/g) || []).length * 2,
    Hindi: (text.match(/[\u0900-\u097F]/g) || []).length + (text.match(/\b(mujhe|mujhko|hai|hain|mein|mere|meri|ka|ki|ko|dard|baccha)\b/g) || []).length * 2,
    Tamil: (text.match(/[\u0B80-\u0BFF]/g) || []).length + (text.match(/\b(enakku|enaku|irukku|iruku|ulladhu|vali|valikkuthu|kuzhandhai|en)\b/g) || []).length * 2,
    English: (text.match(/\b(the|i|have|need|my|skin|pain|doctor|problem|is|and|with)\b/g) || []).length
  };
  const topLanguage = Object.entries(languageScores).sort((a, b) => b[1] - a[1])[0];
  const language = topLanguage && topLanguage[1] > 0 ? topLanguage[0] : 'English';
  const languageLabel = language === 'English' && /[\u0900-\u097F\u0B80-\u0BFF\u0C00-\u0C7F]/.test(text) ? 'Multilingual' : language;

  // Priority score means a phrase with several matching symptoms wins over one incidental word.
  const scored = rules.map((rule) => {
    const matched = rule.keywords.filter((keyword) => normalized.includes(keyword.toLowerCase()));
    const score = matched.reduce((sum, keyword) => sum + (keyword.includes(' ') || /[^\x00-\x7F]/.test(keyword) ? 2 : 1), 0);
    return { rule, matched, score };
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score);

  let selected = scored[0];
  // Context overrides: a child-related phrase should route to Pediatrics when combined with a symptom.
  const pediatric = scored.find((item) => item.rule.specialty === 'Pediatrics');
  if (pediatric) selected = pediatric;

  // Specific ENT phrases beat generic cold/fever matching.
  const ent = scored.find((item) => item.rule.specialty === 'ENT');
  if (ent && ent.score >= 2) selected = ent;

  const selectedRule = selected?.rule;
  const matchedKeywords = selected?.matched.slice(0, 6) || [];

  let gender = 'No Preference';
  if (/\b(female|woman|women|lady|girl|महिला|औरत|लड़की|பெண்|பெண்கள்|మహిళ|స్త్రీ)\b/.test(text)) gender = 'Female';
  else if (/\b(male|man|men|boy|पुरुष|आदमी|लड़का|ஆண்|ஆண்கள்|పురుష|అబ్బాయి)\b/.test(text)) gender = 'Male';

  let time = 'Anytime';
  if (text.includes('morning') || /\b(am)\b/.test(text) || text.includes('ఉదయం') || text.includes('सुबह') || text.includes('காலை')) time = 'Morning';
  else if (text.includes('evening') || text.includes('after 5') || /\bpm\b/.test(text) || text.includes('సాయంత్రం') || text.includes('शाम') || text.includes('மாலை')) time = 'Evening (After 5 PM)';

  let date = 'Tomorrow';
  if (text.includes('today') || text.includes('ఈరోజు') || text.includes('आज') || text.includes('இன்று')) date = 'Today';
  else if (text.includes('tomorrow') || text.includes('రేపు') || text.includes('कल') || text.includes('நாளை')) date = 'Tomorrow';
  else if (text.includes('saturday') || text.includes('శనివారం') || text.includes('शनिवार') || text.includes('சனிக்கிழமை')) date = 'This Saturday';
  else if (text.includes('sunday') || text.includes('ఆదివారం') || text.includes('रविवार') || text.includes('ஞாயிற்றுக்கிழமை')) date = 'This Sunday';

  const specialty = selectedRule?.specialty || 'General Medicine';
  const explanation = selectedRule
    ? `CareFlow understood your ${languageLabel.toLowerCase()} input and matched ${matchedKeywords.join(', ') || 'your symptoms'} to ${specialty}.` 
    : 'CareFlow could not identify a specific symptom pattern, so General Medicine is suggested as a starting point.';

  return {
    specialty,
    gender,
    date,
    time,
    location: 'All local facilities',
    rawSymptoms: query,
    language: languageLabel,
    matchedKeywords,
    explanation
  };
}
