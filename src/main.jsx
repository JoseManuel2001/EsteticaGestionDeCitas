import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from "./Login";
import Registro from "./Registro";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="Registro" element={<Registro />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);