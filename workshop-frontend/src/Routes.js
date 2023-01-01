import React, { createContext, useEffect, useState } from 'react'
import Signin from './views/Signin/Signin';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './views/Dashboard/Dashboard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SigninContext } from './storage/SigninContext';


toast.configure();


export default function Routes() {
    const check = localStorage.token ? true : false;
    const [isLoggedin, setIsLoggedin] = useState(check);


    useEffect(() => {
        const fetchApi = async () => {
            const response = await fetch('http://localhost:8000/api/auth/verify', {
                method: 'GET',
                headers: { token: localStorage.token }
            });
            const resParse = await response.json();

            resParse.user_id ? setIsLoggedin(true) : setIsLoggedin(false);
        }
        fetchApi();
    }, []);

    // const handleSignin = (loggedin) => {
    //     setIsLoggedin(loggedin);
    // }

    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     toast.success("Successfully Loggedout!")
    //     handleSignin(false);
    // }


    return (
        <SigninContext.Provider value={[isLoggedin, setIsLoggedin]}>
            <Router>
                <Switch>
                    {!isLoggedin && <Route path='/login' render={props => <Signin {...props} />} exact />}
                    {isLoggedin && <Route path='/dashboard/home' render={props => <Dashboard {...props} />} exact />}
                    {!isLoggedin && <Redirect to='/login' />}
                    {isLoggedin && <Redirect to='/dashboard/home' />}
                </Switch>
            </Router>
        </SigninContext.Provider>
    )


}
