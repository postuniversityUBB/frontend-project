import { InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getUsers } from '../../../api/api'

const SelectUsers = ({handleChangeAssignedToUserCode, register}) => {

    const [users, setUsers] = useState([])
    useEffect(() => {
        (async () => {
            const data = await getUsers()
            setUsers(data)
        })() 
    }, [])

    return (
        <>
            <InputLabel id="demo-simple-select-outlined-label">
                User
			</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Role"
                onChange={handleChangeAssignedToUserCode}
                {...register("assignedToUserCode")}
            >   
            {users?.map(user => {
                return <MenuItem key={user.userCode} value={user.userCode}>{user.username}</MenuItem>
            })}
               
            </Select>
        </>
    )
}
// <MenuItem key={user.userCode} value={user.userCode}>{user.userName}</MenuItem>
export default SelectUsers
