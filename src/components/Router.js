import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import App from './App';
import Nav from './Nav';
import PageNotFound from './PageNotFound';
const today = new Date();

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <Redirect
                to={`/daily/${today.getFullYear()}/${today.getMonth() +
                  1}/${today.getDate()}`}
              />
            );
          }}
        />
        <Route
          path="/monthly/:year/:month/"
          render={props => (
            <>
              <Nav title="Monthly" />
              <App renderComponent="monthly" {...props} />{' '}
            </>
          )}
        />
        <Route
          path="/daily/:year/:month/:day"
          render={props => (
            <>
              <Nav title="Daily" /> <App renderComponent="daily" {...props} />
            </>
          )}
        />
        <Route
          path="/activities/"
          render={props => (
            <>
              <Nav title="Manage Activities" />{' '}
              <App renderComponent="activities" {...props} />
            </>
          )}
        />
        {/* TODO in App: Have 'not found' routing for invalid days/months/years*/}
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
