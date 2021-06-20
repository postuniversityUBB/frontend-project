import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './Navbar';

describe('Navbar', () => {

	test('should display correct buttons when user is logged out', async () => {

		const { findByText } = render(
            <Router>           
                <Navbar />
            </Router>
		);

		const contact = await findByText('Contact');
		const about = await findByText('About');
		const login= await findByText('Login');
		const register = await findByText('Register');
        
		expect(contact).toBeInTheDocument();
		expect(about).toBeInTheDocument();
		expect(login).toBeInTheDocument();
        expect(register).toBeInTheDocument();
	});

    test('should display correct buttons when user is logged in', async () => {
        localStorage.setItem("user", JSON.stringify(
            {
                username: "oana.ujica",
                firstName: "Oana",
                lastName: "Ujica",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvYW5hLnVqaWNhIiwiZmlyc3ROYW1lIjoiT2FuYSIsImxhc3ROYW1lIjoiVWppY2EiLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImV4cCI6MTYyOTI0NDgwMCwiaWF0IjoxNjI0MTI5MTM1fQ.opknw_ZDXboL3CC0Jls3hC5vYD14cd8oU8oI0o8A-irsfmOuvZ5r-5LTjX8yiqzYjXnfLKy2b-fhtc7CvRnTDQ",
                role: "[ROLE_ADMIN]"
            }
        ));

		const { findByText, findByTitle } = render(
            <Router>           
                <Navbar />
            </Router>
		);

        const home = await findByTitle('Home page');
        const helloMessage = await findByText('Hi, Oana!');
		const contact = await findByText('Contact');
		const about = await findByText('About');
		const logout= await findByText('Logout');

		expect(home).toBeInTheDocument();
		expect(helloMessage).toBeInTheDocument();
		expect(contact).toBeInTheDocument();
		expect(about).toBeInTheDocument();
		expect(logout).toBeInTheDocument();
	});
});
