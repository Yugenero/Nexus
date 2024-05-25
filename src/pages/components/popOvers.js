import React from "react";
import { Popover, colors } from "@material-ui/core";
import {Typography} from "@material-ui/core";
import {Box} from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
	palette: {
	  accent: {
		darkred: '#8b0000', // replace with your actual color
	  },
	},
  });

function LoginPopover({open, handleClose}) {
	const anchorEl = open ? document.body: null;	
	return(
		<Popover
			open={open} // if true open the popover
			anchorEl={anchorEl}
			onClose={handleClose} // set open to false
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			elevation={1}
			>
      		<Box sx={{ p: 2, bgcolor: 'accent.darkred' }}> 
				<Typography style={{fontFamily: 'var(--font-family-gt)'}}>Log in successful</Typography>
  			</Box>
    	</Popover>
	);
};

function LoginFailedPop({open, handleClose, errorMessage}) {
	const anchorEl = open? document.body: null;	

	return (
		<Popover
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			elevation={1}
			>
      		<Box sx={{ p: 2, bgcolor: 'accent.darkred' }}> 
				<Typography style={{fontFamily: 'var(--font-family-gt)'}}>{errorMessage}</Typography>
  			</Box>
    	</Popover>
	)
}

function RegistrationFailedPop({open, handleClose, errorMessage}) {

	return (
		<Popover
			open={open}
			onClose={handleClose}
			anchorPosition={{top: 0, left: 0}}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			
			}}

			elevation={1}>
			<Box sx={{ p: 2, bgcolor: 'accent.darkred', color: 'secondary'}}> 
				<Typography style={{fontFamily: 'var(--font-family-gt)'}}>{errorMessage}</Typography>
			</Box>
		</Popover>
	)
}


export { LoginPopover, RegistrationFailedPop, LoginFailedPop }; 