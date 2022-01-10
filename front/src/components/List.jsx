import { useData } from './Context';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import styled from 'styled-components'
import TodoCard from './TodoCard'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { useState, useRef } from 'react';
import { addTodo } from '../APIs'

const Wrapper = styled.div`
	margin-top: 50px;
	padding-left: 3%;
	padding-right: 3%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
   row-gap: 10px
`;


const List = () => {
   const { data } = useData();
   
   	if (!data) return (
		<Grid alignItems='center' justifyContent='center' container style={{ marginTop: '100px' }} data-testid='spinner'>
			<CircularProgress size={100} />
		</Grid>
   );

   return (
				<>
					<AddTask />
					<Wrapper>
						{data.map(todo => (
							<TodoCard todo={todo} key={todo._id.$oid} />
						))}
					</Wrapper>
				</>
			);
};
export default List;

const AddTask = () => {
   const [ open, setOpen ] = useState(false)
   const field = useRef()
   const {refresh} = useData()

   const create = async () => {
      await addTodo(field.current.value);
      await refresh()
      setOpen(false)
   }
   
   return (
	<div style={{ paddingTop: '15px', marginLeft: '10px' }}>
		<Button variant='contained' onClick={()=>setOpen(true)}>
			<AddIcon /> Add a task
		</Button>
		<Dialog open={open} onClose={()=>setOpen(false)}>
			<DialogTitle>Name</DialogTitle>
			<DialogContent>
				<TextField variant='outlined' inputRef={field}/>
				<Grid style={{marginTop:'16px'}}>
					<Button variant='contained' onClick={create}>Create</Button>
				</Grid>
			</DialogContent>
		</Dialog>
	</div>
)};