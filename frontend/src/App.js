import './App.css';
import Body from './components/pages/Body';
import Header from './components/pages/Header';
import Sidebar from './components/pages/Sidebar';

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
