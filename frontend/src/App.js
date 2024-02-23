import { Outlet } from 'react-router-dom';
import './App.css';
// import Body from './components/common/layout/Body';
import Header from './components/common/layout/Header';
import Sidebar from './components/common/layout/Sidebar';
import Body from './components/common/layout/Body';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Body />
    </div>
  );
}

export default App;
