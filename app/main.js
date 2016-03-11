import React from 'react';
import { render } from 'react-dom';
import Relay, { injectNetworkLayer, DefaultNetworkLayer } from 'react-relay'
import { RelayRouter } from 'react-router-relay';
import { Route, hashHistory, IndexRedirect} from 'react-router';

import Html from './components/Html/index.jsx';
import Projekt from './components/Projekt/index.jsx';
import Helfen from './components/Helfen/index.jsx';
import Stories from './components/Stories/index.jsx';
import Kontakt from './components/Kontakt/index.jsx';


const api = 'https://api.alpha.graph.cool/graphql/cilkohu7e00063mi6s5sjtrqn'
injectNetworkLayer(new DefaultNetworkLayer(api))

export function saveToken (token: string): void {
  window.localStorage.setItem('token', token)
}

const ViewerQuery = {
  viewer: (Component) => Relay.QL`
    query {
      viewer {
        ${Component.getFragment('viewer')}
      }
    }
  `
};

render(
  <RelayRouter history={hashHistory}>
    <Route path="/" component={Html}>
      <IndexRedirect to="/stories" />
      <Route path="projekt" component={Projekt}/>
      <Route path="helfen" component={Helfen}/>
      <Route path="stories" component={Stories} queries={ViewerQuery} />
      <Route path="kontakt" component={Kontakt}/>
    </Route>
  </RelayRouter>,
  document.getElementById('root')
);
