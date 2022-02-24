import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from 'pages/project/Project';
import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Sidebar />
        <div className='container'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='create' element={<Create />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path='projects/:id' element={<Project />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
