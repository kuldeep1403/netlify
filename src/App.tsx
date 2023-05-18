import { Route, Routes } from "react-router-dom";
import Form from "./Form";
import Table from "./Table";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/Table" element={<Table />} />
    </Routes>
  );
}

export default App;
