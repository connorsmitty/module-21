import React from 'react';
import { useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client'; // Import useQuery and useMutation
import { GET_ME } from '../queries'; // Assuming this is the path to your queries file
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { REMOVE_BOOK } from '../mutations'; // Import the REMOVE_BOOK mutation

const SavedBooks = () => {
  const { loading, error, data } = useQuery(GET_ME); // Use useQuery to execute the GET_ME query
  const [removeBookMutation] = useMutation(REMOVE_BOOK); // Define the removeBookMutation using useMutation
  const [userData, setUserData] = useState(null);

  if (loading) return <h2>LOADING...</h2>; // Handle loading state
  if (error) {
    console.error(error);
    return <h2>Error loading data</h2>; // Handle error state
  }

  if (!data || !data.me) return <h2>No user data found</h2>; // Handle case where no user data is returned

  if (!userData) setUserData(data.me); // Set userData state once data is loaded

  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBookMutation({ // Use removeBookMutation instead of deleteBook function
        variables: { bookId }
      });

      const updatedUserData = data.removeBook; // Get updated user data from mutation response
      setUserData(updatedUserData);

      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
