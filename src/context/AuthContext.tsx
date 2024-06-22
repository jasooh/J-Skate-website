// context to determine if user is logged in or not
import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';
import UserPool from '../userpool/UserPool';

interface AuthType {
    authenticate: (email: string, password: string) => Promise<String>,
    getSession: () => Promise<CognitoUserSession | undefined>,
    isLoggedIn: boolean,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
    logout: () => void
};

const AuthContext = createContext({} as AuthType);

const AuthProvider = ({children}:{children: ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const getSession = async () => {
        return await new Promise<CognitoUserSession | undefined>((resolve, reject) => {
            const user = UserPool.getCurrentUser();
            if (user) {
                user.getSession((error: Error | null, session: CognitoUserSession | null) => {
                    if (error) {
                        reject();
                    } else {
                        resolve(session || undefined);
                    }
                });
            } else {
                reject();
            }
        });
    };
    
    const authenticate = async (email: string, password: string): Promise<string> => {
        return await new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username: email,
                Pool: UserPool
            });
            
            const details = new AuthenticationDetails({
                Username: email,
                Password: password
            });
            
            user.authenticateUser(details, {
                onSuccess: (data) => {
                    resolve("Logged in: " + data);
                },
                onFailure: (error) => {
                    reject("Error: " + error);
                },
                newPasswordRequired: (data) => {
                    resolve("New password required: " + data);
                }
            });
        });
    };
    
    const logout = () => {
        const user = UserPool.getCurrentUser()
        if (user) {
            user.signOut();
            console.log("User signed out")
        }
    }

    return (
        // make authenticated object be available to all components under it
        <AuthContext.Provider value={{ authenticate, getSession, isLoggedIn, setIsLoggedIn, logout }}> 
            { children }
        </AuthContext.Provider>
    );
};

const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context
};

export { AuthProvider, useAuthContext }