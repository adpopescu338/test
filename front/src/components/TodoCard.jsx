import { useData } from './Context';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton'
import {deleteTodo, editName, completeTodo, unComplete } from '../APIs'
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Moment from 'moment';
import Typography from '@mui/material/Typography';
   
const TodoCard = styled.div`
	border-radius: 3px;
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
	background-color: white;
   padding:  5px 30px 10px 0px;
   width: 500px;

`;

const Todo = ({todo}) => {
 const { refresh } = useData();


   return (
				<TodoCard>
					<Grid item xs>
						<IconButton
							onClick={() => {
								deleteTodo(todo.id);
								refresh();
							}}
						>
							<DeleteForeverIcon color='error' />
						</IconButton>
					</Grid>
					<Grid container direction='row' style={{ justifyContent: 'space-between' }}>
						<EditableName id={todo.id} name={todo.name} refresh={refresh} />
						<CheckBx id={todo.id} refresh={refresh} />
					</Grid>
					<Divider style={{ marginLeft: '30px' }} />
					<Grid style={{ padding: '10px 30px 0px 30px', justifyContent: 'space-between' }} container direction='row'>
						<Typography variant='body2'>Created: {Moment(todo.created_at).format('d-MMM-YYYY-hh:mm')}</Typography>
						{todo.completed_at && (
							<Typography variant='body2'>Completed: {Moment(todo.completed_at).format('d-MMM-YYYY-hh:mm')}</Typography>
						)}
					</Grid>
				</TodoCard>
			);
};
export default Todo;

const EditableName = ({ id, name, refresh }) => (
	<div
		onInput={e => {
			editName(id, e.target.textContent);
			refresh();
		}}
		contentEditable
		style={{
			fontSize: '22px',
			fontWeight: '600',
			textIndent: '35px',
			display: 'flex',
			justifyContent: 'space-between',
		}}
	>
		{name}
	</div>
);
         
const CheckBx = ({ id, refresh }) => <Checkbox onChange={ (e, checked) => {
   checked ? completeTodo(id) : unComplete(id)
   refresh()
} } />;