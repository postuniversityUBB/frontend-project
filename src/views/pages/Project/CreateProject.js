import React, { useState, useRef } from 'react';
import { useForm} from "react-hook-form";
import { makeStyles, FormControl, TextField, Grid, Button, RootRef, Backdrop } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, Slide} from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import axios from 'axios';
import { SnackbarProvider, useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginRight: theme.spacing(33),
        marginBottom: theme.spacing(22),
        width: 300,
    },
    textField : {
        width: 380,
    },
    keyboardDatePicker: {
        width: 380,
    },
    dialogCreateProjectText: {
        color: "#384A9C",
        fontWeight: 700,
        fontSize: 20,
        marginBottom: 15,
        marginTop: 20,
        marginRight: 70,
        marginLeft: 70,
    },
    dialogCreateProjectNewProject: {
        height: 36,
        borderRadius: 9,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#384A9C",
        paddingRight: 55,
        paddingLeft: 55,
        marginLeft: 25,
        marginBottom: 35,
    },
    dialogCreateProjectBackToList: {
        height: 36,
        borderRadius: 9,
        backgroundColor: "#384A9C",
        color: "white",
        paddingRight: 50,
        paddingLeft: 50,
        marginBottom: 35,
        marginRight: 25,
        "&:hover": {
            height: 36,
            borderRadius: 9,
            backgroundColor: "#384A9C",
            color: "white",
            paddingRight: 50,
            paddingLeft: 50,
            marginBottom: 35,
            marginRight: 25,
        }
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
        }
    },
}));

function CreateProjectPage() {
    const baseUrl = 'https://ebs-software-v1.herokuapp.com';
    const root = '/api';

    const domRef = useRef();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const SubmitButton = (props) => ( <button {...props} type="submit" />);

    const [title, setTitle] = useState('');
    const [projectStatus, setProjectStatus] = useState('');
    const [description, setDescription] = useState('');
    const [addedByUserCode, setAddedByUserCode] = useState('');
    const [deadline, setDeadline] = useState(null);
    
    const [openBackToList, isOpenBackToList] = useState(false);
    const [openCreateProject, isOpenCreateProject] = useState(false);

    const handleClickOpenCreateProjectSnackbar = (variant) => {
      enqueueSnackbar('New project successfully created!', {variant});
    };

    const handlePopUpBackToList = () => {
        isOpenBackToList(true);
    };

    const handleClickOpenBackToList = () => {
        window.open('./list','_self');
    };

    const handleCloseBackToList = () => {
        isOpenBackToList(false);
    };

    const handleCloseCreateProject = () => {
        isOpenCreateProject(false);
    };

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleChangeProjectStatus = (event) => {
        setProjectStatus(event.target.value);
    };

    const handleChangeAddedByUserCode = (event) => {
        setAddedByUserCode(event.target.value);
    };
    
    const handleDeadline = (date) => {
        setDeadline(date);
    };

    const handleResetDatePickerDeadline = () => {
        setDeadline(null);
    };

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (values, e) => {
        e.preventDefault();
        const payload = {
            ...values
        };
        payload.deadline = formatDate(values.deadline);

        axios
        .post(baseUrl + root + "/projects", payload)
        .then(values => {
            console.log(values);
            isOpenCreateProject(true);
            handleClickOpenCreateProjectSnackbar('success');
        })
        .catch(error => {
            console.log(error)
        });
    }

  return (
    <div className="createEntity">
        <h3 id="headerCreateProject" className="header">Create Project</h3>
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
                        InputLabelProps={{shrink: true,}}
                    />
                </FormControl>

                <FormControl id="projectStatusForm" className={classes.formControl}>
                    <TextField
                        id="projectStatus"
                        type="text"
                        name="projectStatus"
                        value ={projectStatus}
                        {...register("projectStatus")}
                        onChange={handleChangeProjectStatus}
                        className={classes.textField}
                        label="Project Status"
                        placeholder="Project Status"
                        InputLabelProps={{shrink: true,}}
                    />
                </FormControl>

                <FormControl id="descriptionForm" className={classes.formControl}>
                    <TextField
                        id="description"
                        type="text"
                        multiline
                        rowsMax={3}
                        name="description"
                        value ={description}
                        {...register("description")}
                        onChange={handleChangeDescription}
                        className={classes.textField}
                        label="Description"
                        placeholder="Description"
                        InputLabelProps={{shrink: true,}}
                    />
                </FormControl>

                <FormControl id="addedByUserCodeForm" className={classes.formControl}>
                    <TextField
                        id="addedByUserCode"
                        type="text"
                        name="addedByUserCode"
                        value ={addedByUserCode}
                        {...register("addedByUserCode")}
                        onChange={handleChangeAddedByUserCode}
                        className={classes.textField}
                        label="AddedByUserCode"
                        placeholder="AddedByUserCode"
                        InputLabelProps={{shrink: true,}}
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
                                'aria-label': 'deadline',
                            }}
                            label="Deadline"
                            placeholder="Deadline   dd/mm/yyyy"
                            InputLabelProps={{shrink: true,}}
                            autoOk={true}
                        />
                    </MuiPickersUtilsProvider>
                </FormControl>

                <Grid container spacing={1}>
                    <Grid container item xs={12} justify="center">
                        <Button
                            id="submitCreateClient"
                            className="inactive-button"
                            component={SubmitButton}
                            variant="contained"
                            color="primary"
                            size="large"
                            href="#"
                        >
                            Create Project
                        </Button>
                        <Backdrop open={openCreateProject} onClose={handleCloseCreateProject} elevation={18}>
                            <Dialog
                                open={openCreateProject}
                                TransitionComponent={TransitionCreateProject}
                                keepMounted
                                aria-describedby="New project created!"
                                disableBackdropClick
                            >
                                <DialogContent>
                                    <DialogContentText id="alertDialogDescriptionNewProject" className={classes.dialogCreateProjectText}>
                                        New project successfully created!
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Grid container spacing={2}>
                                            <Grid container item xs={6} justify="center">
                                                <Button id="alertDialogButtonNewProjectForBacktoList"
                                                        className={classes.dialogCreateProjectNewProject}
                                                        onClick={() => {
                                                            reset({
                                                                title: "",
                                                                projectStatus: "",
                                                                description: "",
                                                                addedByUserCode: "",
                                                                deadline: handleResetDatePickerDeadline(),
                                                            });
                                                            handleCloseCreateProject();
                                                        }}
                                                        color="primary"
                                                >
                                                    New project
                                                </Button>
                                            </Grid>
                                            <Grid container item xs={6} justify="center">
                                                <Button id="alertDialogButtonBackToListForBackToList"
                                                        className={classes.dialogCreateProjectBackToList}
                                                        href="./list"
                                                        color="primary"
                                                >
                                                    Back to List
                                                </Button>
                                            </Grid>
                                        </Grid>
                                </DialogActions>
                            </Dialog>
                        </Backdrop>
                    </Grid>

                    <Grid container item xs={12} justify="center">
                        <Button
                            id="alertDialogButtonForCreateProject"
                            className="backToList"
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={ () => {
                                (title !== "" || projectStatus !== "" || description !== "" ||
                                 addedByUserCode !== "" || deadline !== null) ? handlePopUpBackToList() : handleClickOpenBackToList()}
                            }
                        >
                            Back to list
                        </Button>
                        <Backdrop open={openBackToList} onClose={handleCloseBackToList} elevation={18}>
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
                                    <DialogContentText id="alertdDialogTitleBackToList" className={classes.dialogBackToListTitle}>
                                        Confirmation
                                    </DialogContentText>
                                    <DialogContentText id="alertDialogDescriptionBackToList" className={classes.dialogBackToListDescription}>
                                        <p>Do you want to save changes to this document before closing?</p>
                                        <p>Unsaved changes will be lost.</p>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Grid container spacing={2}>
                                        <Grid container item xs={6} justify="center">
                                            <Button id="alertDialogButtonCancelForCreateClient"
                                                    className={classes.dialogCancelButton}
                                                    onClick={handleCloseBackToList}
                                                    color="primary"
                                            >
                                                Cancel
                                            </Button>
                                        </Grid>
                                        <Grid container item xs={6} justify="center">
                                            <Button
                                                id="alertDialogButtonProceedForCreateClient"
                                                className={classes.dialogProceedButton}
                                                href="./list"
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
  );
};

function formatDate(dateString) {
    if (dateString === "") {
        return dateString;
    };

    const dateArray = dateString.split("/");
    const [day, month, year] = dateArray;
    const newDate =  new Date(year, month-1, day);

    const moment = require('moment');
    const newDateFormat = moment(newDate).format('YYYY-MM-DD');
    return newDateFormat;
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TransitionCreateProject = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateProject() {
    return (
        <SnackbarProvider maxSnack={1}>
            <CreateProjectPage />
        </SnackbarProvider>
    );
};
