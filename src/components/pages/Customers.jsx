import React from "react";
// import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axiosInstance";
import Customer from "../Customer";

const Customers = () => {
  //   const { t } = useTranslation();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["customerData"],
    queryFn: async () => {
      const response = await axiosInstance.get("/customers");
      return response.data;
    },
  });
  console.log("User Data:", data);
  console.log("User loading:", isLoading);
  console.log("User error:", error);
  if (isLoading)
    return (
      <div className="text-center text-2xl text-primary mt-10 animate-bounce">
        Loading...
      </div>
    );
  if (isError) return <div>Error loading user data</div>;

  if (data) {
    const customersData = data.data;
    console.log("Data:", customersData);
    return (
      <div className="flex flex-col gap-4 w-full h-full p-4">
        {customersData.map((customer) => (
          <Customer
            key={customer.user.id}
            name={customer.user.full_name}
            email={customer.user.email}
            phone={customer.user.phone}
            country={customer.country.nameEN}
            city={customer.city.nameEN}
            id={customer.user.id}
            active={customer.user.status}
          />
        ))}
      </div>
    );
  } else {
    return <div>No data available</div>;
  }
};

export default Customers;
