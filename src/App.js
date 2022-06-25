
import { Container } from 'react-bootstrap';
import Topnav from './components/website/Navbar';
import Document from './components/website/Document';

function App() {
  return (
    <>
    <Topnav />
    <Container>
      <Document />
    </Container>
    </>
  );
}

export default App;
