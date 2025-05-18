import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from "react";
import Navbar from "./components/Navbar";
import CustomersListPage from "./pages/CustomersListPage";
import SpecificCustomerPage from "./pages/SpecificCustomerPage";
import NotFoundPage from "./pages/NotFoundPage";

const UsersContext = createContext();

function App() {
  // const [test, setTest] = useState("testing data");
  return (
    <>
      <Navbar />
      {/* <UsersContext value={{ test, setTest }}> */}
        <BrowserRouter>
          <Routes>
            <Route path="/customers" element={<CustomersListPage />} />
            <Route path="/customers/:id" element={<SpecificCustomerPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      {/* </UsersContext> */}
    </>
  );
}

export default App;
