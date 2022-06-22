import { useState } from 'react';
import useFetch from './components/composables/useFetch';
import { FaEye } from 'react-icons/fa';
import { Card, Container, Button, Row, Col, Modal } from 'react-bootstrap';


function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   //State Hook
  const {data: tasks, isLoading, isError} = useFetch('http://localhost:8080/tasks')

  const changeCardColor = (st)=>{
    if(st === 'completed'){
      return 'success'
    }else if(st === 'pending'){
      return 'warning'
    }else if(st === 'ongoing'){
      return 'primary'
    }else{
      return 'secondary'
    }
  }

  const getTaskById = (id)=>{
    const {data: task, isLoading, isError} = useFetch('http://localhost:8080/tasks/' + id)
    console.log(task)
  }

  return (
    <Container>
      { isError && <div>{ isError }</div> }
      { isLoading && <div>Loading...</div> }
      <Row>
        {tasks 
        ? 
        tasks.map((task)=>(
          <Col sm={3} className="p-3" key={task.id}>
            <Card style={{ width: '18rem' }} bg={changeCardColor(task.status)}  onClick={handleShow}>
              <Card.Img variant="top" src={task.image} />
              <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>
                  {task.author}
              </Card.Text>
              <div className="d-flex flex-row-reverse">
                  <Button variant="secondary" onClick={getTaskById(task.id)}><FaEye /></Button>
              </div>
              </Card.Body>
            </Card>
          </Col>
      ))
        : <p>No data found</p>}
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
