import { useState, ChangeEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

import "../CreateLogin/indexCreateLogin.css";
import "../../App";

const CreateLogin = () => {
  const [getInput, setGetInput] = useState({ name: "", password: "" });
  const history = useHistory();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    //console.log(event.target.name, event.target.value)
    const { name, value } = event.target;
    //console.log(name, value)
    setGetInput({ ...getInput, [name]: value });
  }

  function createLogin() {
    if (!validateEmail(getInput.name) || getInput.password === "" || getInput.name === "") {
      alert("Please, type a valid e-mail and password");
      return;
    }

    api.get("/").then((response) => {
      const login = response.data.filter(
        (login: { name: string; }) => 
          JSON.stringify(login.name) === JSON.stringify(getInput.name)
      );

      if (login.length > 0) {
        alert("E-mail already taken");        
      } else {
        api.post("/", getInput);
        alert("Login created successfully!");
        history.push('/')
      }
    });
  }
  
  function validateEmail(email: string): boolean {
    var re = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    return re.test(email);
  }


  return (
    <div className="main-page">
      <form action="" className="data">
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
        <button
          type="button"
          className="styleLogin"
          onClick={() => createLogin()}
        >
          Create Login
        </button>         
                     
        <div className="link">
          <Link to="/" id="link1">
            <strong>Back</strong>
            <span>
              <FiArrowLeft />
            </span>
          </Link>
        </div>

      </form>
    </div>
  );
};

export default CreateLogin;
