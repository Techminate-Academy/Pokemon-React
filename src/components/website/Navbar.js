import { Container, Navbar, Nav } from 'react-bootstrap';

const Topnav = () => {
    return (  
        <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
    );
}
 
export default Topnav;