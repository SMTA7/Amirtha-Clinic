export interface Testimonial {
  id: string;
  name: string;
  nameTamil: string;
  location: string;
  locationTamil: string;
  rating: number;
  date: string;
  comment: string;
  commentTamil: string;
  branchTreated: string;
}

// [REPLACE WITH REAL PATIENT TESTIMONIALS FROM GOOGLE REVIEWS]
export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "review-1",
    name: "R. Shanmugam",
    nameTamil: "ஆர். சண்முகம்",
    location: "Perunali",
    locationTamil: "பெருநாழி",
    rating: 5,
    date: "2 weeks ago",
    comment: "At 1:30 AM my father had severe chest pain and breathing trouble. We rushed to the Perunali branch. The night doctor was immediately attentive, gave emergency medication and oxygen support right away. True lifesaver for our village.",
    commentTamil: "இரவு 1:30 மணிக்கு என் தந்தைக்கு நெஞ்சு வலி வந்தபோது உடனே பெருநாழி கிளைக்கு அழைத்துச் சென்றோம். இரவு பணியில் இருந்த மருத்துவர் உடனே கவனித்து முதலுதவி செய்தார். எங்கள் பகுதிக்கு கிடைத்த மிகப்பெரிய வரப்பிரசாதம்.",
    branchTreated: "Perunali General Hospital",
  },
  {
    id: "review-2",
    name: "K. Malarvizhi",
    nameTamil: "கே. மலர்விழி",
    location: "Narikkudi",
    locationTamil: "நரிக்குடி",
    rating: 5,
    date: "1 month ago",
    comment: "Very clean clinic with kind doctors who listen patiently to elderly patients. Medicines are available inside the clinic itself so we don't have to search around town. Highly recommended for family health.",
    commentTamil: "மிகவும் தூய்மையான கிளினிக். முதியோர்களின் குறைகளை பொறுமையாக கேட்டு சிகிச்சை அளிக்கிறார்கள். உள்ளேயே மருந்தகம் இருப்பதால் அலைச்சல் இல்லை.",
    branchTreated: "Narikkudi Branch",
  },
  {
    id: "review-3",
    name: "A. Xavier Fernando",
    nameTamil: "ஏ. சேவியர் பெர்னாண்டோ",
    location: "Vembar",
    locationTamil: "வேம்பார்",
    rating: 5,
    date: "3 weeks ago",
    comment: "Our coastal area really needed a trusted 24-hour clinic. Amritha Clinic Vembar provides excellent medical care with genuine empathy and very affordable fees.",
    commentTamil: "எங்கள் கடலோரப் பகுதிக்கு 24 மணி நேரமும் செயல்படும் தரமான மருத்துவமனை தேவைப்பட்டது. நியாயமான கட்டணத்தில் மிகச் சிறந்த சிகிச்சை வழங்குகிறார்கள்.",
    branchTreated: "Vembar General Hospital",
  },
  {
    id: "review-4",
    name: "P. Muthulakshmi",
    nameTamil: "பி. முத்துலட்சுமி",
    location: "Nainarkovil",
    locationTamil: "நயினார்கோவில்",
    rating: 5,
    date: "Just recently",
    comment: "The morning 7 AM clinic is so helpful for routine sugar and BP checkups before going to work. Quick service and gentle consultation every time.",
    commentTamil: "வேலைக்கு செல்லும் முன் காலை 7 மணிக்கே சர்க்கரை மற்றும் இரத்த அழுத்த பரிசோதனை செய்து கொள்ள மிகவும் வசதியாக உள்ளது.",
    branchTreated: "Nainarkovil Branch",
  },
];
