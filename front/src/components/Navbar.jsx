import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton'

const Text = styled(Typography)`
	font-size: 23px;
	font-weight: 700;
	color: #00737d;
`;

export default function Bar() {
	return (
		<AppBar position='static' style={{ backgroundColor: 'white' }}>
			<Toolbar variant='dense'>
				<IconButton>
					<img src='logo.bmp' alt='logo' />
				</IconButton>
				<Text variant='h6' color='inherit' component='div'>
					Tasks
				</Text>
			</Toolbar>
		</AppBar>
	);
}
