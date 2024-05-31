import { useState, createContext, useReducer, useEffect } from "react";
import ReactDOM from "react-dom/client";
import reducer from './reducer';
import { CHANGE_ERROR, CHANGE_TOKEN, CHANGE_LOADING, CHANGE_USER, CHANGE_SCHEDULES } from './actions';
import axios from 'axios';
import { useAlert } from 'react-alert'

import {APIURL} from '../../const';


const UserContext = createContext();

const initialState = {
    user: null,
    token: null,
    isLoading: true,
    error: null,
    schedules: []
};

const UserProvider = ({ children }) => {
    const [userState, dispatch] = useReducer(reducer, initialState);
    const alert = useAlert()

    const URL = APIURL;


    const init = async () => {
        console.log('init');
        const token = localStorage.getItem('token');
        if (token) {
        console.log('token');

            dispatch({
                type: CHANGE_LOADING,
                payload: true,
            });
            console.log('loder on');
            await getUser(token);
            dispatch({
                type: CHANGE_LOADING,
                payload: false,
            });
            console.log('loder off');

        }
    }

    const getUser = async (token) => {


        try {
            const response = await axios.get(`${URL}/api/users/me/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });

            dispatch({
                type: CHANGE_USER,
                payload: response.data,
            });
            dispatch({
                type: CHANGE_TOKEN,
                payload: token,
            });
            
            getSchedules(token);
            
            return response.data;
        } catch (error) {
            console.log(error);
        }
        

    }


    const signInWithGoogle = async (access_token) => {
        dispatch({ type: CHANGE_LOADING, payload: true });
        try {
            const response = await axios.post(`${URL}/dj-rest-auth/google/`, {
                access_token,
            });
            
            localStorage.setItem('token', response.data.key);

            
            dispatch({ type: CHANGE_TOKEN, payload:  response.data.key });
            getUser(response.data.key);
            return true;
            
        } catch (error) {
            console.log(error);
            alert.error('Something went wrong');
            return false;
        } finally {
            dispatch({ type: CHANGE_LOADING, payload: false });
        }
    }

    const signOut = async () => {
        dispatch({ type: CHANGE_LOADING, payload: true });
        try {
            localStorage.removeItem('token');
            dispatch({ type: CHANGE_USER, payload: null });
            dispatch({ type: CHANGE_TOKEN, payload: null });
            dispatch({ type: CHANGE_SCHEDULES, payload: [] });
        } catch (error) {
            console.log(error);
        } finally {
            dispatch({ type: CHANGE_LOADING, payload: false });
        }
    }


    const updateProfileUrl = async (profile_url) => {
        dispatch({ type: CHANGE_LOADING, payload: true });
        try {
            const response = await axios.post(`${URL}/api/users/set_profile_url/`, {
                profile_url,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${userState.token}`
                }
            });
            
            dispatch({ type: CHANGE_USER, payload: response.data });
            const token = localStorage.getItem('token');
            await getUser(token);
            return true;
            
        } catch (error) {
            console.log(error);
            alert.error('Something went wrong');
            return false;
        } finally {
            dispatch({ type: CHANGE_LOADING, payload: false });
        }
    }


    const getSchedules = async (token) => {
        dispatch({ type: CHANGE_LOADING, payload: true });
        try {
            const response = await axios.get(`${URL}/api/schedules/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });
            
            dispatch({ type: CHANGE_SCHEDULES, payload: response.data });
            return true;
            
        } catch (error) {
            console.log(error);
            alert.error('Something went wrong');
            return false;
        } finally {
            dispatch({ type: CHANGE_LOADING, payload: false });
        }
    }


    const addSchedule = async (requestData) => {
        dispatch({ type: CHANGE_LOADING, payload: true });
        try {
            const response = await axios.post(`${URL}/api/schedules/add/`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${userState.token}`
                }
            });
            
            getSchedules(userState.token);
            
        } catch (error) {
            console.log(error);
            alert.error('Something went wrong');
        } finally {
            dispatch({ type: CHANGE_LOADING, payload: false });
        }
    }


    useEffect(() => {
        init();
    }, []);

    return (
        <UserContext.Provider value={{ userState, signInWithGoogle, updateProfileUrl, addSchedule, signOut }}>
        {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };