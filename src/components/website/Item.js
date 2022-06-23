import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Card, Container, Button, Row, Col, Modal } from 'react-bootstrap';
import moment from 'moment';
import "../component.css";

function Item() {
  const [show, setShow] = useState(false);
  const [documents, setDocuments] = useState(null);
  const [docDetails, setdocDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setIsError] = useState(null);

  //Hook
  useEffect(()=>{
    getDocumentList()
  }, []);

  const getDocumentList = ()=>{
    const url = 'http://45.7.231.78:8000/api/v1/document/list-document/'
    // const url = 'http://localhost:8080/documents'
    fetch(url)
      .then(res => {
        if(!res.ok){
          throw Error('Failed to fetch');
        }
        return res.json()
      })
      .then(data =>{
        setDocuments(data)
        setIsLoading(false)
        setIsError(null);
      })
      .catch(err=>{
        setIsLoading(false)
        setIsError(err.message);
      })
  }

  const eyeBtn = (DocumentId)=>{
    console.log(DocumentId)
    const url = 'http://45.7.231.78:8000/api/v1/document/get-document/'
    // const url = 'http://localhost:8080/documents/'
    fetch(url + DocumentId)
      .then(res => {
        return res.json()
      })
      .then(data =>{
        console.log(data)
        setdocDetails(data[0])
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

  const changeModalColor = (st)=>{
    if(st === 'Deshabilitado'){
      return 'secondary_modal'
    }else if(st === 'Peligro'){
      return 'danger_modal'
    }else if(st === 'Cuidado'){
      return 'warning_modal'
    }else if(st === 'Bien'){
      return 'success_modal'
    }else{
      return 'primary'
    }
  }

  const formatDate = (st)=>{
    moment.locale('es');
    var localLocale = moment(st); 
    return localLocale.format('Do MMMM YYYY');
  }

  const linkOpenTo = (param)=>{
    window.open( param);
  }

  const boolToText = (param)=>{
    if(param === true){
      return 'Yes'
    }else{
      return 'False'
    }
  }

  return (
    <>
    <Container>
      <Row>
        { error && <div>{ error }</div> }
        { isLoading && <div>Loading...</div> }
        {documents 
        ? 
        documents.map((doc)=>(
          <Col xs={12} sm={6} md={6} lg={4} xl={3} className="p-3" key={doc.DocumentId}>
            <Card className='shadow-lg p-3 mb-5 rounded text-white' style={{ width: '18rem' }} bg={changeCardColor(doc.warning)} onClick={() =>eyeBtn(doc.DocumentId)}>
              <Card.Body>
              <Card.Title>Documento</Card.Title>
              <Card.Text>
                  <p><b>Rut Employee : </b>{doc.rut_employee}</p>
                  <p><b>Emited at : </b> {formatDate(doc.emited_at)}</p>
                  <p><b>Expires at : </b>{formatDate(doc.expires_at)}</p>
                  <p><b>Emitter : </b> {doc.emitter}</p>
                  <p><b>Vigency : </b> {doc.vigency}</p>
              </Card.Text>
              <div className="d-flex flex-row-reverse">
                  <Button variant="dark" onClick={() =>eyeBtn(doc.DocumentId)}><FaPlus /></Button>
              </div>
              </Card.Body>
            </Card>
          </Col>
      ))
        : <p>. . .</p>}
      </Row>

      {/* modal */}
      {docDetails 
      && 
      <Modal 
        size="lg"
        className={changeModalColor(docDetails.warning)} 
       
        show={show} 
        onHide={() =>setShow(false)}
      >
        <Modal.Body>
          <h4 className='mt-3'>Employee Details of ID : {docDetails.rut_employee}</h4>
          <Row>
          <Col xs={12} sm={6} md={6} lg={6} xl={6} className="p-3">
            <p><b>Document Id : </b>{docDetails.DocumentId}</p>
            <p><b>Emited at : </b> {formatDate(docDetails.emited_at)}</p>
            <p><b>Expires at : </b>{formatDate(docDetails.expires_at)}</p>
            <p><b>Emitter : </b> {docDetails.emitter}</p>
            <p><b>Vigency : </b> {docDetails.vigency}</p>
            <p><b>status : </b>{docDetails.status}</p>
            <p><b>comment : </b> {docDetails.comment}</p>
          </Col>
          <Col xs={12} sm={6} md={6} lg={6} xl={6} className="p-3">
            <p><b>Joined at : </b>{formatDate(docDetails.joined_at)}</p>
            <p><b>Rut employee company : </b> {docDetails.rut_employee_company}</p>
            <p><b>Required : </b> {boolToText(docDetails.is_required)}</p>
            <p><b>Warning : </b> {docDetails.warning}</p>
            <p><b>Created at : </b> {formatDate(docDetails.created_at)}</p>
            <p><b>Updated at : </b> {formatDate(docDetails.updated_at)}</p>
            <p><b>PDF file : </b> <Button variant="outline-light" onClick={() =>linkOpenTo(docDetails.file)}>Click here to view</Button></p>
          </Col>
          </Row>
          <div className="d-flex flex-row-reverse p-4">
            <Button variant="dark" onClick={() =>setShow(false)}>X</Button>
          </div>
        </Modal.Body>
      </Modal>
      }
    </Container>
    </>
  );
}

export default Item;
