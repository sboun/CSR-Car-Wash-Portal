import { createContext } from "react";

export const CustomersContext = createContext({
  customers: [],
  setCustomers: () => {},
});
