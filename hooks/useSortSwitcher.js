import { useState } from "react";

export const useSortSwitcher = () => {
  const [orderBy, setOrderBy] = useState("updatedAt");
  const [ascDesc, setAscDesc] = useState("desc");
  const [ascDescId, setAscDescId] = useState("desc");
  const [ascDescCreatedAt, setAscDescCreatedAt] = useState("desc");
  const [ascDescUpdatedAt, setAscDescUpdatedAt] = useState("desc");
  const [ascDescSales, setAscDescSales] = useState("desc");

  const handleSortSwitcher = (e) => {
    setOrderBy(() => {
      return e;
    });
    if (e == "id") {
      setAscDescId((prevAscDescId) => {
        if (prevAscDescId == "asc") {
          return "desc";
        } else {
          return "asc";
        }
      });
    } else if (e == "createdAt") {
      setAscDescCreatedAt((prevAscDescCreatedAt) => {
        if (prevAscDescCreatedAt == "asc") {
          return "desc";
        } else {
          return "asc";
        }
      });
    } else if (e == "updatedAt") {
      setAscDescUpdatedAt((prevAscDescUpdatedAt) => {
        if (prevAscDescUpdatedAt == "asc") {
          return "desc";
        } else {
          return "asc";
        }
      });
    } else if (e == "sales") {
      setAscDescSales((prevAscDescSales) => {
        if (prevAscDescSales == "asc") {
          return "desc";
        } else {
          return "asc";
        }
      });
    }
  };

  return {
    orderBy,
    ascDesc,
    ascDescId,
    ascDescCreatedAt,
    ascDescUpdatedAt,
    ascDescSales,
    handleSortSwitcher,
    setAscDesc,
  };
};
