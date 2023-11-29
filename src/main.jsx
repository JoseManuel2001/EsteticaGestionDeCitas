import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import "./Styles/index.css";
import Login from "./Login";
import LoginS from "./SecondLogin";
import Registro from "./Registro";
import App from "./App"
import App2 from "./App2"
import Reportes from "./Reportes"
import EditarCitas from "./EditarCitas"
import Registrar from "./Registrar"
import { UserProvider } from "./UserContext";


const rootElement = document.getElementById("root");
render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/LoginS" element={<LoginS />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/App" element={<App />} />
        <Route path="/App2" element={<App2 />} />
        <Route path="/editarCitas/:id" element={<EditarCitas />} />
        <Route path="/Registrar" element={<Registrar />} />
        <Route path="/Reportes" element={<Reportes />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>,


  rootElement
);