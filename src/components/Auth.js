import React, {useContext, useEffect} from 'react';
import AuthContext from '../auth-context';

const Auth = props => {
    const auth = useContext(AuthContext);
    useEffect(()=>{
        console.log('Auth: ', auth);
    });
    if(!auth.status){
        return <button onClick={() => {auth.login(true)}}>Log in</button>;
    }else{
        return <button onClick={() => {auth.login(false)}}>Log out</button>;
    }
};

export default Auth;