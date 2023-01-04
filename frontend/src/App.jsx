import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/Auth";
import Login from "./Login/Login";
import Protected from "./context/Protected";
import Todo from "./Main/Todo";
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/todo"
              element={
                <Protected>
                  <Todo />
                </Protected>
              }
            />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
