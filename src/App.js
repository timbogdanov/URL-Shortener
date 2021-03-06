import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import './App.css';

function App() {
  const [inputValue, setInputvalue] = useState('');
  const [urlArray, setUrlArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setInputvalue({ ...inputValue, [e.target.name]: e.target.value });
    console.log(inputValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post('https://rel.ink/api/links/', { url: inputValue.url })
      .then((data) => {
        const newUrl = data.data.hashid;
        setUrlArray([...urlArray, newUrl]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Router>
      <div className='App'>
        <div className='app-wrapper'>
          <h1>URL Shortener</h1>
          <p>Secure and reliable short links via rel.ink</p>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Enter URL to Shorten &crarr;'
              onChange={handleChange}
              name='url'
              value={inputValue.url}
            />
            <div className='loading-container'>
              {isLoading ? <img src='https://rel.ink/gxx1Gm' alt='' /> : ''}
            </div>
          </form>

          <div className='url-data'>
            <div className='url-link'>
              {urlArray.map((urlShorted) => (
                <div className='link'>
                  <a
                    target='blank'
                    className='urlname'
                    href={`https://rel.ink/${urlShorted}`}
                  >
                    <img className='loading' src='' alt='' />
                    https://rel.ink/{urlShorted}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
