import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'jest-canvas-mock';
import axios from "axios";

import ListUsers from './ListUsers';

jest.mock('axios');

const usersMock = [
    {
        userCode: "ebs102",
        firstName: "morty",
        lastName: "morty",
        username: "mortym",
        email: "morty@email.com",
        roles:
        [
            {
                id: 67,
                dateAdded: null,
                lastModified: null,
                role: "ROLE_MANAGER"
            },
            {
                id: 68,
                dateAdded: null,
                lastModified: null,
                role: "ROLE_USER"
            }
        ],
        projects: [],
        tasks: [],
        createdAt: null,
        lastModified: null
    },
    {
        userCode: "ebs103",
        firstName: "bill",
        lastName: "bill",
        username: "billb",
        email: "bill@email.com",
        roles:
        [
            {
                id: 71,
                dateAdded: null,
                lastModified: null,
                role: "ROLE_ADMIN"
            }
        ],
        projects: [],
        tasks: [],
        createdAt: null,
        lastModified: null
    },    
];

localStorage.setItem("user", JSON.stringify(
    {
        username: "billb",
        firstName: "bill",
        lastName: "bill",
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvYW5hLnVqaWNhIiwiZmlyc3ROYW1lIjoiT2FuYSIsImxhc3ROYW1lIjoiVWppY2EiLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImV4cCI6MTYyOTI0NDgwMCwiaWF0IjoxNjI0MTI5MTM1fQ.opknw_ZDXboL3CC0Jls3hC5vYD14cd8oU8oI0o8A-irsfmOuvZ5r-5LTjX8yiqzYjXnfLKy2b-fhtc7CvRnTDQ",
        role: "[ROLE_ADMIN]"
    }
));

describe('list of users page', () => {
    afterEach(() => {
        axios.get.mockClear();
    });

	test('should display correct table\'s columns', async () => {
        axios.get.mockResolvedValue({data: usersMock});

		const { findByText } = render(
            <Router>           
                <ListUsers />
            </Router>
		);

		const pageTitle = await findByText('All Users');
		const firstName = await findByText('First Name');
		const lastName= await findByText('Last Name');
		const username = await findByText('Username');
		const email = await findByText('Email');
		const role = await findByText('Role');
		const lastModified = await findByText('Last Modified');

		expect(pageTitle).toBeInTheDocument();
		expect(firstName).toBeInTheDocument();
		expect(lastName).toBeInTheDocument();
        expect(username).toBeInTheDocument();
		expect(email).toBeInTheDocument();
		expect(role).toBeInTheDocument();
		expect(lastModified).toBeInTheDocument();
	});
});
