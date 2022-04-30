import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header'

import './register.css'

const Register = () => {

  let navigator = useNavigate();

  useEffect(() =>{
    if (localStorage.getItem('user-info')) {
      navigator('/');
    }
  },)

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  

  async function signUp(){
    let data = {name, email, password};
    // console.warn(data);
    let result = await fetch("http://localhost:8000/api/register",{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });

    result = await result.json();
    if (result.hasOwnProperty("error")) {
      /* DISPLAY AN ERROR */
      const divError = document.getElementById('error');
      divError.textContent = result.error;
      // alert(result.error);

      // const message = JSON.stringify(result);
      // console.log(JSON.parse(message).error);
    }else{
      // console.warn("data" + result);
      localStorage.setItem("user-info", JSON.stringify(result));
      navigator('/');
    }
  }

  return (
    <div className='parent'>
      <Header />
      <h1>Get registered</h1>
        <div id='error' className='mt-2 mb-5'></div>

        <div className="form-elements col-sm-6 offset-sm-3">
          <input type="text" className='form-control' placeholder='Name' 
            onChange={(e) => setName(e.target.value)} name={name} />
          <input type="email" className='form-control' placeholder='Email' 
            onChange={(e) => setEmail(e.target.value)} name={email} />
          <input type="password" className='form-control' placeholder='Password' 
            onChange={(e) => setPassword(e.target.value)} name={password} />

          <button className='btn btn-primary' onClick={signUp}>Register</button>
        </div>
    </div>
  )
}

export default Register