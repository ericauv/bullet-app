import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import App from './App';
import PageNotFound from './PageNotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" />
        <Route
          path="/monthly/:year/:month/"
          render={props => <App renderComponent="monthly" {...props} />}
        />
        <Route
          path="/daily/:year/:month/:day"
          render={props => <App renderComponent="daily" {...props} />}
        />
        <Route
          path="/activities/"
          render={props => <App renderComponent="activities" {...props} />}
        />
        {/* TODO in App: Have 'not found' routing for invalid days/months/years*/}
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
