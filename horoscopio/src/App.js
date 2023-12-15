import React, { useState } from "react";
import horoscopes from './json/horoscopes.json';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";

const HoroscopePage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const name = searchParams.get("name");
  const sex = searchParams.get("sex");
  const day = searchParams.get("day");
  const year = searchParams.get("year");
  const month = searchParams.get("month");
  
  const randomNumber = Math.floor(Math.random() * 10) + 1;


  
  function getZodiacSign(dayS, monthS) {
    
    const day = +dayS;
    const month = +monthS;

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      return "Baran";
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      return "Byk";
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      return "Bliźnięta";
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
      return "Rak";
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      return "Lew";
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      return "Panna";
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
      return "Waga";
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
      return "Skorpion";
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      return "Strzelec";
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      return "Koziorożec";
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      return "Wodnik";
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      return "Ryby";
    } else {
      // Handle invalid input or edge cases
      return "Nieprawidłowa data";
    }
  }
  
 
  
  const znakZodiaku = getZodiacSign(day, month);

  
  function generujHoroskop(dzienRoku, znakZodiaku, plec) {
    const horoskopy = horoscopes;
  

const znalezionyHoroskop = horoskopy.find(
  element => element.znak_zodiaku === znakZodiaku && element.dzien_roku === randomNumber
);
    if (znalezionyHoroskop) {
      return znalezionyHoroskop.horoskop;
    } else {

      
      return "Brak horoskopu dla podanych parametrów.";
    }
  }
  
  // Przykłady użycia:
  
  // ... dodaj inne przypadki, aby sprawdzić poprawność dla różnych dni, znaków zodiaku i płci
  

  return (
    <div>
      <h2>Your Horoscope Page</h2>
      
      

     
     {generujHoroskop(day, znakZodiaku, sex)}
      
      {/* Add your horoscope content here */}
      {
      // 1. import the horoscope file
      // 2. show the first item with horoscope
      // 3. generate number from 1 tov 1


      // 4. based on the date of birth find the type of the zodiac sign
      // 5. use parameter sex
      // 6. filter table based on the parameters
      }
    </div>
  );
};

const HoroscopeForm = () => {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [dob, setDob] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const navigate = useNavigate();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  };

  const selectStyle = {
    ...inputStyle,
    height: "40px", // Ustaw wysokość selectów, aby była taka sama jak dla inputów
  };

  return (
    <div className="form-container">
      <label>
        Name:
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
      </label>
      <label>
        Sex:
        <select
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          style={selectStyle}
        >
          <option value="">Select your sex</option>
          <option value="kobieta">Kobieta</option>
          <option value="mężczyzna">Mężczyzna</option>
        </select>
      </label>
      <label>
        Date of Birth:
        <div>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            style={selectStyle}
          >
            <option value="">Day</option>
            {Array.from({ length: 31 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={selectStyle}
          >
            <option value="">Month</option>
            {months.map((month, index) => (
              <option key={index + 1} value={index + 1}>
                {month}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={selectStyle}
          >
            <option value="">Year</option>
            {Array.from({ length: 105 }, (_, index) => (
              <option key={index + 1920} value={index + 1920}>
                {index + 1920}
              </option>
            ))}
          </select>
        </div>
      </label>

      <button
        onClick={() =>
          navigate(
            `/horoscope?name=${name}&sex=${sex}&day=${day}&month=${month}&year=${year}`
          )
        }
      >
        Dalej
      </button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HoroscopeForm />} />
          <Route path="/horoscope" element={<HoroscopePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
