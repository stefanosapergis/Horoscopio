import React, { useState } from "react";
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

  return (
    <div>
      <h2>Your Horoscope Page</h2>
      <p>Name: {name}</p>
      <p>Sex: {sex}</p>
      <p>
        Date of Birth: {day}-{month}-{year}
      </p>
      Add your horoscope content here
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
          <option value="female">Kobieta</option>
          <option value="male">Mężczyzna</option>
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
