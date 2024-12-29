import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  
  const[length, setLength] = useState(8)
  const[number, setNumber] = useState(false)
  const[Characters, setCharacters] = useState(false)
  const[password, setPassword] = useState("")

  const passGenerator = useCallback(()=>{
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if(number) str += "1234567890" 
      if(Characters) str += "@#$%^&*_-=+`~?><,"

      for( let i=1; i <= length; i++){
         let char = Math.floor(Math.random()*str.length+1)
         pass += str.charAt(char)
      }

      setPassword(pass)
  },[length, number, Characters])
   
  const passwordRef = useRef(null)

  const passCopyToClipboard = useCallback(()=>{
    passwordRef.current?.select() 
    passwordRef.current?.seetSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  },[passGenerator])
  
  
  useEffect(()=> {
     passGenerator()
  },[length, number, Characters, setPassword])




  

  return (
    <div className='container'>
      <h1>Password Generator</h1>
      <div className="inputField">
         <input 
         value={password}
         readOnly
         placeholder='Password'
         type="text" 
         ref={passwordRef}
         />
         <button onClick={passCopyToClipboard}>Copy</button>
      </div>
      <div className="inputs">
        <input 
        className='range' 
        type="range"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        />
        <label htmlFor="">:Length({length})</label>
        <input 
        type="checkbox" 
        defaultChecked={number}
        min={6}
        max={99}
        onChange={() => setNumber((prev) => !prev)}
        />
        <label htmlFor="">Numbers</label>
        <input 
        defaultChecked={Characters}
        onChange={()=> setCharacters((prev) => !prev)}
        type="checkbox" />
        <label htmlFor="">Characters</label>

      </div>
    </div>
  )
}

export default App
