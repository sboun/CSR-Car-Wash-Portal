import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage.jsx";
import CustomersListPage from "./pages/CustomersListPage";
import SpecificCustomerPage from "./pages/SpecificCustomerPage";
import SpecificHistoryPage from "./pages/SpecificHistoryPage";
import NotFoundPage from "./pages/NotFoundPage";
import { CustomersProvider } from "./contexts/CustomersProvider.jsx";

function App() {
  return (
    <>
      <Navbar />
      <CustomersProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/customers" element={<CustomersListPage />} />
            <Route path="/customers/:id" element={<SpecificCustomerPage />} />
            <Route
              path="/customers/history/:id"
              element={<SpecificHistoryPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </CustomersProvider>
    </>
  );
}

export default App;
