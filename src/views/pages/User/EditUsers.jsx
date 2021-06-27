import React, {useRef,useState} from 'react'
import { useLocation  } from 'react-router-dom'
import queryString from 'query-string'
import useCurentUser from './useCurentUser'
import { useForm } from "react-hook-form"
import {
	makeStyles,
	FormControl,
	TextField,
	Grid,
	Button,
	RootRef,
	Backdrop,
	Select,
} from "@material-ui/core"
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Slide,
	MenuItem,
} from "@material-ui/core"
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import "date-fns"
import { SnackbarProvider, useSnackbar } from "notistack"
import {updateUser} from "../../../api/api"

const useStyles = makeStyles(theme => ({
	formControl: {
		marginRight: theme.spacing(33),
		marginBottom: theme.spacing(14),
		width: 300,
	},
	textField: {
		width: 380,
	},
	keyboardDatePicker: {
		width: 380,
	},
	dialogCreateTaskText: {
		color: "#384A9C",
		fontWeight: 700,
		fontSize: 20,
		marginBottom: 15,
		marginTop: 20,
		marginRight: 70,
		marginLeft: 70,
	},
	dialogCreateTaskNewTask: {
		height: 36,
		borderRadius: 9,
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#384A9C",
		paddingRight: 55,
		paddingLeft: 55,
		marginLeft: 25,
		marginBottom: 35,
		letterSpacing: 0,
		minWidth: 180,
	},
	dialogCreateTaskBackToList: {
		height: 36,
		borderRadius: 9,
		backgroundColor: "#384A9C",
		color: "white",
		paddingRight: 50,
		paddingLeft: 50,
		marginBottom: 35,
		marginRight: 25,
		minWidth: 180,
		"&:hover": {
			height: 36,
			borderRadius: 9,
			backgroundColor: "#384A9C",
			color: "white",
			paddingRight: 50,
			paddingLeft: 50,
			marginBottom: 35,
			marginRight: 25,
			minWidth: 180,
		},
	},
	dialogBackToListTitle: {
		color: "#384A9C",
		fontWeight: 700,
		fontSize: 22,
		marginBottom: 15,
		marginTop: 20,
		marginLeft: 10,
	},
	dialogBackToListDescription: {
		color: "#3d3d29",
		fontWeight: "bolder",
		fontSize: 14,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 20,
	},
	dialogCancelButton: {
		height: 36,
		borderRadius: 9,
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#384A9C",
		paddingRight: 55,
		paddingLeft: 55,
		marginLeft: 45,
		marginBottom: 35,
	},
	dialogProceedButton: {
		height: 36,
		borderRadius: 9,
		backgroundColor: "#384A9C",
		color: "white",
		paddingRight: 50,
		paddingLeft: 50,
		marginRight: 45,
		marginBottom: 35,
		"&:hover": {
			height: 36,
			borderRadius: 9,
			backgroundColor: "#384A9C",
			color: "white",
			paddingRight: 50,
			paddingLeft: 50,
			marginRight: 45,
			marginBottom: 35,
		},
	},
}))

const EditUsers = () => {
    const location = useLocation()
	const user = JSON.parse(localStorage.getItem('editUser'))
	const [firstName, setFirstName] = useState(user.firstName)
	const [lastName, setLastName] = useState(user.lastName)
	const [email, setEmail] = useState(user.email)
    console.log("🚀 ~ file: EditUsers.jsx ~ line 10 ~ EditUsers ~ user")
    const classes = useStyles()
    const domRef = useRef()
    const { register, handleSubmit } = useForm()

    const onSubmit = async (values, e) => {
	 const payload = {
		 ...user,
		 firstName : values.firstName ? values.firstName : firstName,
		 lastName : values.lastName ? values.lastName : lastName,
		 email : values.email ? values.email : email,
	 }
	  await updateUser(payload,user.userCode)
	
	}



	const SubmitButton = props => <button {...props} type="submit" />
	
	const handleRedirectToListusers = ()=>{
		
	}
	const handleCloseBackToUser = ()=>{

	}
	const handleRedirectToListUser = ()=>{

	}
	const handeSetFirstname = (e) =>{
		setFirstName(e.target.value)
	}
    return (
        <div className="createEntity">
			<h3 id="headerCreateTask" className="header">
				Edit {user?.username}
			</h3>
			<RootRef rootRef={domRef}>
				<form onSubmit={handleSubmit(onSubmit)} autocomplete="off" noValidate>
					<FormControl id="titleForm" className={classes.formControl}>
						<TextField
							id="firstName"
							type="text"
							name="firstName"
							value={ firstName ? firstName : ""}
							{...register("firstName")}
							className={classes.textField}
							onChange={handeSetFirstname}
							label="First Name"
							placeholder="first name"
							InputLabelProps={{ shrink: true }}
						/>
					</FormControl>
					<FormControl id="titleForm" className={classes.formControl}>
						<TextField
							id="last-name"
							type="text"
							name="last-name"
							value={ lastName ? lastName : ""}
							{...register("lastName")}
							onChange={e => setLastName(e.target.value)}
							className={classes.textField}
							label="Last Name"
							placeholder="last name"
							InputLabelProps={{ shrink: true }}
						/>
					</FormControl>
					<FormControl id="titleForm" className={classes.formControl}>
						<TextField
							id="email"
							type="email"
							name="last-name"
							value={email ?email : ""}
							{...register("email")}
							
							onChange={e => setEmail(e.target.value)}
							className={classes.textField}
							label="email"
							placeholder="email"
							InputLabelProps={{ shrink: true }}
						/>
					</FormControl>

				
					<Grid container spacing={1}>
						<Grid container item xs={12} justify="center">
							<Button
								id="submitCreateTask"
								className="inactive-button"
								component={SubmitButton}
								variant="contained"
								color="primary"
								size="large"
								href="#"
							>
								Edit Task
							</Button>
							<Backdrop
								//open={openCreateTask}
								//onClose={handleCloseCreateTask}
								elevation={18}
							>
								<Dialog
									//open={openCreateTask}
									//TransitionComponent={TransitionCreateTask}
									keepMounted
									aria-describedby="New task created!"
									disableBackdropClick
								>
									<DialogContent>
										<DialogContentText
											id="alertDialogDescriptionNewTask"
											className={classes.dialogCreateTaskText}
										>
											Task edited successfully!
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Grid container spacing={2}>
											<Grid container item xs={12} justify="center">
												<Button
													id="alertDialogButtonBackToListForBackToList"
													className={classes.dialogCreateTaskBackToList}
													onClick={handleRedirectToListusers}
													color="primary"
												>
													OK
												</Button>
											</Grid>
										</Grid>
									</DialogActions>
								</Dialog>
							</Backdrop>
						</Grid>

						<Grid container item xs={12} justify="center">
							<Button
								id="alertDialogButtonForCreateTask"
								className="backToList"
								variant="contained"
								color="primary"
								size="large"
							
							>
								Back to list
							</Button>
							<Backdrop
								//open={openBackToList}
								//onClose={handleCloseBackToList}
								elevation={18}
							>
								<Dialog
									//open={openBackToList}
									//TransitionComponent={Transition}
									keepMounted
									onClose={handleCloseBackToUser}
									aria-labelledby="Confirmation"
									aria-describedby="Do you want to save changes to this document before closing?"
									disableBackdropClick
								>
									<DialogContent>
										<DialogContentText
											id="alertdDialogTitleBackToList"
											className={classes.dialogBackToListTitle}
										>
											Confirmation
										</DialogContentText>
										<DialogContentText
											id="alertDialogDescriptionBackToList"
											className={classes.dialogBackToListDescription}
										>
											<p>
												Do you want to save changes to this document before
												closing?
											</p>
											<p>Unsaved changes will be lost.</p>
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Grid container spacing={2}>
											<Grid container item xs={6} justify="center">
												<Button
													id="alertDialogButtonCancelForCreatTask"
													className={classes.dialogCancelButton}
													onClick={handleCloseBackToUser}
													color="primary"
												>
													Cancel
												</Button>
											</Grid>
											<Grid container item xs={6} justify="center">
												<Button
													id="alertDialogButtonProceedForCreateTask"
													className={classes.dialogProceedButton}
													onClick={handleRedirectToListUser}
													color="primary"
												>
													Proceed
												</Button>
											</Grid>
										</Grid>
									</DialogActions>
								</Dialog>
							</Backdrop>
						</Grid>
					</Grid>
				</form>
			</RootRef>
		</div>
    )
}

export default EditUsers
