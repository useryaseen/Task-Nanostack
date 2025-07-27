

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout';

import BuyerMeeting from './screens/BuyerMeeting';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BuyerMeeting />} />
          <Route path="buyer-meeting" element={<BuyerMeeting />} />
         
          <Route path="*" element={<BuyerMeeting />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

