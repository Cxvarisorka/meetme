import { Route, Routes } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";

// Pages
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// Components
import Nav from "./components/Nav.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";
import Feed from "./pages/Feed.jsx";


const App = () => {
  const {user, register, login, logout} = useContext(AuthContext)
  return (
    <>
    <Nav user={user} logout={logout} />
        <Routes>
          <Route path="/" element={<h1>Main Page</h1>}/>
          <Route path="/login" element={<Login login={login} />}/>
          <Route path="/register" element={<Register register={register} />}/>
          <Route path="/profile" element={<ProtectedRoute isValid={user} redirectTo={"/login"}><Profile user={user}/></ProtectedRoute>}/>
          <Route path="/feed" element={<ProtectedRoute isValid={user} redirectTo={"/login"}><Feed /></ProtectedRoute>}/>
        </Routes>
    </>
  )
}

export default App;