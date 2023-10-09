import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from "./Login";
import Registro from "./Registro";
import App from "./App"
import EditarCitas from "./EditarCitas"
import Registrar from "./Registrar"


const rootElement = document.getElementById("root");
render(
 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/App" element={<App />} />
        <Route path="/editarCitas/:id" element={<EditarCitas />} />
        <Route path="/Registrar" element={<Registrar />} />
      </Routes>
    </BrowserRouter>,

  
  rootElement
);