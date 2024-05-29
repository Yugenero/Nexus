import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LoggedInStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('http://localhost:3000/isLoggedIn');
      setIsLoggedIn(response.data.isLoggedIn);
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>{username} is logged in</div>
      ) : (
        <div>You are not logged in</div>
      )}
    </div>
  );
}

export default LoggedInStatus;