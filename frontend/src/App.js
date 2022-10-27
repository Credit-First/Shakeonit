import { useState } from 'react';
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
import Jitsi from "./pages/client/jitsi";
import Header from './components/Header';
import Footer from './components/Footer';
import Web3Provider from './providers/web3Provider';
import NftProvider from './providers/nftProvider';
import TokenProvider from './providers/tokenProvider';
import CollectionItems from './pages/trade/collectionItems';
import Layout from './components/Layout';

function App() {
  const [isOpened, setOpened] = useState(false);
  const [isOpen, setOpen] = useState(false);

  var path = window.location.hash.split('/')[1];

  if (path === 'jitsi') {
    return (
      <Box style={{minHeight : "100vh", position : "relative"}}>
        <Routes>
          <Route path="/jitsi/:roomName/:displayName" element={<Jitsi />} />
        </Routes>
      </Box>
    )
  }

  return (
    <Web3Provider>
      <NftProvider>
        <TokenProvider>
          <Box style={{minHeight : "100vh", position : "relative"}}>
            <Layout>
              <Header isOpen={isOpen} isOpened = {isOpened} setOpen = {setOpen} setOpened = {setOpened} />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/collections' element={<Collections />} />
                <Route path='/collectionItems/:address' element={<CollectionItems />} />
                <Route path='/preview/:address/:tokenId' element={<Preview />} />
                <Route path='/list/:contractAddress/:tokenId' element={<List />} />
                <Route path='/company' element={<Company />} />
                <Route path='/privacypolicy' element={<PrivacyPolicy />} />
                <Route path='/resources' element={<Resources />} />
                <Route path='/service' element={<Service />} />
                {/* <Route path='/buyer/:nonce' element={<Buyer />} /> */}
                <Route path='/buyer/:contractAddress/:tokenId' element={<Buyer />} />
              </Routes>
              <Footer isOpen={isOpen} isOpened = {isOpened} setOpen = {setOpen} setOpened = {setOpened} />
            </Layout>
          </Box>
        </TokenProvider>
      </NftProvider>
    </Web3Provider>
  );
}

export default App;
