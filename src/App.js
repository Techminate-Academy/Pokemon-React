
import { Container } from 'react-bootstrap';
import Topnav from './components/website/Navbar';
import Item from './components/website/Item';

function App() {
  return (
    <>
    <Topnav />
    <Container>
      <Item />
    </Container>
    </>
  );
}

export default App;
