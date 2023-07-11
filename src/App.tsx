import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Migration from './pages/Migration';
import Auth from './pages/Auth';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="app-main">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/auth" element={<Auth />}></Route>
              <Route path="/migration" element={<Migration />}></Route>
              {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
