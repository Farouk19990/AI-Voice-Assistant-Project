import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';
import axios from 'axios';
import { startAssistant, stopAssistant, vapi } from 'src/ai';

import { Form } from 'react-router-dom';
import './sign-in-viex-style.css'
import { PhoneOff } from 'lucide-react';

// ----------------------------------------------------------------------

export function SignInView() {

  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [callingSophie, setCallingSophie] = useState(true)
  const [assistantSpeaking, setAssistantSpeaking] = useState(false)


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

  const handleStart = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); // 🛑 No form reload bro
  
    setLoading(true);
    console.log(email,phone)

      // 💌 Talk to the backend
      const response = await axios.post<{ allowed: boolean; message: string }>('http://localhost:5000/check-patient', {
        email,
        phone,
      });
  
      const { allowed, message } = response.data;
      console.log("ALLOWED ?",response.data)
      if (!allowed) {
        alert(message || "You already called today! Please come back tomorrow 🤓");
        setLoading(false);
        return;
      }
  
      // 🚀 Start the assistant adventure
      const data = await startAssistant();

  
      await axios.post('http://localhost:5000/signup', {
        email,
        phone,
        call_id: data!.id,
      });
  
      setLoading(true);
  };
  

  const handleStop =()=>{
	stopAssistant()
  }
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
  };
  
  const showForm = !started && !loading

  const router = useRouter();


  const handleSignIn = useCallback(() => {
    router.push('/');
  }, [router]);

  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      {showForm && (  <Form>
      <TextField
        fullWidth
        name="email"
        label="Email address"
        onChange={handleInputChange(setEmail)}
        defaultValue="hello@gmail.com"
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <TextField
        fullWidth
        name="phone"
        label="phone"
        sx={{ mb: 3 }}
        onChange={handleInputChange(setPhone)}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleStart}
      >
        Sign in
      </Button>
      </Form>)}
      {loading && <div className="login">
	<div className='call-ui'>
		<div className={`pulse-circle ${assistantSpeaking ? 'active' : ''}`} />
		{callingSophie && <p>Calling Sophie... 👩‍⚕️</p>}
		
		<p>{assistantSpeaking ? "Sophie is speaking" : "Sophie is Not Speaking"}</p>
		<p>Hang tight, she’s preparing your session 🧠💬</p>

		<button className="call-btn" onClick={handleStop}>
      <PhoneOff  className="icon" />
      End Call
    </button>
	</div>
	</div>
	}
    
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Talk to Sophie, your AI assistant 👩‍⚕️</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Need help booking your therapy session? Sophie will ask a few quick questions to help you.
        </Typography>
      </Box>
      {renderForm}
    </>
  );
}



