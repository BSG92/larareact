import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import './login.css'

const Login = () => {

  let navigator = useNavigate();

  useEffect(() =>{
    if (localStorage.getItem('user-info')) {
      navigator('/');
    }
  },)

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function signIn() {
    // console.warn(email + " " + password);
    let data = {email,password};

    let result = await fetch("http://localhost:8000/api/login", {
      method: 'POST',
      body : JSON.stringify(data),
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
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
    }else if(result.hasOwnProperty('message')){
      const divError = document.getElementById('error');
      divError.textContent = "500 Internal Server Error";
    }else{
      // console.warn("data" + result);
      localStorage.setItem("user-info", JSON.stringify(result));
      navigator('/add-product');
    }
  }

  return (
    <div>
      <Header />

      <h3>Sign in</h3>
      <br />
      
      <div id="error" className='mt-3 mb-5'></div>

      <div className="form-elements col-sm-6 offset-sm-3">
        <input type="text" placeholder='Email' className='form-control'
          onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' className='form-control' 
          onChange={(e) => setPassword(e.target.value)} />

        <button className='btn btn-primary' onClick={signIn}>Sign in</button>
      </div>
    </div>
  )
}

export default Login