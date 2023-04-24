import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react'
import Sidebaradmin from './sidebaradmin';
import Sidebaruser from './sidebaruser';
import Signin from './pages/Signin';
import Sidebardata from './component/Sidebardata';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

function App() {

  const displayname = sessionStorage.getItem('displayname');
  const accountType = sessionStorage.getItem('account_type');

  useEffect(() => {
    console.log(displayname)
    console.log(accountType)
    console.log(window.location.pathname)
  })

  if (!displayname) {
    if (window.location.pathname.startsWith('/repairS') || window.location.pathname.startsWith('/room')) {
      return <Sidebardata />;
    }
    else{
      return <Signin />;
    }
    
  } else {
    if (window.location.pathname.startsWith('/repairS') || window.location.pathname.startsWith('/room')) {
      return <Sidebardata />;
    }
    if(displayname==="ธนภัทร์ อนุศาสน์อมรกุล"|| displayname==="ฐิตินันท์ ขันทอง"||displayname==="admin"){
      return <Sidebaradmin />;
    }
    return <Sidebaruser />;
  }
}

export default App