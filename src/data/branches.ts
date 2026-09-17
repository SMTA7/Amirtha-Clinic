export interface Branch {
  id: string;
  name: string;
  nameTamil: string;
  category: "24x7" | "day";
  address: string;
  addressTamil: string;
  phone: string;
  whatsappNumber: string;
  lat: number;
  lng: number;
  hours: string;
  hoursTamil: string;
  mapsUrl: string;
  hasMap?: boolean;
  is24Hours: boolean;
  image: string;
  features: string[];
  featuresTamil: string[];
}

export const BRANCHES_DATA: Branch[] = [
  // 1. Veeracholan (FIRST in all listings per request)
  {
    id: "veeracholan",
    name: "Amritha Clinic General Hospital — Veeracholan",
    nameTamil: "அம்ரிதா கிளினிக் பொது மருத்துவமனை — வீரசோழன்",
    category: "24x7",
    address: "Opp. EB Office, Veeracholan, Virudhunagar District, Tamil Nadu 626612",
    addressTamil: "EB ஆபீஸ் எதிரில், வீரசோழன், விருதுநகர் மாவட்டம் 626612",
    phone: "+91 90805 41285 / +91 90256 99302",
    whatsappNumber: "919080541285",
    lat: 9.5167,
    lng: 78.3667,
    hours: "Open 24 Hours",
    hoursTamil: "24 மணி நேரமும் செயல்படுகிறது",
    mapsUrl: "",
    hasMap: false, // Map direction not needed per instruction, WhatsApp direct
    is24Hours: true,
    image: "/images/branches/veeracholan.png",
    features: ["24x7 Emergency Care", "Round-the-Clock Doctor", "Observation Wards", "Pharmacy Support"],
    featuresTamil: ["24 மணி நேர அவசர சிகிச்சை", "முழு நேர மருத்துவர்", "நோயாளி வார்டு", "உடனடி மருந்தகம்"],
  },
  // 2. Perunali
  {
    id: "perunali",
    name: "Amritha Clinic General Hospital — Perunali",
    nameTamil: "அம்ரிதா கிளினிக் பொது மருத்துவமனை — பெருநாழி",
    category: "24x7",
    address: "Near TN Grama Bank, Aruppukottai to Sayalkudi Main Road, Perunali 623115",
    addressTamil: "தமிழ்நாடு கிராம வங்கி அருகில், அருப்புக்கோட்டை to சாயல்குடி மெயின் ரோடு, பெருநாழி 623115",
    phone: "+91 77083 01285",
    whatsappNumber: "917708301285",
    lat: 9.2372707,
    lng: 78.317368,
    hours: "Open 24 Hours",
    hoursTamil: "24 மணி நேரமும் செயல்படுகிறது",
    mapsUrl: "https://maps.app.goo.gl/twdttHNetCRqVgoJ7",
    hasMap: true,
    is24Hours: true,
    image: "/images/branches/perunali.png",
    features: ["24x7 Emergency Care", "Inpatient Observation Wards", "Maternity & Pediatric", "Trauma Stabilization"],
    featuresTamil: ["24 மணி நேர அவசர சிகிச்சை", "தங்கி சிகிச்சை பெறும் படுக்கைகள்", "தாய் & சேய் நலம்", "விபத்து தீவிர சிகிச்சை"],
  },
  // 3. Vembar
  {
    id: "vembar",
    name: "Amritha Clinic General Hospital — Vembar",
    nameTamil: "அம்ரிதா கிளினிக் பொது மருத்துவமனை — வேம்பார்",
    category: "24x7",
    address: "Near RPS Boss House, Mariamman Temple, Beach Road, Vembar 628906",
    addressTamil: "RPS முதலாளி வீடு, மாரியம்மன் கோவில் அருகில், கடற்கரை சாலை, வேம்பார் 628906",
    phone: "+91 90805 41285 / +91 75023 37930",
    whatsappNumber: "919080541285",
    lat: 9.0827315,
    lng: 78.3626669,
    hours: "Open 24 Hours",
    hoursTamil: "24 மணி நேரமும் செயல்படுகிறது",
    mapsUrl: "https://maps.app.goo.gl/jvKGiD1nFYN8DZMs7",
    hasMap: true,
    is24Hours: true,
    image: "/images/branches/Vembar.png",
    features: ["24x7 Emergency Care", "Coastal Area Trauma Response", "Observation Ward", "Full Night Pharmacy"],
    featuresTamil: ["24x7 அவசர பிரிவு", "இரவு நேர மருத்துவர்", "நோயாளி வார்டு", "முழு நேர மருந்தகம்"],
  },
  // 4. Narikkudi
  {
    id: "narikkudi",
    name: "Amritha Clinic — Narikkudi",
    nameTamil: "அம்ரிதா கிளினிக் — நரிக்குடி",
    category: "day",
    address: "Near Union Office, Main Road, Narikkudi 626607",
    addressTamil: "யூனியன் ஆபீஸ் அருகில், மெயின் ரோடு, நரிக்குடி 626607",
    phone: "+91 90805 41285 / +91 90256 99302",
    whatsappNumber: "919080541285",
    lat: 9.5887145,
    lng: 78.3139083,
    hours: "Mon–Sun: 8:00 AM – 9:00 PM",
    hoursTamil: "திங்கள்–ஞாயிறு: காலை 8:00 – இரவு 9:00",
    mapsUrl: "https://maps.app.goo.gl/Qd9jVCj9tMoxMaJu7",
    hasMap: true,
    is24Hours: false,
    image: "/images/branches/Narikudi.png",
    features: ["General Medicine", "In-House Pharmacy", "Lab Diagnostics", "ECG Checkup"],
    featuresTamil: ["பொது மருத்துவம்", "உடனடி மருந்தகம்", "இரத்த பரிசோதனை", "ஈ.சி.ஜி வசதி"],
  },
  // 5. Potakavayal (NEW Location)
  {
    id: "potakavayal",
    name: "Amritha Clinic — Potakavayal",
    nameTamil: "அம்ரிதா கிளினிக் — போட்டகவயல்",
    category: "day",
    address: "Opp. Bus Stand, Potakavayal, Ramanathapuram District",
    addressTamil: "பொட்டகவயல் பேருந்து நிலையம் எதிரில், பொட்டகவயல், ராமநாதபுரம் மாவட்டம்",
    phone: "+91 90805 41285 / +91 75023 37930",
    whatsappNumber: "919080541285",
    lat: 9.5153219,
    lng: 78.8337456,
    hours: "Mon–Sun: 8:00 AM – 10:00 PM",
    hoursTamil: "காலை 8.00 மணி முதல் இரவு 10.00 மணி வரை",
    mapsUrl: "https://maps.app.goo.gl/8Sng6QBCTRqf47fe9",
    hasMap: true,
    is24Hours: false,
    image: "/images/branches/Potakavyal.png",
    features: ["Extended Day Consultations", "8 AM to 10 PM Care", "Diabetic & BP Screenings", "Direct Pharmacy"],
    featuresTamil: ["காலை 8 முதல் இரவு 10 மணி வரை", "சர்க்கரை & இரத்த அழுத்த பரிசோதனை", "முதியோர் நலம்", "உடனடி மருந்தகம்"],
  },
  // 6. Nainarkovil
  {
    id: "nainarkovil",
    name: "Amritha Clinic — Nainarkovil",
    nameTamil: "அம்ரிதா கிளினிக் — நயினார்கோவில்",
    category: "day",
    address: "Opp. RDCC Bank, North Car Street, Nainarkovil 623705",
    addressTamil: "RDCC பேங்க் எதிரில், வடக்கு ரத வீதி, நயினார்கோவில் 623705",
    phone: "+91 63831 02352 / +91 90805 41285",
    whatsappNumber: "916383102352",
    lat: 9.5456387,
    lng: 78.694887,
    hours: "Mon–Sun: 7:00 AM – 10:00 AM",
    hoursTamil: "திங்கள்–ஞாயிறு: காலை 7:00 – 10:00",
    mapsUrl: "https://maps.app.goo.gl/u9wsxuwTy3GabVku5",
    hasMap: true,
    is24Hours: false,
    image: "/images/branches/Nayinarkovil.png",
    features: ["Morning Fast Consultations", "Diabetic Monitoring", "BP & Routine Screenings", "Prescription Refills"],
    featuresTamil: ["காலை நேர சிறப்பு ஆலோசனை", "சர்க்கரை பரிசோதனை", "இரத்த அழுத்த பரிசோதனை", "மருந்து வழங்கல்"],
  },
];
