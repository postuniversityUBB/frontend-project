import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Login from './Login';

describe('Login', () => {

	test('should display correct input fields and button', async () => {

		const { findByText, findAllByText } = render(
            <Router>           
                <Login/>
            </Router>
		);
        
        const pageTitle = await findAllByText('Login');
        const usernameLabel = await findByText('Username');
        const passwordLabel = await findByText('Password');
        const registerButton = await findByText('Don\'t have an account? Register');
        
		expect(pageTitle).toHaveLength(2);
		expect(usernameLabel).toBeInTheDocument();
		expect(passwordLabel).toBeInTheDocument();
		expect(registerButton).toBeInTheDocument();
	});
});
