import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import ProtectedRoute from './components/Helpers/ProtectedRoute';
import Home from './components/Home';
import Login from './components/Login/Login';
import Photo from './components/Photo/Photo';
import User from './components/User/User';
import { UserStorage } from './UserContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <Route
              path="conta/*"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route path="foto/:id" element={<Photo />}></Route>
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </>
  );
}

export default App;
