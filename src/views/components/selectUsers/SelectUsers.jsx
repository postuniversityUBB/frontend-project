import { InputLabel, MenuItem, Select, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getUsers } from '../../../api/api'
import { v4 as uuidv4 } from "uuid"

const useStyles = makeStyles((theme) => ({
    dropdown: {
        width: 380,
    },
}));

const SelectUsers = ({handleChangeAssignedToUserCode, register}) => {
    const classes = useStyles();

    const [users, setUsers] = useState([])
    useEffect(() => {
        (async () => {
            const data = await getUsers()
            setUsers(data)
        })() 
    }, [])

    return (
        <>
            <InputLabel id="assignedTo">
                User
			</InputLabel>
                            {/* type="text"
                            name="taskStatus"
                            {...register("taskStatus")}
                            select
                            label="Task Status"
                            value={taskStatus}
                            onChange={handleChangeTaskStatus}
                            className={classes.textField}
                            placeholder="Task Status"
                            InputLabelProps={{ shrink: true, }} */}
            <Select
                labelId="assignedToUserCode"
                id="assignedToUserCode"
                label="Role"
                onChange={e =>console.log(e)}
                {...register("assignedToUserCode")}
                className={classes.dropdown}
            >   
            {users?.map(user => {
                return <MenuItem key={uuidv4()} value={user.userCode}>{user.username}</MenuItem>
            })}
               
            </Select>
        </>
    )
}
// <MenuItem key={user.userCode} value={user.userCode}>{user.userName}</MenuItem>
export default SelectUsers
