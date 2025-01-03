import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import Account from './pages/Account';
import AddListing from './pages/AddListing';
import CategoryPage from './pages/CategoryPage';
import Contact from './pages/Contact';
import DeleteAccount from './pages/DeleteAccount';
import Footer from './pages/Footer';
import Home from './pages/Home';
import Listingpage from './pages/Listingpage';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Messages from './pages/Messages';
import Navbar from './pages/Navbar';
import NotFound from './pages/NotFound';
import OwnListing from './pages/OwnListing';
import PrivateRoute from './pages/PrivateRoute';
import Signin from './pages/Signin';
import ImageComponent from './pages/testi';
function App() {
  return (
  
  <Router>
  <div>
  <UserProvider>
    <Navbar></Navbar>
    
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/kuva' element={<ImageComponent/>}/>
          <Route path='/category/:category' element={<CategoryPage/>}/>
          <Route path='/listing/:idlisting' element={<Listingpage/>}/>
          <Route element={<PrivateRoute />}>
            <Route path='messages' element={<Messages/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/addListing' element={<AddListing/>}/>
            <Route path='/ownlisting/:idlisting' element={<OwnListing/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/deleteaccount' element={<DeleteAccount/>}/>
          </Route>
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
    <Footer></Footer>
    </UserProvider>
  </div>
  
  </Router>
  
  );
}

export default App;
