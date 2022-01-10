import { useData } from './Context';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import styled from 'styled-components'
import TodoCard from './TodoCard'

const Wrapper = styled.div`
	margin-top: 50px;
	padding-left: 3%;
	padding-right: 3%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
   gap: 25px
`;


const List = () => {
   const { data } = useData();
   
   	if (!data) return (
		<Grid alignItems='center' justifyContent='center' container style={{ marginTop: '100px' }} data-testid='spinner'>
			<CircularProgress size={100} />
		</Grid>
   );

   return <Wrapper>{data.map(todo=><TodoCard todo={todo} key={todo.id}/>)}</Wrapper>;
};
export default List;