import React from 'react';
import Wrapper from './components/Context'
import List from './components/List'
import './App.css'
import Navbar from './components/Navbar'


function App() {
   return (
				<>
					<Navbar />

         <Wrapper>
            
						<List />
					</Wrapper>
				</>
			);
}

export default App;

