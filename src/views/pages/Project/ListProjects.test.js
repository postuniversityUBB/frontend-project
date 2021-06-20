import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'jest-canvas-mock';
import axios from "axios";

import ListProjects from './ListProjects';

jest.mock('axios');

const projectsMock = [
    {
        projectCode: "b12f2ef7-b83c-4203-9a58-4b030a05fa74",
        title: "testproj1",
        description: "bla bla",
        dateAdded: "2021-06-11T00:00:00.000+00:00",
        lastModified: null,
        deadline: "2021-06-29",
        projectStatus: "alpha",
        createdBy: "firstName lastname",
        tasks: []
    },
    {
        projectCode: "4e002481-7bef-45db-8d41-ba675ccffb51",
        title: "project6",
        description: "test edited",
        dateAdded: "2021-06-04T00:00:00.000+00:00",
        lastModified: null,
        deadline: "2022-06-30",
        projectStatus: "production",
        createdBy: "firstName lastname",
        tasks: []
    },
    {
        projectCode: "68891a14-8640-47b8-99cb-416f6cf61dc6",
        title: "project5",
        description: "test",
        dateAdded: "2021-06-04T00:00:00.000+00:00",
        lastModified: null,
        deadline: "2021-12-03",
        projectStatus: "dev",
        createdBy: "firstName lastname",
        tasks: []
    },
];

localStorage.setItem("user", JSON.stringify(
    {
        username: "oana.ujica",
        firstName: "Oana",
        lastName: "Ujica",
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvYW5hLnVqaWNhIiwiZmlyc3ROYW1lIjoiT2FuYSIsImxhc3ROYW1lIjoiVWppY2EiLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImV4cCI6MTYyOTI0NDgwMCwiaWF0IjoxNjI0MTI5MTM1fQ.opknw_ZDXboL3CC0Jls3hC5vYD14cd8oU8oI0o8A-irsfmOuvZ5r-5LTjX8yiqzYjXnfLKy2b-fhtc7CvRnTDQ",
        role: "[ROLE_ADMIN]"
    }
));

describe('list of projects page', () => {
    afterEach(() => {
        axios.get.mockClear();
    });

	test('should display correct table\'s columns', async () => {
        axios.get.mockResolvedValue({data: projectsMock});

		const { findByText } = render(
            <Router>           
                <ListProjects />
            </Router>
		);

		const pageTitle = await findByText('All Projects');
		const title = await findByText('Project Name');
		const projectStatus= await findByText('Project Status');
		const createdBy = await findByText('Created By');
		const description = await findByText('Description');
		const deadline = await findByText('Deadline');
		const dateAdded = await findByText('Date Added');
		const lastModified = await findByText('Last Modified');

		expect(pageTitle).toBeInTheDocument();
		expect(title).toBeInTheDocument();
		expect(projectStatus).toBeInTheDocument();
        expect(createdBy).toBeInTheDocument();
		expect(description).toBeInTheDocument();
		expect(deadline).toBeInTheDocument();
		expect(dateAdded).toBeInTheDocument();
		expect(lastModified).toBeInTheDocument();
	});
});
