import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/home.css';

function LoggedInStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('http://localhost:3000/isLoggedIn');
      setIsLoggedIn(response.data.isLoggedIn);
      setUsername(response.data.username);
	  setLoading(false);
    } catch (error) {
      console.error('Error checking login status:', error);
	  setLoading(false);
    }
  };

  if (loading) {
	return <div className='login_status' style={{color: "green"}}>
		Loading
	</div>
  }

  return (
    <div className='login_status'>
      {isLoggedIn ? (
        <div style={{color: "var(--accent-color-lightblue)"}}>
			{username} Logged In
		</div>
      ) : (
        <div style={{color: "var(--accent-color-lightred)"}}> Not Logged In </div>
      )}
    </div>
  );
}

export default LoggedInStatus;