import { useState,useEffect } from 'react'
import {vapi,startAssistant,stopAssistant} from "./ai"
import { PhoneOff  } from 'lucide-react';
import './app.css'
function App() {
 /* useEffect(()=>{
    startAssistant()
  },[])*/
  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [callingSophie, setCallingSophie] = useState(true)
  const [assistantSpeaking, setAssistantSpeaking] = useState(false)
  const [callId, setCallId] = useState("")
  const [callResult, setCallResult] = useState(null)

  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(()=>{
    vapi.on("call-start",()=>{
		setStarted(true)
		setCallingSophie(false)
	}).on("call-end",()=>{
		setStarted(false)
		setLoading(false)
	}).on("speech-start",()=>{
		setAssistantSpeaking(true)
	}).on("speech-end",()=>{
		setAssistantSpeaking(false)
	})
  },[])

  const handleStart= async() => {
	setLoading(true)
	const data = await startAssistant();
	setCallId(data.id)
  }
  const handleStop =()=>{
	stopAssistant()
  }
  const showForm = !started && !loading
  return (
	<div className="main">  
	{showForm && (<div className="signup">
	  <form>
		<label className="sophie" aria-hidden="true">
			<div className="sophie-text">
			<p className="sophie-title">Talk to Sophie, your virtual assistant 👩‍⚕️</p>
		<p className="sophie-subtext">Need help booking your therapy session? Sophie will ask a few quick questions to help you.</p></div></label>
		<input type="email" name="email" placeholder="Email"  required />
		<input type="number" name="phone" placeholder="Phone Number" required />
	
		<button onClick={handleStart}>Sign up</button>
		
	  </form>
	</div>)}	

	
	{loading && <div className="login">
	<div className="call-ui">
		<div className={`pulse-circle ${assistantSpeaking ? 'active' : ''}`} ></div>
		{callingSophie && <p className="call-text">Calling Sophie... 👩‍⚕️</p>}
		
		<p className="call-text">{assistantSpeaking ? "Sophie is speaking" : "Sophie is Not Speaking"}</p>
		<p className="call-subtext">Hang tight, she’s preparing your session 🧠💬</p>

		<button className="call-btn" onClick={handleStop}>
      <PhoneOff  className="icon" />
      End Call
    </button>
	</div>
	</div>
	}
  </div>
 
)
}

export default App

