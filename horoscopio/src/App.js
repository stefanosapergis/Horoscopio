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


  // const imgPath = require(`./images/${znakZodiaku}/01.png`)
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


  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Losowanie liczby od 1 do 3
  const randomValue = getRandomNumber(1, 3);
  const path = `../public/images/${znakZodiaku}/0${randomValue}.png`;
  const imgPath = require(`../public/images/${znakZodiaku}/0${randomValue}.png`)



  function pobierzKolorSredni(obrazekUrl) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const obrazek = new Image();

    return new Promise((resolve, reject) => {
      obrazek.onload = function () {
        canvas.width = obrazek.width;
        canvas.height = obrazek.height;

        context.drawImage(obrazek, 0, 0, obrazek.width, obrazek.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        let sumaR = 0;
        let sumaG = 0;
        let sumaB = 0;

        for (let i = 0; i < pixels.length; i += 4) {
          sumaR += pixels[i];
          sumaG += pixels[i + 1];
          sumaB += pixels[i + 2];
        }

        const sredniKolor = {
          r: Math.round(sumaR / (pixels.length / 4)),
          g: Math.round(sumaG / (pixels.length / 4)),
          b: Math.round(sumaB / (pixels.length / 4)),
        };

        resolve(sredniKolor);
      };

      obrazek.onerror = function (error) {
        reject(error);
      };

      obrazek.src = obrazekUrl;
    });
  }

  // Przykład użycia
  const obrazekUrl = 'sciezka/do/twojego/obrazka.png';

  pobierzKolorSredni(path)
    .then((sredniKolor) => {
      alert('Średni kolor:', sredniKolor);
    })
    .catch((error) => {
      console.error('Błąd podczas pobierania koloru:', error);
    });


  console.log('dzien number: ', day)

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    // Dodaj dodatkowe style według potrzeb
  };

  const textContainerStyle = {
    backgroundImage: `url(${imgPath})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center', // Wyśrodkuj tło
    padding: '20px', // Dodaj padding, aby tekst nie przyklejał się bezpośrednio do tła
    color: '#fff',
    border: 10,
    height: '100%',
    alignItems: 'center',
    display: 'flex'

  };

  const horoskopStyle = {
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    padding: '10px',
    fontSize: '35px',
    height: '100%', // Ustawienie wysokości na 200
    display: 'flex',
    alignItems: 'center', // Wyśrodkuj w poziomie
    fontFamily: 'Lora, serif', // Dodaj czcionkę Lora i fallback na serif
    flexDirection: 'column',
    justifyContent: 'space-between'

  }

  const imageContainerStyle = {
    // Dodaj style dla kontenera obrazu
  };

  // Dodaj media queries, aby dostosować styl do różnych rozmiarów ekranu
  const mediaQueryStyle = {
    '@media screen and (min-width: 768px)': {
      flexDirection: 'row',
      height: '100%'
    },
  };

  return (
    <div style={{ ...containerStyle, ...mediaQueryStyle }}>
      <div style={textContainerStyle}>
        <div style={horoskopStyle}>
          <h2 style={{ fontSize: '30px', textTransform: 'uppercase' }}> {name}</h2>
          <div style={{ textAlign: 'center' }}>{generujHoroskop(day, znakZodiaku, sex)}</div>
          <div style={{ fontSize: '30px', textTransform: 'uppercase' }}>{znakZodiaku}</div>
        </div>
      </div>
    </div>
  );
}

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
