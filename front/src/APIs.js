import axios from 'axios'
const baseUrl = 'http://127.0.0.1:5001'

export const getTodos = async () => (await axios.get(`${baseUrl}/viewtasks`)).data;
export const deleteTodo = async id => (await axios.get(`${baseUrl}/deletetasks`, { params: { id } })).data;
export const addTodo = async name => (await axios.get(`${baseUrl}/addtask`, { params: { name } })).data;
export const completeTodo = async id => (await axios.get(`${baseUrl}/complete`, { params: { id } })).data;
export const unComplete = async id => (await axios.get(`${baseUrl}/undo-complete`, { params: { id } })).data;
export const editName = async (id, name )=> (await axios.get(`${baseUrl}/edit_name`, { params: { name, id } })).data;