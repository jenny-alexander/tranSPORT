import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import './Header.css';

function Header(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [name, setName] = useState('');

  return (
      <div>
          <header className='App-header'>
              <h1 className='App-title'>Welcome to tranSPORT!</h1>
          </header>
      </div>
  )
}

export default Header;
