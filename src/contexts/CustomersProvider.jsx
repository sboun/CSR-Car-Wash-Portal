import {useState, useEffect } from "react";
import data from "../data/moretest.json";
import { CustomersContext } from './CustomersContext';


export function CustomersProvider({ children }) {
  const [customers, setCustomers] = useState(() => {
    const localData = localStorage.getItem("customers");
    return localData ? JSON.parse(localData) : data;
  });

  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
    console.log(customers);
  }, [customers]);

  return (
    <CustomersContext.Provider value={{ customers, setCustomers }}>
      {children}
    </CustomersContext.Provider>
  );
}