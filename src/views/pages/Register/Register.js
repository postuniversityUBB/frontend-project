import React, { useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"
import { v4 as uuidv4 } from "uuid"
import { register } from "../../../api/api"
import { Link, Redirect } from "react-router-dom"

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://material-ui.com/">
				Postuniv Team
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	)
}

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(3),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		marginTop: theme.spacing(3),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	select: {
		width: "100%",
	},
}))

export default function Register() {
	const classes = useStyles()
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [role, setRole] = useState("")
	const [done, setDone] = useState(false)
  const [error, setError] = useState(false)
  const [user,setUser]= useState(JSON.parse(localStorage.getItem("user")))

	const sendRegister = async e => {
		e.preventDefault()
		try {
			const status = await register({
				userCode: uuidv4(),
				firstName: firstName,
				lastName: lastName,
				username: username,
				email: email,
				password: password,
				isAdmin: false,
				roles: [role],
			})
			if (status == 200) {
				setDone(true)
			}
		} catch (err) {
			setError(true)
		}
	}
	if (error) {
		return <Typography>Error occured</Typography>
  }
  
  if(user){
    return <Redirect to="/"/>
  }

	return (
		<div className="listEntities">
			<Container component="main" maxWidth="xs">
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Register
					</Typography>
					{done ? (
						<>
							<Typography>
								You are now registered! Welcome to the team!
							</Typography>
							<Typography>
								Click here to <Link to="/login">login</Link>{" "}
							</Typography>
						</>
					) : (
						<form className={classes.form} onSubmit={e => sendRegister(e)}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete="fname"
										name="firstName"
										variant="outlined"
										required
										fullWidth
										id="firstName"
										label="First Name"
										autoFocus
										onChange={e => setFirstName(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="lastName"
										label="Last Name"
										name="lastName"
										autoComplete="lname"
										onChange={e => setLastName(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
										onChange={e => setEmail(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="username"
										label="Username"
										name="username"
										autoComplete="username"
										onChange={e => setUsername(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										autoComplete="current-password"
										onChange={e => setPassword(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControl className={classes.select} variant="outlined">
										<InputLabel id="demo-simple-select-outlined-label">
											Role
										</InputLabel>
										<Select
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											label="Role"
											onChange={e => setRole(e.target.value)}
										>
											<MenuItem value="ROLE_USER">User</MenuItem>
											<MenuItem value="ROLE_ADMIN">Admin</MenuItem>
										</Select>
									</FormControl>
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
							>
								Register
							</Button>
							<Grid container justify="flex-end">
								<Grid item>
									<Link to="/login" variant="body2">
										Already have an account? Login
									</Link>
								</Grid>
							</Grid>
						</form>
					)}
				</div>
				<Box mt={14}>
					<Copyright />
				</Box>
			</Container>
		</div>
	)
}
