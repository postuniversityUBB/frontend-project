import React from 'react'
import { useEffect, useState } from 'react'
import { getUserByCode } from '../../../api/api'

const useCurentUser = ({usercode}) => {

    const [user, setUser] = useState()

    useEffect(() => {
        const fetchData = async () => {
        const data = await getUserByCode(usercode)
        setUser(data)

        }
        if(usercode) fetchData()

    }, [])

    return user
}

export default useCurentUser
