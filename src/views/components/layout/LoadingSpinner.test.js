import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {

	test('should display correct loading spinner', async () => {

		const { findByRole } = render(
            <Router>           
                <LoadingSpinner />
            </Router>
		);

		const contact = await findByRole('progressbar');        
		expect(contact).toBeInTheDocument();
	});
});
