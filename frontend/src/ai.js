import Vapi from "@vapi-ai/web";

export const vapi = new Vapi(import.meta.env.VITE_VAPI_API_KEY)
const assistantId = import.meta.env.VITE_ASSISTANT_ID

export const startAssistant = async(full_name,age,has_done_therapy_before,therapy_reasons,therapist_gender_preference,session_format,availability,payment_method)=>{
    return vapi.start(assistantId)
}

export const stopAssistant= () =>{
    vapi.stop()
}