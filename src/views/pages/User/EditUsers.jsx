import React, {useRef} from 'react'
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
    const {usercode} = queryString.parse(location.search)
    const user = useCurentUser({usercode})
    console.log("🚀 ~ file: EditUsers.jsx ~ line 10 ~ EditUsers ~ user", user)
    const classes = useStyles()
    const domRef = useRef()
    

    




    return (
        <div className="createEntity">
			<h3 id="headerCreateTask" className="header">
				Edit {user?.username}
			</h3>
			<RootRef rootRef={domRef}>
				<form onSubmit={handleSubmit(onSubmit)} autocomplete="off" noValidate>
					<FormControl id="titleForm" className={classes.formControl}>
						<TextField
							id="first-name"
							type="text"
							name="first-name"
							value={user?.firstName}
							{...register("firstName")}
							className={classes.textField}
							label="First Name"
							placeholder="first name"
							InputLabelProps={{ shrink: true }}
						/>
					</FormControl>

					
						<Select
							id="taskStatus"
							type="text"
							name="taskStatus"
							{...register("taskStatus")}
							label="Task Status"
							value={taskStatus}
							onChange={handleChangeTaskStatus}
							className={classes.textField}
							placeholder="Task Status"
							InputLabelProps={{ shrink: true }}
							inputProps={{ "data-testid": "taskStatus" }}
						>
							{taskStatuses.map((status, index) => (
								<MenuItem key={index} value={status.value}>
									{status.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl id="descriptionForm" className={classes.formControl}>
						<TextField
							id="description"
							type="text"
							multiline
							rowsMax={3}
							name="description"
							value={description}
							{...register("description")}
							onChange={handleChangeDescription}
							className={classes.textField}
							label="Description"
							placeholder="Description"
							InputLabelProps={{ shrink: true }}
						/>
					</FormControl>

					<FormControl id="addedByUserCodeForm" className={classes.formControl}>
						<SelectUsers
							register={register}
							name='User Assigned'
							value={assignedToUserCode}
						/>
					</FormControl>

					<FormControl className={classes.formControl}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<DatePicker
								id="deadline"
								name="deadline"
								value={deadline}
								{...register("deadline")}
								onChange={date => handleDeadline(date)}
								className={classes.keyboardDatePicker}
								format="dd/MM/yyyy"
								KeyboardButtonProps={{
									"aria-label": "deadline",
								}}
								label="Deadline"
								placeholder="Deadline   dd/mm/yyyy"
								InputLabelProps={{ shrink: true }}
								autoOk={true}
							/>
						</MuiPickersUtilsProvider>
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
								open={openCreateTask}
								onClose={handleCloseCreateTask}
								elevation={18}
							>
								<Dialog
									open={openCreateTask}
									TransitionComponent={TransitionCreateTask}
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
													onClick={handleRedirectToListTask}
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
								onClick={() => {
									title !== "" ||
									taskStatus !== "" ||
									description !== "" ||
									deadline !== null
										? handlePopUpBackToList()
										: handleRedirectToListTask()
								}}
							>
								Back to list
							</Button>
							<Backdrop
								open={openBackToList}
								onClose={handleCloseBackToList}
								elevation={18}
							>
								<Dialog
									open={openBackToList}
									TransitionComponent={Transition}
									keepMounted
									onClose={handleCloseBackToList}
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
													onClick={handleCloseBackToList}
													color="primary"
												>
													Cancel
												</Button>
											</Grid>
											<Grid container item xs={6} justify="center">
												<Button
													id="alertDialogButtonProceedForCreateTask"
													className={classes.dialogProceedButton}
													onClick={handleRedirectToListTask}
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
