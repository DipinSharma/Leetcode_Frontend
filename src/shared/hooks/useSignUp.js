import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { apiClient } from "../services/api-client";
import { Navigate, useNavigate } from "react-router-dom";

export const useSignUp = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate()
    const signUp = async (email, password, name,username) => {
        setIsLoading(true);
        setError(null);
        const response = await apiClient.post(process.env.REACT_APP_SIGNUP, {
            email, password, name, username
        })
        // console.log(response.data);
        // const json = await response.json();
        if (response.data.message != 'Signing In Successfully') {

            setIsLoading(false);
            setError(response.data.message);
        }
        else {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(response.data));
            // update the auth context
            dispatch({ type: 'LOGIN', payload: response });
            setIsLoading(false);
            navigate('/allQuestions')
        }
    }
    return { signUp, isLoading, error };
}
