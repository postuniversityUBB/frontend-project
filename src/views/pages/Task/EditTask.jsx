import React, { useState, useRef } from "react"
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
import SelectUsers from "../../components/selectUsers/SelectUsers"
import { updateTask } from "../../../api/api"

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
const taskStatuses = [
	{
		value: "DEV_ON_DESK",
		label: "Dev on desk",
	},
	{
		value: "DEV_IN_PROGRESS",
		label: "Dev in progress",
	},
	{
		value: "TESTING",
		label: "Testing",
	},
	{
		value: "CANCELLED",
		label: "Cancelled",
	},
	{
		value: "COMPLETED",
		label: "Completed",
	},
]
const handleFormat = taskStatus => {
	const value = taskStatuses.filter(
		obj => obj.label.toLowerCase() === taskStatus
	)[0]?.value
	return value
}
const EditTaskPage = () => {
	let task = {};
	let project = {};
	if (localStorage && localStorage.getItem('task') && localStorage.getItem('project')) {
		task = JSON.parse(localStorage.getItem('task'));
		project = JSON.parse(localStorage.getItem('project'));
	}
	const projectTitle = project.title;
    console.log("🚀 ~ file: EditTask.jsx ~ line 166 ~ EditTaskPage ~ projectTitle", projectTitle)
   
	
	const [title, setTitle] = useState(task?.title)
	const [taskStatus, setTaskStatus] = useState(handleFormat(task?.taskStatus))
	const [description, setDescription] = useState(task?.description)
	const [assignedToUserCode, setAssignedToUserCode] = useState(
		task?.assignedToUserCode
	)
	const [deadline, setDeadline] = useState(task?.deadline)
	const [openBackToList, isOpenBackToList] = useState(false)
	const [openCreateTask, isOpenCreateTask] = useState(false)
	const { register, handleSubmit } = useForm()
	const domRef = useRef()
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()
	const onSubmit = async (values, e) => {
		e.preventDefault()
		const payload = {
			assignedToUserCode: values.assignedToUserCode,
			taskStatus: taskStatus,
			description: description,
			title: title,
			deadline: values.deadline ? formatDate(values.deadline) : deadline,
		}
		console.log(
			"🚀 ~ file: EditTask.jsx ~ line 173 ~ onSubmit ~ payload ",
			payload
		)
		try {
			const status = await updateTask(payload, task.taskCode)
			isOpenCreateTask(true)
			handleClickOpenCreateTaskSnackbar("success")
		} catch (err) {
			console.log(err)
		}
	}
	const SubmitButton = props => <button {...props} type="submit" />
	const handleClickOpenCreateTaskSnackbar = variant => {
		enqueueSnackbar("New task successfully created!", { variant })
	}

	const handlePopUpBackToList = () => {
		isOpenBackToList(true)
	}

	const handleCloseBackToList = () => {
		isOpenBackToList(false)
	}

	const handleCloseCreateTask = () => {
		isOpenCreateTask(false)
	}

	const handleChangeTitle = event => {
		setTitle(event.target.value)
	}

	const handleChangeDescription = event => {
		setDescription(event.target.value)
	}

	const handleChangeTaskStatus = event => {
		setTaskStatus(event.target.value)
	}

	const handleChangeAssignedToUserCode = event => {
		console.log(
			"🚀 ~ file: EditTask.jsx ~ line 213 ~ EditTaskPage ~ event",
			event.target.value
		)
		console.log(
			"🚀 ~ file: EditTask.jsx ~ line 213 ~ EditTaskPage ~ eventsadasdasdasdasdasdasd"
		)

		setAssignedToUserCode(event.target.value)
	}

	const handleDeadline = date => {
		setDeadline(date)
	}

	const handleResetDatePickerDeadline = () => {
		setDeadline(null)
	}
	const handleRedirectToListTask = () => {
		isOpenCreateTask(false)
		// window.history.push({
		// 	pathname:"/task/list",
		// 	search:`?project=${projectTitle}`,
		// 	state:{projectTitle: projectTitle}
		// })
		window.history.back()
	}


	return (
		<div className="createEntity">
			<h3 id="headerCreateTask" className="header">
				Edit {title}
			</h3>
			<RootRef rootRef={domRef}>
				<form onSubmit={handleSubmit(onSubmit)} autocomplete="off" noValidate>
					<FormControl id="titleForm" className={classes.formControl}>
						<TextField
							id="title"
							type="text"
							name="title"
							value={title}
							{...register("title")}
							onChange={handleChangeTitle}
							className={classes.textField}
							label="Title"
							placeholder="Title"
							InputLabelProps={{ shrink: true }}
						/>
					</FormControl>

					<FormControl id="taskStatusForm" className={classes.formControl}>
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
							handleChangeAssignedToUserCode={handleChangeAssignedToUserCode}
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
function formatDate(dateString) {
	if (dateString === "") {
		return dateString
	}

	const dateArray = dateString.split("/")
	const [day, month, year] = dateArray
	const newDate = new Date(year, month - 1, day)

	const moment = require("moment")
	const newDateFormat = moment(newDate).format("YYYY-MM-DD")
	return newDateFormat
}

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})

const TransitionCreateTask = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})

export default function EditTask() {
	return (
		<SnackbarProvider maxSnack={1}>
			<EditTaskPage />
		</SnackbarProvider>
	)
}
