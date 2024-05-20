import React from "react";
import { Popover } from "@material-ui/core";
import {Typography} from "@material-ui/core";

function LoginPopover({open, handleClose}) {
	const anchorEl = open? document.body: null;	

	return(
		<Popover
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			style={{width: '200px', fontFamily: 'var(--font-family-design)'}}>
      		<Typography>The user has been successfully logged in.</Typography>
    	</Popover>
	);
};

export { LoginPopover }; 