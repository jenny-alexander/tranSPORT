import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <header className='App-header'>
        <h1 className='App-title'>Register Yourself</h1>
      </header>
      <RegisterForm />

      <Container 
        justifyContent="center"
        alignItems="flex-end"
      >
        <Button variant="contained" fullWidth
                onClick={()=>{
                  history.push('/login');
                }}>Back to Login
        </Button>
      </Container>   

      {/* <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Back to Login
        </button>
      </center> */}
    </div>
  );
}

export default RegisterPage;
