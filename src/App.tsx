import './App.css';

import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import TodoApp from './todoApp';
const client = new ApolloClient({
  uri: 'https://api-eu-central-1.graphcms.com/v2/ckb1fr2fw0dqb01yyfhdw213w/master'
})
function App() {
  return (
    <ApolloProvider client={client}>
      <TodoApp />
    </ApolloProvider>
  );
}

export default App;
