import { useState,useEffect } from 'react'
import {vapi,startAssistant,stopAssistant} from "./ai"
import './app.css'
function App() {
 /* useEffect(()=>{
    startAssistant()
  },[])*/
  const [count, setCount] = useState()

  return (
	<div className="main">  	
	<input type="checkbox" id="chk" aria-hidden="true" />
  
	<div className="signup">
	  <form>
		<label className="sophie" aria-hidden="true">
			<div className="sophie-text">
			<p className="sophie-title">Talk to Sophie, your virtual assistant 👩‍⚕️</p>
		<p className="sophie-subtext">Need help booking your therapy session? Sophie will ask a few quick questions to help you.</p></div></label>
		<input type="email" name="email" placeholder="Email" required />
		<input type="number" name="phone" placeholder="Phone Number" required />
		<button>Sign up</button>
	  </form>
	</div>
  
	<div className="login">
  <div className="call-ui">
    <div className="pulse-circle" ></div>
    <p className="call-text">Calling Sophie... 👩‍⚕️</p>
    <p className="call-subtext">Hang tight, she’s preparing your session 🧠💬</p>
  </div>
</div>

  </div>
  
)
}

export default App

