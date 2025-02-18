import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

import "../UserPage/indexUser.css";
import "../../App";

const User = () => {
  const history = useHistory()
  const idData = history.location.state

  const [getInput, setGetInput] = useState({ description: "", amount: "", date: "", id: idData });
  const [getName, setGetName] = useState();
  const [getData, setGetData] = useState<any[]>([])
  let array: any[] = []

  //pegar nome pelo id do usuario
  useEffect(() => {
    api.get('/').then(response => {
      for (let i = 0; i < response.data.length; i++) {
        if (JSON.stringify(response.data[i].id) === JSON.stringify(getInput.id)) {
          const nameApi = response.data[i].name;
          const name = (nameApi.substr(0, nameApi.indexOf('@')))
          setGetName(name)
          return
        }
      }
    });
  }, []);

  //buscar dados da tabela 'balance'
  useEffect(() => {
    api.get('balance').then(response => {
      for (let i = 0; i < response.data.length; i++) {
        if (JSON.stringify(response.data[i].idData) === JSON.stringify(getInput.id)) {
          const { id, transaction_name, value, date, id_data } = response.data[i];
          var newDate = formatDate(date);

          array.push([id, transaction_name, value, newDate])
          // setGetData([...getData,{transaction_name, value, date}])         
        }
      }
      //console.table(array)
      setGetData(array)

    });
  }, [])

  function deleteValues(index: number) {
    api.delete(`/balance/${index}`)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function formatDate(date: string) {
    const splitDate = date.split("-")
    return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
  }

  function saveData(event: FormEvent) {
    event.preventDefault()

    api.post('/balance', getInput)
    alert('Data saved successfully!')
    //history.push('/')
    window.location.reload()
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setGetInput({ ...getInput, [name]: value });
  }

  function open() {
    let visible = document.getElementById('modal-overlay')
    visible?.classList.add('active')
  }

  function close() {
    let invisible = document.getElementById('modal-overlay')
    invisible?.classList.remove('active')
  }

  return (
    <div className="main">
      <form action="" onSubmit={saveData}>
        <h1>Hello, {getName}</h1>
        <small className="info">Please, fill in the inputs with your information</small>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="description"
            name="description"
            placeholder="Descricao"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="amount">Value</label>
          <input
            onChange={handleInputChange}
            type="number"
            step="0.01"
            id="amount"
            name="amount"
            placeholder="0.00"
            required
          />
          <small className="help">
            Use o sinal - (negativo) e . (ponto) para casas decimais
          </small>
        </div>
        <div className="input-group">
          <label htmlFor="date">Date</label>
          <input
            onChange={handleInputChange}
            type="date"
            id="date"
            name="date"
            required
          />
        </div>
        <div className="lk">
          <button type="submit" className="btn">
            Save data
          </button>
          <button type="button" className="btn" onClick={() => open()}>
            Show saved data
          </button>
          <Link to="/" id="lk1">
            <strong>Log out</strong>
            <span>
              <FiArrowLeft />
            </span>
          </Link>
        </div>
      </form>
      <div className="modal-overlay" id="modal-overlay">
        <div className="modal">
          <section>
            <table id="data-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Value</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {getData.map((item, index) =>
                  <tr key={index}>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                    <td>{item[3]}</td>
                    <td id="delete" onClick={() => deleteValues(item[0])}>Delete</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
          <button type="button" className="btn" onClick={() => close()}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;