import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import List from './components/List';
import QuoteDataWrapper from './components/Context';

test('The page shows a loading spinner while fetching data', () => {
	render(
		<QuoteDataWrapper>
			<List />
		</QuoteDataWrapper>
	);
	expect(screen.getByTestId('spinner')).toBeInTheDocument();
});