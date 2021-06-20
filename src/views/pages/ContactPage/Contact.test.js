import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Contact from './Contact';

describe('Contact', () => {

	test('should display correct input fields and button', async () => {

		const { findByText } = render(
            <Router>           
                <Contact/>
            </Router>
		);
        
        const pageTitle = await findByText('Contact Us');
        const subHeader = await findByText('Fill up the form and our team will get back to you within 24 hours.');
        const firstNameLabel = await findByText('First Name');
        const lastNameLabel = await findByText('Last Name');
        const emailLabel = await findByText('Email');
        const phoneLabel = await findByText('Phone');
        const messageLabel = await findByText('Message');
        const sendButton = await findByText('Send');
        
		expect(pageTitle).toBeInTheDocument();
		expect(subHeader).toBeInTheDocument();
		expect(firstNameLabel).toBeInTheDocument();
		expect(lastNameLabel).toBeInTheDocument();
		expect(emailLabel).toBeInTheDocument();
		expect(phoneLabel).toBeInTheDocument();
		expect(messageLabel).toBeInTheDocument();
		expect(sendButton).toBeInTheDocument();
	});
});
