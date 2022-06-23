import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Card, Container, Button, Row, Col, Modal } from 'react-bootstrap';

function Item() {
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState(null);
  const [taskDetails, setTaskDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setIsError] = useState(null);

  //Hook
  useEffect(()=>{
    getTaskList()
  }, []);

  const getTaskList = ()=>{
    const url = 'http://localhost:8080/tasks'
    fetch(url)
      .then(res => {
        if(!res.ok){
          throw Error('Failed to fetch');
        }
        return res.json()
      })
      .then(data =>{
        setTasks(data)
        setIsLoading(false)
        setIsError(null);
      })
      .catch(err=>{
        setIsLoading(false)
        setIsError(err.message);
      })
  }

  const eyeBtn = (id)=>{
    console.log(id)
    const url = 'http://localhost:8080/tasks/'
    fetch(url + id)
      .then(res => {
        return res.json()
      })
      .then(data =>{
        console.log(data)
        setTaskDetails(data)
        setShow(true)
      })
      .catch(err=>{
        console.log(err)
      })
  }

  const changeCardColor = (st)=>{
    if(st === 'Deshabilitado'){
      return 'secondary'
    }else if(st === 'Peligro'){
      return 'danger'
    }else if(st === 'Cuidado'){
      return 'warning'
    }else if(st === 'Bien'){
      return 'success'
    }else{
      return 'primary'
    }
  }

  return (
    <>
    <Container>
      <Row>
        { error && <div>{ error }</div> }
        { isLoading && <div>Loading...</div> }
        {tasks 
        ? 
        tasks.map((task)=>(
          <Col xs={12} sm={6} md={6} lg={4} xl={3} className="p-3" key={task.id}>
            <Card className='shadow-lg p-3 mb-5 rounded' style={{ width: '18rem' }} bg={changeCardColor(task.status)} onClick={() =>eyeBtn(task.id)}>
              
              <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>
                  {task.author}
              </Card.Text>
              <div className="d-flex flex-row-reverse">
                  <Button variant="dark" onClick={() =>eyeBtn(task.id)}><FaPlus /></Button>
              </div>
              </Card.Body>
            </Card>
          </Col>
      ))
        : <p>No data found</p>}
      </Row>

      {/* modal */}
      {taskDetails 
      && 
      <Modal className="primary" show={show} onHide={() =>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{taskDetails.title} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className='mt-3'>Title</h4>
          <p>{taskDetails.title}</p>
          <h2>Description</h2>
          <p>{taskDetails.body}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() =>setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      }
    </Container>
    </>
  );
}

export default Item;
