import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'

import CreateTask from './CreateTask';

describe('create task page', () => {

	test('should display correct input fields', async () => {
		const { findByLabelText, findByText, findByTestId } = render(
            <Router>           
                <CreateTask />
            </Router>
		);

		const pageTitle = await findByText('Create Task for', {exact: false});
		const titleLabel = await findByLabelText('Title');
		const taskStatusLabel = await findByLabelText('Task Status');
        const assignedToLabel = await findByTestId('assignedTo');
		const descriptionLabel = await findByLabelText('Description');
		const deadlineLabel = await findByLabelText('Deadline');

		expect(pageTitle).toBeInTheDocument();
		expect(titleLabel).toBeInTheDocument();
		expect(taskStatusLabel).toBeInTheDocument();
        expect(assignedToLabel).toBeInTheDocument();
		expect(descriptionLabel).toBeInTheDocument();
		expect(deadlineLabel).toBeInTheDocument();
	});

	test('should display correct input fields values', async () => {
		const { findByLabelText, findByTestId } = render(
            <Router>           
                <CreateTask />
            </Router>
		);

		const titleLabel = await findByLabelText('Title');
		fireEvent.change(titleLabel, { target: { value: 'Task1' } });

		const taskStatusLabel = await findByTestId('taskStatus');
		fireEvent.change(taskStatusLabel, { target: { value: 'TESTING' } });

		const descriptionLabel = await findByLabelText('Description');
		fireEvent.change(descriptionLabel, { target: { value: 'Test description' } });

		expect(titleLabel).toBeInTheDocument();
		expect(titleLabel.value).toBe('Task1');
		expect(taskStatusLabel).toBeInTheDocument();
		expect(taskStatusLabel.value).toBe('TESTING');
		expect(descriptionLabel).toBeInTheDocument();
		expect(descriptionLabel.value).toBe('Test description');
	});
});
