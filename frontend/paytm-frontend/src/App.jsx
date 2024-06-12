import { Routes ,BrowserRouter , Route } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Signup  from './components/signup';
import Signin from './components/signin';
import './App.css'
import Dashboard from './components/dashboard';
import Transfer from './components/transfer';

function App() {
  return <>
     <BrowserRouter> 
       <Routes>
          <Route path="/signup"  element = {<Signup></Signup>}></Route>
          <Route path="/signin" element= {<Signin></Signin>}></Route>
          <Route path="/dashboard" element = {<Dashboard></Dashboard>}></Route>
          <Route path="/transfer" element = {<Transfer></Transfer>}></Route>
       </Routes>
     </BrowserRouter>
  </>
}

export default App
