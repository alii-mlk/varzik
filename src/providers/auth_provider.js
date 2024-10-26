import React, { createContext, useEffect, useRef, useState } from "react";
import { API } from "../data/api";
import { isEmptyString } from "../utils/utils";
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle } from "@mui/material";

import { Link, Navigate, useNavigate } from "react-router-dom";

const LOCAL_STORAGE_USER_TOKEN = 'user-token';
export const AuthContext = createContext({
    loading: false,
    user: undefined,
    token: undefined,
    setUser: (u) => { },
    reloadUser: () => { },
    logout: () => { },
    selectedCoachId: undefined,
    setSelectedCoachId: (id) => { },
    selectedCoachLvl: undefined,
    setSelectedCoachLvl: (lvl) => { },
})
export function AuthProvider({ children }) {
    const navigate = useNavigate()
    const getLocalStorageToken = () => localStorage.getItem(LOCAL_STORAGE_USER_TOKEN)
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [token, _setToken] = useState(undefined)
    const [selectedCoachId, setSelectedCoachId] = useState(undefined)
    const [selectedCoachLvl, setSelectedCoachLvl] = useState(undefined)
    const setToken = (t) => {
        API.auth.userToken = t;
        _setToken(t);
    }
    const apiCall = useRef(undefined);
    const checkToken = async () => {
        try {
            apiCall.current = API.auth.request({
                path: '/check-token',
                method: "GET",
                additionalHeaders: { 'Authorization': `Bearer ${getLocalStorageToken()}` }
            })
            let response = await apiCall.current.promise;
            console.log("tokenresponse", response)
            if (!response.isSuccess)
                throw response;
            setToken(getLocalStorageToken());
            let _user = response.user
            if (response.user.access == 0) {

                apiCall.current = API.auth.request({
                    path: '/user/plans',
                    method: "GET",
                })
                response = await apiCall.current.promise;
                if (!response.isSuccess)
                    throw response;
                _user.plans = response.plans


                apiCall.current = API.auth.request({
                    path: '/user/diets',
                    method: "GET",
                })
                response = await apiCall.current.promise;
                if (!response.isSuccess)
                    throw response;
                _user.diets = response.diets


                apiCall.current = API.auth.request({
                    path: '/user/coaches',
                    method: "GET",
                })
                response = await apiCall.current.promise;
                if (!response.isSuccess)
                    throw response;
                _user.coaches = response.coaches
                setUser(_user)
                setLoading(false)
                navigate("/user");

            } else if (response.user.access == 1) {
                navigate("/coach-prof");
                setUser(response.user)
                console.log("go to coach prof page");
            }
        }
        catch (err) {
            console.log(err)
            localStorage.removeItem(LOCAL_STORAGE_USER_TOKEN)
            navigate("/login")
            console.log(`failed to fetch user details:`, err);
        } finally {
            setLoading(false);
        }
    };
    const logout = async () => {
        try {
            apiCall.current = API.auth.request({
                path: '/logout',
                method: "POST",
            })
            let response = await apiCall.current.promise;
            console.log(response)
            if (!response.isSuccess) throw response
            setUser(undefined)
            setToken(undefined)
        }
        catch (err) {
            console.log(err)
            alert("logout failed")
        }
    }
    useEffect(() => {
        if (!isEmptyString(getLocalStorageToken())) {
            checkToken();
        }
        else {
            navigate("/login");
            setLoading(false)
        }
    }, []);
    const value = {
        user,
        token,
        loading,
        reloadUser: checkToken,
        setUser: (u) => setUser(u),
        logout: () => logout(),
        selectedCoachId,
        setSelectedCoachId: (id) => setSelectedCoachId(id),
        selectedCoachLvl,
        setSelectedCoachLvl: (lvl) => setSelectedCoachLvl(lvl),
    };
    if (loading)
        return (
            <section style={{ width: "100%", height: "100vh", display: 'flex', alignItems: 'center', alignContent: 'center', gap: 20, flexDirection: 'column' }}>
                <div style={{ flexGrow: 1 }}></div>
                <CircularProgress size={64} />
                <p className="text-center">در حال بارگذاری...</p>
                <div style={{ flexGrow: 1 }}></div>
            </section>
        )
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return React.useContext(AuthContext);
}
