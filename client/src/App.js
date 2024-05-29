import useSelection from "antd/es/table/hooks/useSelection";
import "./App.css";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/pages/Profile";
import Admin from "./components/pages/Admin";
import SingleMovie from "./components/pages/SingleMovie";
import BookShow from "./components/pages/BookShow";
function App() {
  const { loading } = useSelector((state) => state.loader);
  const {user} = useSelector((state)=>state.user);
  // console.log(user);  
  return (
    <div>
      {loading && (
        <div className="loader-container">
          {" "}
          <div className="loader"> </div>{" "}
        </div>
      )}

      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home/> </ProtectedRoute>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>  } />
            <Route path='/admin' element={<ProtectedRoute><Admin/></ProtectedRoute> } />
            <Route path="/movie/:id" element={<ProtectedRoute><SingleMovie/></ProtectedRoute> } />
            <Route path="/book-show/:id" element={<ProtectedRoute><BookShow/></ProtectedRoute>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
