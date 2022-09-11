import { Routes, Route, BrowserRouter } from "react-router-dom";

function RoutesApp() {
    return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Hello world</h1>}/>
        </Routes>
    </BrowserRouter>
    )
  }
  export default RoutesApp;