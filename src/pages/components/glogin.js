import React, { useEffect } from "react";
import { GoogleLogin } from 'react-google-login';


const clientID = "1003989541364-doeegiq0q8s8q56heqj862ipmfqtqlhn.apps.googleusercontent.com";

function GLogin() {
	const onSuccess = (res) => {
		console.log('[Login Success] currentUser:', res.profileObj);
	};
	const onFailure = (res) => {
		console.log('[Login Failed] res:', res);
	};

	/**useEffect(() => {
		function start() {
			gapi.client.init({
				clientId: clientID,
				scope: ""
			})
		};

		gapi.load('client:auth2', start);
	});**/

	return(
		<div id="signInButton">
			<GoogleLogin
			className="google_login_button"
			clientID={clientID}
			buttonText="Sign in with Google"
			onSuccess={onSuccess}
			onFailure={onFailure}
			cookiePolicy={'single_host_origin'}
			isSignedIn={true}
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center'
			  }}
			/>
		</div>
	);
}

export default GLogin;
