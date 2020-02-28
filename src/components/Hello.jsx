import React from 'react';

const hello = (props) =>{

    //return JSX
    return (
        <div>
            <h2>Hello React</h2>
            <p>This is a functional component</p>
            <p>Generated at {new Date().toTimeString()} </p>
            <p>Message: {props.message}</p>
        </div>
    )
}
export default hello;
