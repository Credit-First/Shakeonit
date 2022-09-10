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
import Buyer from './pages/client/buyer';

function App() {
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
      <Route path='/buyer/:collectionId' element={<Buyer />} />
    </Routes>
  );
}

export default App;
