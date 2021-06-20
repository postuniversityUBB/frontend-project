import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'jest-canvas-mock';
import axios from "axios";

import ListTasks from './ListTasks';

jest.mock('axios');

const tasksMock = 
    {
        "projectCode":"7e279410-eaa4-4e28-9621-cedf4ee943f3",
        "title":"Project9",
        "description":"Test",
        "dateAdded":"2021-06-19T00:00:00.000+00:00",
        "lastModified":"2021-06-19T07:28:07.104",
        "deadline":"2022-06-22",
        "projectStatus":"alpha",
        "createdBy":"Oana Ujica",
        "tasks":
        [
            {
                "taskCode":"db7817d0-7416-4ce9-acd5-ab8e8b79b5e0",
                "title":"Task1",
                "description":"Test",
                "dateAdded":"2021-06-19T00:00:00.000+00:00",
                "lastModified":"2021-06-19T07:31:23.109",
                "deadline":"2021-06-23",
                "taskStatus":"dev on desk",
                "createdBy":"Oana Ujica",
                "assignedTo":"Oana Ujica",
                "assignedToUserCode":"bf934276-49fc-487a-820c-2bbab222f11f"
            }
        ]
    };

localStorage.setItem("user", JSON.stringify(
    {
        username: "oana.ujica",
        firstName: "Oana",
        lastName: "Ujica",
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvYW5hLnVqaWNhIiwiZmlyc3ROYW1lIjoiT2FuYSIsImxhc3ROYW1lIjoiVWppY2EiLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImV4cCI6MTYyOTI0NDgwMCwiaWF0IjoxNjI0MTI5MTM1fQ.opknw_ZDXboL3CC0Jls3hC5vYD14cd8oU8oI0o8A-irsfmOuvZ5r-5LTjX8yiqzYjXnfLKy2b-fhtc7CvRnTDQ",
        role: "[ROLE_ADMIN]"
    }
));

describe('list of tasks page', () => {
    afterEach(() => {
        axios.get.mockClear();
    });

	test('should display correct table\'s columns', async () => {
        axios.get.mockResolvedValue({data: tasksMock});

		const { findByText } = render(
            <Router>           
                <ListTasks />
            </Router>
		);

		const pageTitle = await findByText('All tasks of', {exact: false});
		const title = await findByText('Task Name');
		const taskStatus= await findByText('Task Status');
		const createdBy = await findByText('Created By');
		const description = await findByText('Description');
		const deadline = await findByText('Deadline');
		const dateAdded = await findByText('Date Added');
		const lastModified = await findByText('Last Modified');

		expect(pageTitle).toBeInTheDocument();
		expect(title).toBeInTheDocument();
		expect(taskStatus).toBeInTheDocument();
        expect(createdBy).toBeInTheDocument();
		expect(description).toBeInTheDocument();
		expect(deadline).toBeInTheDocument();
		expect(dateAdded).toBeInTheDocument();
		expect(lastModified).toBeInTheDocument();
	});
});
