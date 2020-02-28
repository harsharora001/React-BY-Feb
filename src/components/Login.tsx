import React, {useState, ChangeEvent, useEffect, useContext, useRef} from 'react';
import Axios from 'axios';
import { AppContext } from '../context/AppContext';

interface LoginProps{
    history: any
}

const Login = (props : LoginProps) => {

    //const numbers = [1,2];
    //const v1 = numbers[0]
    //const v2 = numbers[1]
    //const [v1, v2]= numbers;

    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    useEffect( () => {
        console.log("in the effect");

        // iife
        // immediatly invoked function expression

        (async()=>{

            const url = "https://calm-beach-18228.herokuapp.com/customers";
            const resp =  await Axios.get(url);
            console.log("Response", resp);
        })();


        

        return () => {
            console.log("returning from effect");
        }
    },[])
    useEffect(() => {
        console.log("in the effect for id");
    },[id])
    useEffect(() => {
        console.log("in the effect for pwd");
    },[pwd])

    useEffect(() => {
        console.log("in the effect for id & pwd");
    },[id, pwd])

    const appContext = useContext(AppContext);
    let x = useRef(10);

    function changeId(evt: ChangeEvent<HTMLInputElement>){
        setId(evt.target.value);
    }

    const changePwd = (evt: ChangeEvent<HTMLInputElement>) => {
        setPwd(evt.target.value);
        x.current++;
        console.log("x: " + x.current);

    }
    const login = ()=> {

        if(!id.startsWith("x") && pwd.includes("a")){
            //successfull
            props.history.push("/customers");
        }
        else{
            //error
            alert("Invalid credentials");
        }
    }
    return (
        <div>
            <h3>Login</h3>
            <p>AppName : {appContext.appName}</p>
            <p>ID</p>
            
            <div>
                <input value={id} onChange={(evt) => setId(evt.target.value)}/>
            </div>

            <p>Password</p>
            <div>
                <input value={pwd}  type="password" onChange={changePwd}/>
            </div>
            <div>
                <button onClick={login}>Login</button>
            </div>
        </div>
    );

}

export default Login;