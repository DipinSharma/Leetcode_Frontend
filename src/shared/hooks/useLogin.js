import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { apiClient } from "../services/api-client";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const login = async (email, password, name) => {
        setIsLoading(true);
        setError(null);
        const response = await apiClient.post(process.env.REACT_APP_LOGIN, {
            email, password
        })
        // console.log(response.data);
        // const json = await response.json();
        if (response.data.message!='Signing In Successfully') {
            setIsLoading(false);
            setError(response.data.message);
        }
        else{
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(response.data));
            // update the auth context
            dispatch({ type: 'LOGIN', payload: response });
            setIsLoading(false);
        }
    }
    return { login, isLoading, error };
}
