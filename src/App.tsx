import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Welcome from './pages/Welcome';
import CreateToken from './pages/CreateToken';
import Guide from './pages/Guide';
import TokenGuide from './pages/TokenGuide';
import TokenDetails from './pages/TokenDetails';

function getLibrary(provider: any) {
  return new Web3Provider(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/create" element={<CreateToken />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/guide" element={<TokenGuide />} />
          <Route path="/token-details" element={<TokenDetails />} />
        </Routes>
      </Router>
    </Web3ReactProvider>
  );
}

export default App;