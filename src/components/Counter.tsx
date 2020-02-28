import React, { Component, MouseEvent, ChangeEvent } from 'react';
import withBorder from './withBorder';

interface ICounterProps{
    title: string;
}

export class Counter extends Component<ICounterProps>{

    //ES 7
    state = {
        count: 0,
    };
    inputRef: any;


    constructor(props: ICounterProps){
        super(props);

        //ES6
        this.inc = this.inc.bind(this);

        //ES6
        // this.state = {
        //     count: 0
        // }
    }

    inc(evt : MouseEvent<HTMLButtonElement>){
        
        //console.log("in inc...", evt);
        
        evt.persist();
        
        //this.state.count++;
        const updatedCount = this.state.count + 1;
        //Async
        this.setState({
            count: updatedCount
        }, () => {
            console.log("count: ", this.state.count);
        });
        
    }

    //ES7
    decr = () => {
        const updatedCount = this.state.count - 1;
        this.setState({
            count: updatedCount
        }, () => {
            console.log("count: ", this.state.count);
        });
    }

    change = (evt: ChangeEvent<HTMLInputElement>)=> {

        const value = evt.target.value;
        this.setState({
            count: value ? parseInt(value) : 0
        });

    }

    update = () => {

        if(this.inputRef.value){
            this.setState({
                count: parseInt(this.inputRef.value)
            });
        }
        
    }
    setInputRef = (ref : any)=> {
        this.inputRef = ref;
    }

  
    render(){
        return (
            <div>
                <h3>Counter</h3>
                <h4>{this.props.title.toUpperCase()}:{this.state.count}</h4>
                <div>
                    <button onClick={this.inc}>Increment</button> &nbsp;
                    <button onClick={this.decr}>Decrement</button>
                </div>
                <div>
                    {/* Controlled Input */}
                    Counter: <input  type="number" 
                                data-testid="ctr" 
                                value={this.state.count}
                                onChange={this.change} />
                </div>
                <div>
                    {/* Uncontrolled Input */}
                    Update: <input type="number"  ref={this.setInputRef}/> &nbsp; 
                    <button onClick={this.update}>Update</button>
                </div>
                
            </div>
        );
    }
}

const hoc = withBorder(Counter);
export default hoc;