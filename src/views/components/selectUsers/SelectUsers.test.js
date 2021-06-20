import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import SelectUsers from './SelectUsers';

describe('SelectUsers', () => {

	test('should display correct input field and value', async () => {

		const { findByText, findByTestId } = render(
            <Router>           
                <SelectUsers register={jest.fn()}/>
            </Router>
		);
        const assignedToLabel = await findByText('User');  
        const assignedToInput = await findByTestId('assignedTo');   
        fireEvent.change(assignedToInput, { target: { value: 'john.doe' } });

		expect(assignedToInput.value).toBe('john.doe');
		expect(assignedToLabel).toBeInTheDocument();
	});
});
