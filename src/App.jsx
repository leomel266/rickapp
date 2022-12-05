import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import ErrorFetch from "./components/ErrorFetch";
import LocationInfo from "./components/LocationInfo";
import ResidentCard from "./components/ResidentCard";

function App() {
  const [location, setLocation] = useState();
  const [locationInput, setLocationInput] = useState();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let URL;

    if (locationInput) {
      URL = `https://rickandmortyapi.com/api/location/${locationInput}`;
    } else {
      const randomIdLocation = Math.floor(Math.random() * 126) + 1;
      URL = `https://rickandmortyapi.com/api/location/${randomIdLocation}`;
    }
    axios
      .get(URL)
      .then((res) => {
        setLocation(res.data);
        setHasError(false);
      })
      .catch((err) => {
        setHasError(true);
        console.log(err);
      });
  }, [locationInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocationInput(e.target.inputSearch.value);
  };

  return (
    <div className='App'>
      <img
        className='header__img'
        src='https://deadline.com/wp-content/uploads/2021/03/RM_S5_PR-e1617069027251.png'
        alt=''
      />
      <form className='header__form' onSubmit={handleSubmit}>
        <input
          className='header__form-input'
          id='inputSearch'
          placeholder='Put ID 1 to 126'
          type='text'
        />
        <button className='header__form-btn'>Search</button>
      </form>
      {hasError ? (
        <ErrorFetch />
      ) : (
        <>
          <LocationInfo location={location} />
          <div className='residents-container'>
            {location?.residents.map((url) => (
              <ResidentCard key={url} url={url} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
