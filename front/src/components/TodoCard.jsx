import { useData } from './Context';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { deleteTodo, editName, completeTodo, unComplete } from '../APIs';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Moment from 'moment';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const TodoCard = styled.div`
	border-radius: 3px;
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
	background-color: white;
	padding: 5px 30px 10px 0px;
	width: 30%;
	@media (max-width: 960px) {
		width: 45%;
	}
	@media (max-width: 650px) {
		width: 90%;
	}
`;

const Todo = ({ todo }) => {
	const { refresh } = useData();

	return (
		<TodoCard>
			<Grid item xs>
				<IconButton
					onClick={async () => {
						await deleteTodo(todo._id.$oid);
						await refresh();
					}}
				>
					<DeleteForeverIcon color='error' />
				</IconButton>
			</Grid>
			<Grid container direction='row' style={{ justifyContent: 'space-between' }}>
				<EditableName id={todo._id.$oid} name={todo.name} refresh={refresh} />
				<CheckBx id={todo._id.$oid} refresh={refresh} checked={todo.status === 'Completed'} />
			</Grid>
			<Divider style={{ marginLeft: '30px' }} />
			<Grid style={{ padding: '10px 30px 0px 30px', justifyContent: 'space-between' }} container direction='row'>
				<Typography variant='body2'>Created: {Moment(new Date(todo.created_at.$date)).format('D-MMM-YYYY LT')}</Typography>
				{todo.completed_at && (
					<Typography variant='body2'>
						Completed: {Moment(new Date(todo.completed_at.$date)).format('D-MMM-YYYY LT')}
					</Typography>
				)}
			</Grid>
		</TodoCard>
	);
};
export default Todo;

const EditableName = ({ id, name, refresh }) => (
	<div
		onInput={async e => {
			await editName(id, e.target.textContent);
			await refresh();
		}}
		contentEditable
		style={{
			fontSize: '22px',
			fontWeight: '600',
			textIndent: '35px',
			display: 'flex',
			justifyContent: 'space-between',
			paddingRight: '10px',
			paddingTop: '5px',
		}}
	>
		{name}
	</div>
);

const CheckBx = ({ id, refresh, checked }) => {
	const [isChecked, setIsChecked] = useState(checked);
	return (
		<Checkbox
			onChange={async () => {
				setIsChecked(!isChecked);
				checked ? await unComplete(id) : await completeTodo(id);
				refresh();
			}}
			checked={isChecked}
		/>
	);
};
