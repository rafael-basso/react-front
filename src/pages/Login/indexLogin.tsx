import React, { useState, ChangeEvent, FormEvent } from "react";
import api from '../../services/api';
import { Link, useHistory } from "react-router-dom";
import { FiArrowRight } from 'react-icons/fi'
import "../../App.css";
import "../Login/indexLogin.css";

const Login = () => {   
  const history = useHistory();  
  const [getInput, setGetInput] = useState({ name: "", password: "" });
  
  function getTable(event: FormEvent) {
    event.preventDefault();
        
    api.get("/").then((response) => {           
      for (let i = 0; i < response.data.length; i++) {        
        if (JSON.stringify(response.data[i].name) === JSON.stringify(getInput.name) &&  JSON.stringify(response.data[i].password) === JSON.stringify(getInput.password)) {
          const id = response.data[i].id          
          alert("Login success!");          

          history.push({
            pathname: 'user-page',
            state: id
          })
          return;
        }
      }
      alert("E-mail and password don't match!");      
    }).catch(function () {      
      alert("Connection error: server not found.");
    });
  }
  
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {    
    const { name, value } = event.target;  
    setGetInput({ ...getInput, [name]: value });
  }
 
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
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
