import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";

function App() {
  const [temp, settemp] = useState(0);
  const [feels_like, setfeels_like] = useState(0);
  const [max, setmax] = useState(0);
  const [min, setmin] = useState(0);
  const [humidity, sethumidity] = useState(0);
  const [img, setimg] = useState();
  const my = useRef("Delhi");

  let Weather = () => {
    const temp = my.current.value;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=";
    url = url + temp + "&units=metric&appid=bb16c5275f7a3c1439973f71e4dc811f";
    axios
      .get(url)
      .then((response) => {
        var t = "Temperature:" + String(response.data.main.temp);
        var i = "http://openweathermap.org/img/wn/";
        i = i + String(response.data.weather[0].icon) + ".png";
        var fl = "Feels like:" + String(response.data.main.feels_like);
        var ma = "Max Temp:" + String(response.data.main.temp_max);
        var mi = "Min Temp:" + String(response.data.main.temp_min);
        var hum = "Humidity:" + String(response.data.main.humidity) + "%";
        settemp(t);
        setimg(i);
        setfeels_like(fl);
        setmax(ma);
        setmin(mi);
        sethumidity(hum);
      })
      .catch((error) => {
        settemp("City not Found");
        setimg(null);
        setfeels_like(0);
        setmax(0);
        setmin(0);
        sethumidity(0);
      });
  };

  let check = () =>{
    alert("right");
  };

  return (
    <>
      <div className="container">
        <div className="text-center input-group" onKeyDown={Weather}>
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search City"
            aria-label="Search"
            aria-describedby="search-addon"
            ref={my}
          />
          <button type="button" className="btn btn-warning" onClick={Weather}>
            Search
          </button>
        </div>
        <div className="card">
          <img src={img} className="rounded" alt="img" />
          <div className="card-body">
            <h5 className="card-title">{my.current.value}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{temp}</li>
            <li className="list-group-item">{feels_like}</li>
            <li className="list-group-item">{max}</li>
            <li className="list-group-item">{min}</li>
            <li className="list-group-item">{humidity}</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
