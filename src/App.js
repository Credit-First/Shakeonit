import './App.css';
import { Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';
import Collections from './pages/trade/collections';
import Preview from './pages/trade/preview/preview';
import List from './pages/trade/list/list';
import Company from './pages/company';
import PrivacyPolicy from './pages/privacypolicy'
import Resources from './pages/resources';
import Service from './pages/termsofservice';
import Home from './pages/home';
import Buyer from './pages/client/buyer';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {

  const [isOpened, setOpened] = useState(false);
  const [isOpen, setOpen] = useState(false);

  return (
    <Box style={{minHeight : "100vh", position : "relative"}}>
      <Header isOpen={isOpen} isOpened = {isOpened} setOpen = {setOpen} setOpened = {setOpened} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collections' element={<Collections />} />
        <Route path='/preview/:collectionId' element={<Preview />} />
        <Route path='/list/:collectionId' element={<List />} />
        <Route path='/company' element={<Company />} />
        <Route path='/privacypolicy' element={<PrivacyPolicy />} />
        <Route path='/resources' element={<Resources />} />
        <Route path='/service' element={<Service />} />
        <Route path='/buyer/:collectionId' element={<Buyer />} />
      </Routes>
      <Footer isOpen={isOpen} isOpened = {isOpened} setOpen = {setOpen} setOpened = {setOpened} />
    </Box>
  );
}

export default App;
