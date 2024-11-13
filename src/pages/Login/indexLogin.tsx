import React, { useState, ChangeEvent, FormEvent } from "react";
import api from '../../services/api';
import { Link, useHistory } from "react-router-dom";
import { FiArrowRight } from 'react-icons/fi'

import "../../App.css";
import "../Login/indexLogin.css";


const Login = () => {
  //let visible = document.getElementById("btn")  
  const history = useHistory()
  
  const [getInput, setGetInput] = useState({ name: "", password: "" });
  
  function getTable(event: FormEvent) {
    event.preventDefault();

    api.get("/").then((response) => {
      const user = response.data.filter((
        login: { name: string; password: string; }) => 
          JSON.stringify(login.name) === JSON.stringify(getInput.name) &&
          JSON.stringify(login.password === JSON.stringify(getInput.password))
      );

      if (user.length > 0) {
        const id = user[0].id;

        alert("Login success!");

        history.push({
          pathname: 'user-page',
          state: id
        });
      } else {
        alert("User not found! Please create your login.");
      }
    }).catch(function (err) {
      console.log(err);
      alert("Connection error: server not found.");
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
      <form action="" onSubmit={getTable}>
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