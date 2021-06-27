import React from 'react'
import { useEffect, useState } from 'react'
import { getUserByCode } from '../../../api/api'

const useCurentUser = ({usercode}) => {

    const [user, setUser] = useState()
    const [firstName, setFirstName] = useState()

    useEffect(() => {
        const fetchData = async () => {
        const data = await getUserByCode(usercode)
        setUser(data)
        setFirstName(data.firstName)

        }
        if(usercode) fetchData()

    }, [])

    return {user,firstName}
}

export default useCurentUser
