// mutations.js

import { gql } from '@apollo/client';

// Mutation to log in a user
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        username
        email
        // Add other user fields as needed
      }
    }
  }
`;

// Mutation to add a new user
export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
        // Add other user fields as needed
      }
    }
  }
`;

// Mutation to save a book
export const SAVE_BOOK = gql`
  mutation SaveBook($input: BookInput!) {
    saveBook(input: $input) {
      id
      title
      authors
      description
      image
      link
    }
  }
`;

// Mutation to remove a saved book
export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      id
      title
      authors
      description
      image
      link
    }
  }
`;
