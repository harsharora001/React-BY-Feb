import React from 'react'

export const AppContext = React.createContext({
    appName: "The React App",
    userName: "Anil",
    setAppname: function(appName: string){
            this.appName = appName
        }
    
});