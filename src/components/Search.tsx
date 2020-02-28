import React, {Component, ChangeEvent} from 'react';
import Axios from 'axios';
import {AppContext} from '../context/AppContext';
interface ISearchProps{

}
interface ISearchState{
    searchKey: string,
    results: Array<string>
}

class Search extends Component<ISearchProps, ISearchState> {

    state = {
        searchKey: "",
        results: []
    }

    change = (evt: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            searchKey: evt.target.value
        })
    }

    search = async() => {

        //const url = "https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=" + this.state.searchKey
        const url = "https://en.wikipedia.org/w/api.php";
        const params = {
            action: "opensearch",
            origin: "*",
            search: this.state.searchKey,
            limit: 20

        }
        const response = await Axios.get(url, {params: params})
        //console.log(response)
        this.setState({
            results: response.data[1]
        });

    }

    renderResults = () => {
        
        if(this.state.results){

            return this.state.results.map((item: string, index: number) => {
                return (
                    <div>
                        <p>{item}</p>
                    </div>
                )
            })

        }
        return null;
    }

     render(){
         return (
             <div>
                 <h2>Wiki Search</h2>
                 <p>AppName: {this.context.appName}</p>
                 <p>UserName: {this.context.userName}</p>
                 <div>
                     <input value={this.state.searchKey} 
                            onChange={this.change}/> &nbsp; 
                      <button onClick={this.search}>Search</button>

                      <button onClick={() => {this.context.setAppname("Search Application"); this.forceUpdate()}}>Update AppName</button>
                 </div>

                 <div>
                     {this.renderResults() }
                 </div>
             </div>
         );
     }

}
Search.contextType = AppContext;
export default Search;
