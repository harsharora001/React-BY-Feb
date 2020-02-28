import React from 'react';


//HOC
// HOC is a function
// arg => component to be wrapped(Counter, Search)
const withBorder = (WrappedComponent: any) => {

    //return  a component
    return (props: any) => {

        return (
            <div style={{border: "2px solid blue"}}>
                <WrappedComponent {...props}/>
            </div>
        );
    }
}

export default withBorder;