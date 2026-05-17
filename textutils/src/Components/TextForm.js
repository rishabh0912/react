import React, {useState} from 'react'


export default function TextForm(props) {
  const handleUpperCaseClick = () => {
   // console.log("UpperCase was clicked" + text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to UpperCase!", "success");
  }

  const handleLowerCaseClick = () => {
    let newTextLC = text.toLowerCase();
    setText(newTextLC);
    props.showAlert("Converted to LowerCase!", "success");
  }

  const handleInverseCaseClick = () => {
    let newTextIC = text.split("").map((char) => {
        if (char === char.toUpperCase()) {
            char = char.toLowerCase();
            return char;
        } else {
            char = char.toUpperCase();
            return char;
        }
    })
    console.log(newTextIC);
    setText(newTextIC.join(""));
    props.showAlert("Converted to Inverse Case!", "success");
  }

  const handleOnChange = (event) => {
    //console.log("On Change");
    setText(event.target.value);
  }

  const [text, setText] = useState('');
  // text = "New text"; // Wrong way to change the state
  // setText("New text"); // Correct way to change the state
  return (
    <>
        {/* <div className="container mb-3" style={{color: props.mode === 'dark' ? 'white' : '#042743'}}> */}
        <div className="container mb-3" style={{color: props.theme.text}}>
            <h1>{props.heading}</h1>
            {/* <textarea className="form-control" style={{backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743'}} value={text} onChange={handleOnChange} id="mybox" rows="8"></textarea> */}
            <textarea className="form-control" style={{backgroundColor: props.theme.bg, color: props.theme.text}} value={text} onChange={handleOnChange} id="mybox" rows="8"></textarea>
            <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleUpperCaseClick}>Convert to UpperCase</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleLowerCaseClick}>Convert to LowerCase</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleInverseCaseClick}>Convert to Inverse Case</button>
        </div>
        {/* <div className="container my-3" style={{color: props.mode === 'dark' ? 'white' : '#042743'}}> */}
        <div className="container my-3" style={{color: props.theme.text}}>
            <h2>Your text summary</h2>
            <p>{text.match(/\S+/g)?.length || 0} words and {text.length} characters</p>
            <p>{0.008 * text.match(/\S+/g)?.length || 0} Minutes read</p>
            <h2>Preview</h2>
            <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
        </div>
    </>
  )
}
