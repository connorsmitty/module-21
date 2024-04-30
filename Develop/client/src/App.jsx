import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/client'; // Import ApolloProvider
import { client } from './client'; // Import your Apollo Client instance
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <ApolloProvider client={client}> {/* Wrap your component tree with ApolloProvider and provide your Apollo Client instance */}
      <div className="App">
        <Navbar />
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
