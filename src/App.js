
import { useState } from 'react';
import useFetch from './components/composables/useFetch';
import { FaEye } from 'react-icons/fa';
import { Card, Container, Button, Row, Col, Modal } from 'react-bootstrap';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   //State Hook
  const {data: tasks, isLoading, isError} = useFetch('http://localhost:8000/tasks'
  )

  return (
    <Container>
      <Row>
        <Col sm={3} className="p-3">
          <Card style={{ width: '18rem' }} bg="primary" onClick={handleShow}>
            <Card.Img variant="top" src="img/default.jpg" />
            <Card.Body>
              <Card.Title>Pokemon</Card.Title>
              <Card.Text>
              </Card.Text>
              <div className="d-flex flex-row-reverse">
                <Button variant="secondary" onClick={handleShow}><FaEye /></Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pokemon Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="img/default.jpg" />
          </Card>
          <h4>Pokemon</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit culpa</p>
          <h2>Description</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi voluptate laudantium nam recusandae, eligendi ratione voluptatibus quos inventore soluta magnam! Repellendus ipsum natus ducimus sint, culpa labore possimus quibusdam numquam.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;
