import React from 'react';
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import './AdminPagce.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = () => {
  return (
    <div className="appC">
      <ToastContainer />
      <NavbarAdmin />
      <hr />
      <div className="appC__content">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
