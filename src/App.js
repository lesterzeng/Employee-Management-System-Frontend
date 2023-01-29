import './App.css';
import ListEmployee from './Pages/ListEmployee';
import Header from './components/Header';
import Footer from './components/Footer';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AddUpdateEmployee from './Pages/AddUpdateEmployee';
import ViewEmployee from './Pages/ViewEmployee';
import Error from './Pages/Error'
import { ToastContainer } from 'react-toastify';
import ListDepartments from './Pages/ListDepartments'
import ViewDepartments from './Pages/ViewDepartments'
import AddUpdateDepartment from './Pages/AddUpdateDepartment';
import Login from './Pages/Login';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        < div className="container">
             <Routes>
              <Route path="/" element={<Login />}></Route> 
              <Route path="/login" element={<Login />}></Route> 
              <Route path="/employees" element={<ListEmployee/>}></Route> 
              <Route path="/addupdate/:id" element={<AddUpdateEmployee />}></Route>
              <Route path="/view/:id" element={<ViewEmployee />}></Route>
              <Route path="/departments" element={<ListDepartments/>}></Route>  
              <Route path="/departments/:id" element={<AddUpdateDepartment/>}></Route>  
              <Route path="/departments/:id/employees" element={<ViewDepartments/>}></Route>  
              <Route path='*' element={<Error />}></Route>
            </Routes>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
      <ToastContainer />
    </div>
    
  );
}

export default App;
