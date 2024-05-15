import './App.css';
import CustomersList from './components/customers';
import {ApolloProvider} from '@apollo/client'
import client from './apollo-client';

function App() {
  return (
  <ApolloProvider client={client}>
    <CustomersList/>
    </ApolloProvider>
  );
}

export default App;