import React, {Component} from 'react';

interface AppErrorBoundaryProps{

}
interface AppErrorBoundaryState{
    error: any,
    info?: any
}

class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {

    state = {
        error: null,
        info: null
    }


    componentDidCatch(error: any, info: any){

        this.setState({
            error, info
        });
    }

     render(){

        if(this.state.error){
            return (
                <div>
                    <h3>Something went wrong</h3>

                    {/* <p>Error: {this.state.info ? this.state.info.componentStack: null}</p> */}
                </div>
            )
        }
        else{
            return this.props.children;
        }

         
     }

}

export default AppErrorBoundary;