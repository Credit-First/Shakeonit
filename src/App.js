import './App.css';
import { Routes, Route } from "react-router-dom";
import Collections from './pages/trade/collections';
import Preview from './pages/trade/preview/preview';
import List from './pages/trade/list/list';
import Company from './pages/company';
import PrivacyPolicy from './pages/privacypolicy'
import Resources from './pages/resources';
import Service from './pages/termsofservice';
import Home from './pages/home';
import ClientBuy from './pages/client/buy';
import { useState } from 'react';
import Example from './components/Header/example';

function App() {

const [Id, setId] = useState("0");
function getId(collectionId) {
  setId(collectionId);

}

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/collections' element={<Collections />} />
      <Route path='/preview/:collectionId' element={<Preview />} />
      <Route path='/list/:collectionId' element={<List />} />
      <Route path='/company' element={<Company />} />
      <Route path='/privacypolicy' element={<PrivacyPolicy />} />
      <Route path='/resources' element={<Resources />} />
      <Route path='/service' element={<Service />} />
      <Route path='/buy/:collectionId' element={<ClientBuy />} />
      <Route path='/example' element={ <Example /> } />
    </Routes>
  );
}

export default App;
