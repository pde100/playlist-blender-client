import {useState, useEffect} from 'react'
import axios from 'axios'

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();
    const [userEmail, setUserEmail] = useState();
    const [username, setUserName] = useState();
    const [pfp, setPFP] = useState();

    


    useEffect(() => {
            axios
            .post('http://localhost:3001/login', {code}).then(res => {
                window.history.pushState({}, null, '/')
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresIn(res.data.expiresIn)
                setUserEmail(res.data.userEmail)
                setUserName(res.data.displayname)
                setPFP(res.data.pfp)
                }).catch(() => {
                    window.location = '/'
                })
    },      [code])

    useEffect(() => {
        if(!refreshToken || !expiresIn) {return}

        const interval = setInterval(() => {

            axios
            .post('http://localhost:3001/refresh', {
                refreshToken,
            })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setExpiresIn(res.data.expiresIn)
            }).catch(() => {
                    window.location = '/'
            })

        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return [accessToken, userEmail, username, pfp]
}
