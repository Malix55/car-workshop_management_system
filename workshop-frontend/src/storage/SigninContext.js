import { createContext } from "react";

export const SigninContext = createContext({
    isLoggedin:false,
    setIsLoggedin:()=> {}
});

