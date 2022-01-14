

import React, { useState, ChangeEvent, FormEvent } from "react";
import api from '../../services/api';
import { Link, useHistory } from "react-router-dom";
import { FiArrowRight } from 'react-icons/fi'

import "../Login/indexLogin.css";


const Login = () => {
  //let visible = document.getElementById("btn")  
  const history = useHistory()
  
  const [getInput, setGetInput] = useState({ name: "", password: "" });
  
  function getTable(event: FormEvent) {
    event.preventDefault();

    api.get("/").then((response) => {
      //console.log(response.data[0].password)
      //console.log(response.data);
      //console.log(getInput)
      
      for (let i = 0; i < response.data.length; i++) {
        //if (JSON.stringify(response.data[i]) === JSON.stringify(getInput)) {
        if (JSON.stringify(response.data[i].name) === JSON.stringify(getInput.name) &&  JSON.stringify(response.data[i].password) === JSON.stringify(getInput.password)) {
          const id = response.data[i].id
          //const name = response.data[i].name
          alert("Login success!");
          //window.location.reload()

          history.push({
            pathname: 'user-page',
            state: id
          })
          return;
        }
      }
      alert("E-mail and password don't match!");
      //visible?.classList.remove('invisible')
    });
  }
  
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    //console.log(event.target.name, event.target.value)
    const { name, value } = event.target;
    //console.log(name, value)
    setGetInput({ ...getInput, [name]: value });
  }
  
  // function createLogin() {    
  //   history.push('/main-page')

  //   if (!validateEmail(getInput.name) || getInput.password === '' || getInput.name === '') {
  //     alert('Please, type a valid e-mail and password')
  //   }
  //   else {
  //     //api.post("/", getInput);
  //     alert("Login created successfully!");
  //     visible?.classList.add('invisible')
  //   }
  // }
  
  // function validateEmail(email: string): boolean {
  //   var re = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  //   return re.test(email);
  // }


  return (
    <div className="boxStyle">
      <form action="" className="data" onSubmit={getTable}>
        <input
          onChange={handleInputChange}
          name="name"
          type="email"
          placeholder="Enter your e-mail"
          className="styleInput"
          required
          />
        <input
          onChange={handleInputChange}
          name="password"
          type="text"
          placeholder="Enter your password"
          className="styleInput"
          required
        />
        <button type="submit" className="styleLogin">
          Login
        </button>
        {/* <button type="reset" className="styleLogin invisible" id="btn" onClick={() => createLogin()}>
          Create Login
        </button> */}

        <div className="link">
          <Link to="/create-login" id="link1">
              <strong>Create Login</strong>
              <span>
                  <FiArrowRight/>
              </span>
          </Link>
        </div>
        
        <br/>

        <div className="link">
          <Link to="/delete-login" id="link1">
              Click here to delete login
              {/* <span>
                  <FiArrowRight/>
              </span> */}
          </Link>
        </div>

      </form>
    </div>
  );
};

export default Login;
