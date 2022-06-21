import { Card, Container, Button, Row, Col, Modal } from 'react-bootstrap';
import { useState } from 'react';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="img/default.jpg" />
            <Card.Body>
              <Card.Title>Pokemon</Card.Title>
              <Card.Text>
               Click on More to view in details
              </Card.Text>
              <Button variant="primary" onClick={handleShow}>More</Button>
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
