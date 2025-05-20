import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CustomersListPage from "./pages/CustomersListPage";
import SpecificCustomerPage from "./pages/SpecificCustomerPage";
import SpecificHistoryPage from "./pages/SpecificHistoryPage";
import NotFoundPage from "./pages/NotFoundPage";
import data from "./data/moretest.json";

export const CustomersContext = createContext();

function App() {

  //customers json data stored in localStorage
  const [customers, setCustomers] = useState(() => {
    const localData = localStorage.getItem("customers");
    return localData ? JSON.parse(localData) : data;
  });

  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
    console.log(customers);
  }, [customers]);
  
  return (
    <>
      <Navbar />
      <CustomersContext.Provider value={{ customers, setCustomers }}>
        <BrowserRouter>
          <Routes>
            <Route path="/customers" element={<CustomersListPage />} />
            <Route path="/customers/:id" element={<SpecificCustomerPage />} />
            <Route
              path="/customers/history/:id"
              element={<SpecificHistoryPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </CustomersContext.Provider>
    </>
  );
}

export default App;
