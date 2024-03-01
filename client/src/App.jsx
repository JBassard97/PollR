import { Outlet } from 'react-router-dom';
import Nav from '../src/components/NavHeader';
import Footer from '../src/components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App
