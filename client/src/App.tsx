import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from "./Home/Home";
import ChatRoom from "./ChatRoom/ChatRoom";
import { ApolloProvider } from '@apollo/client';
import { client } from './ApolloClient/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:rickId" element={<ChatRoom />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
