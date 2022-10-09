import useSWR from "swr";
import axios from "axios";

export const useFetcher = (url, token) => {
  const fetcher = () =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);

  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    error,
  };
};
