import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Auth2 from './pages/Auth2';
import Migration from './pages/Migration';
import Completed from './pages/Completed';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="app-main">
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0vh 1vw 6vh 1vw'}}>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/auth" element={<Auth />}></Route>
                <Route path="/auth2" element={<Auth2 />}></Route>
                <Route path="/migration" element={<Migration />}></Route>
                <Route path="/completed" element={<Completed />}></Route>
                {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
