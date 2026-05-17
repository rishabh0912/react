import './App.css';
import Navbar from './Components/Navbar';
import TextForm from './Components/TextForm';
import About from './Components/About';
import React, {useState} from 'react'
import Alert from './Components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not

  const [alert, setAlert] = useState(null);

  const [theme, setTheme] = useState('light');

  const showAlert = (message, type) =>{
    setAlert( {
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    },1500)
  }

  const themes = {
    light: { bg: 'white', text: '#042743', navbar: 'light' },
    dark: { bg: '#042743', text: 'white', navbar: 'dark' },
    blue: { bg: '#1a237e', text: 'white', navbar: 'dark' },
    green: { bg: '#1b5e20', text: 'white', navbar: 'dark' },
  }

  const toggleMode = () => {
    if(mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark mode has been enabled", "success");
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
    }
  }
  return (
    <Router>
      <Navbar title="TextUtils" about="About" themes={themes} currentTheme={theme} setTheme={setTheme}/>
      <Alert alert={alert}/>
      <div className="container my-3">
        <Routes>
          <Route path='/about' element={<About theme={themes[theme]}/>}/>
          <Route path='/' element={<TextForm heading="Enter your text here" theme={themes[theme]} showAlert={showAlert}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
