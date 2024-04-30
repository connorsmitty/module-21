
import { gql } from '@apollo/client';

// Define your GraphQL query
export const GET_ME = gql`
  query Me {
    me {
      id
      username
      email
      // Add other fields you want to retrieve for the logged-in user
    }
  }
`;
