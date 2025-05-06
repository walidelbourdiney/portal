import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axiosInstance";
import Customer from "../Customer";

const fetchPaginatedCustomers = async ({ queryKey }) => {
  const [_key, page] = queryKey;
  const response = await axiosInstance.get("/customers", {
    params: {
      page,
      limit: 10,
    },
  });
  return response.data;
};

const Customers = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["customerData", page],
    queryFn: fetchPaginatedCustomers,
    keepPreviousData: true,
  });
  console.log(data);

  if (isLoading)
    return (
      <div className="text-center text-2xl text-primary mt-10 animate-bounce">
        Loading...
      </div>
    );

  if (isError) return <div>Error loading user data: {error.message}</div>;

  const customersData = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="flex flex-col gap-4 w-full h-full p-4">
      {customersData.map((customer) => (
        <Customer
          key={customer?.user?.id ?? "unknown-id"}
          name={customer?.user?.full_name ?? "N/A"}
          email={customer?.user?.email ?? "N/A"}
          phone={customer?.user?.phone ?? "N/A"}
          country={customer?.country?.nameEN ?? "N/A"}
          city={customer?.city?.nameEN ?? "N/A"}
          id={customer?.user?.id ?? "N/A"}
          active={customer?.user?.status ?? "N/A"}
        />
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        {/* Previous Button */}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-3 py-2 rounded-md border text-sm transition-all 
      ${
        page === 1
          ? "bg-border text-secondary-dark cursor-not-allowed"
          : "bg-primary text-white hover:bg-primary-dark"
      }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: 5 }, (_, i) => {
          const startPage = Math.max(
            1,
            Math.min(meta.totalPages - 4, page - 2)
          );
          const pageNumber = startPage + i;
          if (pageNumber > meta.totalPages) return null;

          const isActive = page === pageNumber;
          return (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`px-3 py-2 rounded-md border text-sm transition-all 
          ${
            isActive
              ? "bg-primary-dark text-white font-semibold"
              : "bg-primary-light text-white hover:bg-primary"
          }`}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, meta.totalPages))}
          disabled={page === meta.totalPages}
          className={`px-3 py-2 rounded-md border text-sm transition-all 
      ${
        page === meta.totalPages
          ? "bg-border text-secondary-dark cursor-not-allowed"
          : "bg-primary text-white hover:bg-primary-dark"
      }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Customers;
