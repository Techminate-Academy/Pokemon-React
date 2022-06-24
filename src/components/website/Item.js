import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Card, Container, Button, Row, Col, Modal, Form } from 'react-bootstrap';
import moment from 'moment';
import "../component.css";

function Item() {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setIsError] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [docDetails, setdocDetails] = useState(null);
  const [docSortBy, setDocSortBy] = useState('');
  const [docFilterBy, setDocFilterBy] = useState('');
  const [docSearchBy, setDocSearchBy] = useState('');

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
      return 'Si'
    }else{
      return 'No'
    }
  }

  return (
    <>
    <Container>
      <Row>
        <Col xs={12} sm={12} md={4} lg={4} xl={4} className="p-3">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Search Documento</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Type here . . ."
              value={docSearchBy}
              onChange={(e) => setDocSearchBy(e.target.value)}
            />
            </Form.Group>
          </Form>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4} className="p-3">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Sort Documento</Form.Label>
            <Form.Select 
              aria-label="Default select example"
              value={docSortBy}
              onChange={(e) => setDocSortBy(e.target.value)}
            >
              <option>Click here to select</option>
              <option value="DocumentId">Document ID</option>
              <option value="created_at">Created at</option>
              <option value="warning">Warning</option>
            </Form.Select>
          </Form.Group>
        </Form>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} xl={4} className="p-3">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Filter Documento</Form.Label>
            <Form.Select 
              aria-label="Default select example"
              value={docFilterBy}
              onChange={(e) => setDocFilterBy(e.target.value)}
            >
              <option>Click here to select</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>
        </Form>
        </Col>
      </Row>
      <Row>
        SortBy : {docSortBy}- Filter By :{docFilterBy}
      </Row>
      <Row>
        { error && <div>{ error }</div> }
        { isLoading && <div>Loading...</div> }
        {documents 
        ? 
        documents
        .filter(doc => {
          if (docSearchBy === '') {
            return doc;
          } else if (doc.rut_employee.toString().toLowerCase().includes(docSearchBy.toLowerCase())) {
            return doc;
          }else if (doc.emitter.toString().toLowerCase().includes(docSearchBy.toLowerCase())) {
            return doc;
          }else if (doc.vigency.toString().toLowerCase().includes(docSearchBy.toLowerCase())) {
            return doc;
          }else if (doc.status.toString().toLowerCase().includes(docSearchBy.toLowerCase())) {
            return doc;
          }else if (doc.rut_employee_company.toString().toLowerCase().includes(docSearchBy.toLowerCase())) {
            return doc;
          }
        })
        .sort(function (x, y) {
          if(docSortBy === 'DocumentId'){
            let a = x.DocumentId.toString(),
            b = y.DocumentId.toString();
            return a === b ? 0 : a > b ? 1 : -1;
          }else if(docSortBy === 'warning'){
            let a = x.warning.toUpperCase(),
            b = y.warning.toUpperCase();
            return a === b ? 0 : a > b ? 1 : -1;
          }
          else if(docSortBy === 'created_at'){
            let a = new Date(x.created_at);
            let b = new Date(y.created_at);
            return a === b ? 0 : a > b ? 1 : -1;
          }
        })
        .map((doc)=>(
          <Col xs={12} sm={6} md={6} lg={4} xl={3} className="p-3" key={doc.DocumentId}>
            <Card className='shadow-lg p-3 mb-5 rounded text-white' style={{ width: '18rem' }} bg={changeCardColor(doc.warning)}>
              <Card.Body>
              <Card.Title>Documento Id : {doc.DocumentId}</Card.Title>
              <Card.Text>
                  <p><b>Rut Employee : </b>{doc.rut_employee}</p>
                  <p><b>Emited at : </b> {formatDate(doc.emited_at)}</p>
                  <p><b>Emitter : </b> {doc.emitter}</p>
                  <p><b>Created at : </b>{formatDate(doc.created_at)}</p>
                  <p><b>Expires at : </b>{formatDate(doc.expires_at)}</p>
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
            <p><b>Joined at : </b>{formatDate(docDetails.joined_at)}</p>
            <p><b>Rut employee company : </b> {docDetails.rut_employee_company}</p>
          </Col>
          <Col xs={12} sm={6} md={6} lg={6} xl={6} className="p-3">
            <p><b>Required : </b> {boolToText(docDetails.is_required)}</p>
            <p><b>Warning : </b> {docDetails.warning}</p>
            <p><b>Created at : </b> {formatDate(docDetails.created_at)}</p>
            <p><b>Updated at : </b> {formatDate(docDetails.updated_at)}</p>
            <p><b>comment : </b> {docDetails.comment}</p>
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
