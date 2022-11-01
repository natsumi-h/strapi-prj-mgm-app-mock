import { useState } from "react";

export const useEndpointSwitcher = () => {
  const [field, setField] = useState("");
  const [value, setValue] = useState("");

  const [orderBy, setOrderBy] = useState("updatedAt");
  const [ascDesc, setAscDesc] = useState("desc");
  const [ascDescId, setAscDescId] = useState("desc");
  const [ascDescCreatedAt, setAscDescCreatedAt] = useState("desc");
  const [ascDescUpdatedAt, setAscDescUpdatedAt] = useState("desc");
  const [ascDescSales, setAscDescSales] = useState("desc");

  const [endpointType, setEndpointType] = useState("sort");

  const handleEndpointSwitcher = (e, endpointType) => {
    if (endpointType == "search") {
      setEndpointType(() => {
        return "search";
      });
      setField(() => {
        return e.target.id;
      });
      setValue(() => {
        return e.target.value;
      });
    } else if (endpointType == "sort") {
      setEndpointType(() => {
        return "sort";
      });
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
    }
  };

  return {
    endpointType,
    field,
    value,
    orderBy,
    ascDesc,
    ascDescId,
    ascDescCreatedAt,
    ascDescUpdatedAt,
    ascDescSales,
    handleEndpointSwitcher,
    setAscDesc,
    setEndpointType,
  };
};
