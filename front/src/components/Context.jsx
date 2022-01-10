import { createContext, useState, useEffect, useContext } from 'react';
import { getTodos } from '../APIs'

export const Todos= createContext();

const TodosWrapper = ({ children }) => {
   const [ data, setData ] = useState();
   
   const getData = async () => setData(await getTodos());

	useEffect(async () => {
		await getData()
	}, []);
	return <Todos.Provider value={{ data, refresh: getData }}>{children}</Todos.Provider>;
};
export default TodosWrapper;
export const useData = () => useContext(Todos);
