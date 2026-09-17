export interface Doctor {
  id: string;
  name: string;
  nameTamil: string;
  qualification: string;
  regNo?: string;
  roleBadge: string;
  roleBadgeTamil: string;
  specialty: string;
  specialtyTamil: string;
  availability: string;
  availabilityTamil: string;
  image: string;
  avatarInitials: string;
}

export const DOCTORS_DATA: Doctor[] = [
  // 1. Dr. K. Ajith
  {
    id: "dr-k-ajith",
    name: "Dr. K. Ajith",
    nameTamil: "Dr. க. அஜித்",
    qualification: "MBBS",
    regNo: "161744",
    roleBadge: "Govt. Registered Practitioner",
    roleBadgeTamil: "அரசு பதிவு பெற்ற மருத்துவர்",
    specialty: "General Medicine & Emergency Care",
    specialtyTamil: "பொது மருத்துவம் & அவசர சிகிச்சை",
    availability: "Daily Consultations & Emergency Vigilance",
    availabilityTamil: "தினசரி மருத்துவ ஆலோசனை & அவசர சிகிச்சை",
    image: "/images/doctors/doctor-placeholder.jpg",
    avatarInitials: "KA",
  },
  // 2. Dr. M. Prasanna
  {
    id: "dr-m-prasanna",
    name: "Dr. M. Prasanna",
    nameTamil: "Dr. மு. பிரசன்னா",
    qualification: "MBBS",
    regNo: "161857",
    roleBadge: "Govt. Medical Officer",
    roleBadgeTamil: "அரசு மருத்துவர்",
    specialty: "Pediatrics (Child Health) & General Medicine",
    specialtyTamil: "குழந்தைகள் நலம் மற்றும் பொது நல மருத்துவர்",
    availability: "Pediatric Care & General Consultations",
    availabilityTamil: "குழந்தைகள் நலம் & பொது மருத்துவ ஆலோசனை",
    image: "/images/doctors/doctor-placeholder.jpg",
    avatarInitials: "MP",
  },
  // 3. Dr. R. Ajay
  {
    id: "dr-r-ajay",
    name: "Dr. R. Ajay",
    nameTamil: "Dr. இரா. அஜய்",
    qualification: "MBBS, MD",
    regNo: "118751",
    roleBadge: "Govt. Medical Officer — Specialist",
    roleBadgeTamil: "அரசு மருத்துவர் — சிறப்பு ஆலோசகர்",
    specialty: "Diabetology & Cardiology Specialist",
    specialtyTamil: "சர்க்கரை மற்றும் இருதய நோய் சிறப்பு மருத்துவர்",
    availability: "Diabetic Monitoring & Cardiac Consultation",
    availabilityTamil: "சர்க்கரை & இருதய நோய் சிறப்பு ஆலோசனை",
    image: "/images/doctors/doctor-placeholder.jpg",
    avatarInitials: "RA",
  },
  // 4. Dr. R. Vignesh
  {
    id: "dr-r-vignesh",
    name: "Dr. R. Vignesh",
    nameTamil: "Dr. ரா. விக்னேஷ்",
    qualification: "MBBS",
    regNo: "168736",
    roleBadge: "Govt. Medical Officer",
    roleBadgeTamil: "அரசு மருத்துவர்",
    specialty: "Child Health & Family General Practice",
    specialtyTamil: "குழந்தைகள் நலம் மற்றும் பொதுநல மருத்துவர்",
    availability: "Child Healthcare & Family Medicine",
    availabilityTamil: "குழந்தை நலம் & குடும்ப பொது மருத்துவம்",
    image: "/images/doctors/doctor-placeholder.jpg",
    avatarInitials: "RV",
  },
  // 5. Dr. R. Divakar
  {
    id: "dr-r-divakar",
    name: "Dr. R. Divakar",
    nameTamil: "Dr. ரா. திவாகர்",
    qualification: "Physician Assistant",
    regNo: "180007",
    roleBadge: "Govt. Assistant Medical Officer",
    roleBadgeTamil: "அரசு உதவி மருத்துவர்",
    specialty: "Acute Clinical Care & Inpatient Observation",
    specialtyTamil: "அவசர உதவி & தீவிர கண்காணிப்பு",
    availability: "Clinical Observation & Emergency Assistance",
    availabilityTamil: "நோயாளி கண்காணிப்பு & உடனடி அவசர உதவி",
    image: "/images/doctors/doctor-placeholder.jpg",
    avatarInitials: "RD",
  },
  // 6. Dr. Inbarajan
  {
    id: "dr-inbarajan",
    name: "Dr. Inbarajan",
    nameTamil: "Dr. இன்பராஜன்",
    qualification: "MBBS",
    regNo: "143099",
    roleBadge: "Govt. Medical Officer",
    roleBadgeTamil: "அரசு மருத்துவர்",
    specialty: "Emergency Medicine & Trauma Care",
    specialtyTamil: "அவசர சிகிச்சை & தீவிர பொது மருத்துவம்",
    availability: "24×7 Emergency Response & Trauma Care",
    availabilityTamil: "24×7 அவசர சிகிச்சை & தீவிர விபத்து பிரிவு",
    image: "/images/doctors/doctor-placeholder.jpg",
    avatarInitials: "IB",
  },
  // 7. Dr. Manikandan
  {
    id: "dr-manikandan",
    name: "Dr. Manikandan",
    nameTamil: "Dr. மணிகண்டன்",
    qualification: "MBBS, MD",
    roleBadge: "Senior Specialist Consultant",
    roleBadgeTamil: "முதுநிலை சிறப்பு மருத்துவர்",
    specialty: "Cardiology & Pulmonology (Heart & Lung Specialist)",
    specialtyTamil: "இருதய மற்றும் நுரையீரல் சிறப்பு மருத்துவர்",
    availability: "Specialist Heart & Chest Care",
    availabilityTamil: "இருதய மற்றும் நுரையீரல் சிறப்பு பரிசோதனை",
    image: "/images/doctors/doctor-placeholder.jpg",
    avatarInitials: "MK",
  },
];
