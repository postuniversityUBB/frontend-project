import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import About from './About';

describe('About', () => {

	test('should display correct details', async () => {

		const { findByText } = render(
            <Router>           
                <About/>
            </Router>
		);

        const pageTitle = await findByText('About us');
        const leftSectionTitle = await findByText('The power of teamwork');
        const leftSectionDescription = await findByText(
            'Behind every great human achievement, there is a team. From medicine and space travel, to disaster response and pizza deliveries, our products help teams all over the planet advance humanity through the power of software. Our mission is to help unleash the potential of every team.'
        );
        const rightSectionTitle = await findByText('Values to live by');
        const rightSectionDescription = await findByText(
            'Our unique values describe, at the most fundamental level, what we stand for. These five values shape our culture, influence who we are, what we do, and even who we hire. They\'re hard-wired into our DNA and will stay the same as we continue to grow.'
        );


		expect(pageTitle).toBeInTheDocument();
		expect(leftSectionTitle).toBeInTheDocument();
		expect(leftSectionDescription).toBeInTheDocument();
		expect(rightSectionTitle).toBeInTheDocument();
		expect(rightSectionDescription).toBeInTheDocument();
	});
});
