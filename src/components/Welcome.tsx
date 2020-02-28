import React from 'react';

interface WelcomeProps{

    message : string;
    type?: number;
}

{/* <Welcome message="abc" type={10} /> */}
const welcome = (props: WelcomeProps) => {
    return (
        <div>
            <h2>Welcome</h2>
            <p>Message: {props.message}</p>
            <p>Type: {props.type? <div>{props.type}</div> : <div>No type availbale</div>}</p>
        </div>
    );
}

export default welcome;