import React, { useContext } from 'react';
import { WorkerContext } from './context/WorkerContext';
import { AdminContext } from './context/AdminContext';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components & Pages
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import AllBookings from './pages/Admin/AllBookings';
import AddWorker from './pages/Admin/AddWorker';
import WorkersList from './pages/Admin/WorkersList';
import Login from './pages/Login';


import WorkerDashboard from './pages/Worker/WorkerDashboard';
import WorkerBookings from './pages/Worker/WorkerBookings';
import WorkerProfile from './pages/Worker/WorkerProfile';

const App = () => {

  const { wToken } = useContext(WorkerContext);
  const { aToken } = useContext(AdminContext);

  return wToken || aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
	  {/* Admin Routes */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-bookings' element={<AllBookings />} />
          <Route path='/add-worker' element={<AddWorker />} />
          <Route path='/worker-list' element={<WorkersList />} />

	  {/* Worker Routes */}
          <Route path='/worker-dashboard' element={<WorkerDashboard />} />
          <Route path='/worker-bookings' element={<WorkerBookings />} />
          <Route path='/worker-profile' element={<WorkerProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  );
};

export default App;
