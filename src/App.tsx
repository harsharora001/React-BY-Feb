import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from './components/Hello';
import Welcome from './components/Welcome';
import Counter from './components/Counter';
import ListCustomers from './components/ListCustomers';

import ReduxCounter from './components/ReduxCounter';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { AppContext } from './context/AppContext'
import Login from './components/Login';
import ListCustomersError from './components/ListCustomersError';
import AppErrorBoundary from './components/AppErrorBoundary';


//import Search from './components/Search';
const Search = React.lazy(() => import('./components/Search'));

function App() {
  return (

    <AppErrorBoundary>
      <Router>
        <AppContext.Provider value={{
          appName: "The React Application",
          userName: "Anil Joseph",
          setAppname: function (appName: string) {
            this.appName = appName
          }
        }}>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
        </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
        </a>
            </header>

            <section>
              <section>
                <nav>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/counter">Counter</Link>
                    </li>
                    <li>
                      <Link to="/search">Search</Link>
                    </li>
                    <li>
                      <Link to="/customers">Customers</Link>
                    </li>
                    <li>
                      <Link to="/errors">ErrorDemo</Link>
                    </li>
                    <li>
                      <Link to="/redux">Redux</Link>
                    </li>
                  </ul>
                </nav>
              </section>

              <section>
                <Route path="/" exact component={Hello} />
                <Route path="/counter" render={() => <Counter title="the count" />} />
                <Suspense fallback={<div>Loading...</div>}>
                  <Route path="/search" component={Search} />
                </Suspense>
                <Route path="/customers" component={ListCustomers} />
                <Route path="/redux" component={ReduxCounter} />
                <Route path="/login" component={Login} />
                <Route path="/errors" component={ListCustomersError} />
              </section>
            </section>
          </div>
        </AppContext.Provider>
      </Router>
    </AppErrorBoundary>
  );
}

export default App;
