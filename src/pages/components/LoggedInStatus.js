import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/home.css';

function LoggedInStatus( {status, user} ) {

  return (
    <div className='login_status'>
      {status ? (
        <div style={{color: "var(--accent-color-lightblue)"}}>
			{user}
		</div>
      ) : (
        <div style={{color: "var(--accent-color-lightred)"}}> Not Logged In </div>
      )}
    </div>
  );
}

export default LoggedInStatus;