import { API_URL } from "../config";
import { useFetcher } from "../hooks/useFetcher";
import { useDispatch, useSelector } from "react-redux";
import { newPageNumber } from "../state/endpointSlice";
// import { newAscDescCreatedAt } from "../state/endpointSlice";

export default function Pagination(props) {
  // const {
  //   // token,
  //   // endpointType,
  //   // setEndpointType,
  //   field,
  //   value,
  //   // pageNumber,
  //   // setPageNumber,
  // } = props.props;

  // 分割代入
  const { pageNumber, endpointType } = useSelector((state) => state.endpoint);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // レコード数をカウントするためだけのURL
  // const url =
  //   endpointType == "sort"
  //     ? `${API_URL}/projects?populate=*&sort[0]=updatedAt:desc&pagination[page]=${pageNumber}&pagination[pageSize]=10`
  //     : `${API_URL}/projects?populate=*&filters[${field}][$eqi]=${value}`;

  const url = `${API_URL}/projects?populate=*&sort[0]=updatedAt:desc&pagination[page]=${pageNumber}&pagination[pageSize]=10`;

  const { data, error } = useFetcher(url, token);
  const PageCount = data ? data.meta.pagination.pageCount : "";
  //mapメソッドでpageCount分の数の配列を返す。//0,1,2,3,4
  const range = [...Array(PageCount).map((_, i) => PageCount + i)];

  // const handleClickPageNumber = (e) => {
  //   setEndpointType(() => {
  //     return "sort";
  //   });

  //   if (e == "prevButton") {
  //     setPageNumber((prev) => prev - 1);
  //   } else if (e == "nextButton") {
  //     setPageNumber((prev) => prev + 1);
  //   } else {
  //     setPageNumber(e);
  //   }
  // };

  return data ? (
    <ul className="flex justify-center items-center -space-x-px mt-4">
      <li>
        {pageNumber == "1" ? (
          <div className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-gray-100 rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        ) : (
          <button
            // onClick={() => handleClickPageNumber("prevButton")}
            onClick={() => dispatch(newPageNumber("prevButton"))}
            href="#"
            className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        )}
      </li>
      {range.map((_, index) => (
        <li key={index}>
          {index + 1 == pageNumber ? (
            <div className="py-2 px-3 leading-tight text-gray-500 bg-gray-100 border border-gray-300  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ">
              {index + 1}
            </div>
          ) : (
            <button
              className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              // onClick={() => handleClickPageNumber(index + 1)}
              onClick={() => dispatch(newPageNumber(index + 1))}
            >
              {index + 1}
            </button>
          )}
        </li>
      ))}
      <li>
        {pageNumber == range.length ? (
          <div className="block py-2 px-3 leading-tight text-gray-500 bg-gray-100 rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        ) : (
          <button
            // onClick={() => handleClickPageNumber("nextButton")}
            onClick={() => dispatch(newPageNumber("nextButton"))}
            href="#"
            className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        )}
      </li>
    </ul>
  ) : (
    <></>
  );
}
