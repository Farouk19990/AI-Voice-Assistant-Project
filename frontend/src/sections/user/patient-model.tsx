interface PatientData {
    call_id: string;
    date: string;
    email: string;
    phone: string;
  }
  
interface StructuredData {
    availability: string;
    contact_details: {
      age: string;
      email: string;
      full_name: string;
      phone: string;
    };
    emotional_tone: string;
    form: {
      email: string;
      phone: string;
    };
    has_done_therapy_: boolean;
    payment_method: string;  // remove extra space you had 😬
    pronouns: string;        // remove extra space too
    session_format: string;
    therapist_gender_preference: string;
    therapy_reasons: string;
  }
  
  interface CallData {
    patientData: PatientData;
    structuredData: StructuredData;
  }