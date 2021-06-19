import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'

import CreateProject from './CreateProject';

describe('create project page', () => {

	test('should display correct input fields', async () => {
		const { findByLabelText, findAllByText } = render(
            <Router>           
                <CreateProject />
            </Router>
		);

		const pageTitle = await findAllByText('Create Project');
		const titleLabel = await findByLabelText('Title');
		const projectStatusLabel = await findByLabelText('Project Status');
		const descriptionLabel = await findByLabelText('Description');
		const deadlineLabel = await findByLabelText('Deadline');

		expect(pageTitle).toHaveLength(2);
		expect(titleLabel).toBeInTheDocument();
		expect(projectStatusLabel).toBeInTheDocument();
		expect(descriptionLabel).toBeInTheDocument();
		expect(deadlineLabel).toBeInTheDocument();
	});

	test('should display correct input fields values', async () => {
		const { findByLabelText, findByTestId } = render(
            <Router>           
                <CreateProject />
            </Router>
		);

		const titleLabel = await findByLabelText('Title');
		fireEvent.change(titleLabel, { target: { value: 'Project1' } });

		const projectStatusLabel = await findByTestId('projectStatus');
		fireEvent.change(projectStatusLabel, { target: { value: 'Dev' } });

		const descriptionLabel = await findByLabelText('Description');
		fireEvent.change(descriptionLabel, { target: { value: 'Test description' } });

		expect(titleLabel).toBeInTheDocument();
		expect(titleLabel.value).toBe('Project1');
		expect(projectStatusLabel).toBeInTheDocument();
		expect(projectStatusLabel.value).toBe('Dev');
		expect(descriptionLabel).toBeInTheDocument();
		expect(descriptionLabel.value).toBe('Test description');
	});
});
