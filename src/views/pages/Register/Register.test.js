import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Register from './Register';

describe('Register', () => {

	test('should display correct input fields and button', async () => {

		const { findByText, findAllByText, findByLabelText } = render(
            <Router>           
                <Register/>
            </Router>
		);
        
        const pageTitle = await findAllByText('Register');
        const firstNameLabel = await findByText('First Name');
        const lastNameLabel = await findByText('Last Name');
        const emailLabel = await findByText('Email Address');
        const roleLabel = await findByLabelText('Role');
        const usernameLabel = await findByText('Username');
        const passwordLabel = await findByText('Password');
        const loginButton = await findByText('Already have an account? Login');
        
		expect(pageTitle).toHaveLength(2);
		expect(firstNameLabel).toBeInTheDocument();
		expect(lastNameLabel).toBeInTheDocument();
		expect(emailLabel).toBeInTheDocument();
		expect(roleLabel).toBeInTheDocument();
		expect(usernameLabel).toBeInTheDocument();
		expect(passwordLabel).toBeInTheDocument();
		expect(loginButton).toBeInTheDocument();
	});
});
