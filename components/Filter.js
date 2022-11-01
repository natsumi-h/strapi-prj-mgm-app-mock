// import { API_URL } from "../config";
// import { useFetcher } from "../hooks/useFetcher";
import { useState, useEffect } from "react";

export default function Filter(props) {
  const field = "pm";
  const [branch, setBranch] = useState("");
  const token = props.props.token;
  // const url = `${API_URL}/projects?filters[branch][$eqi]=${branch}`;
  // const { data, error } = useFetcher(url, token);

  // const onChangeHandler = (e) => {
  //   setBranch(() => {
  //     return e.target.value;
  //   });
  // };

  // console.log(branch);
  // console.log(data);

  const filterTypes = [
    {
      field: "status",
      text: "Status",
      options: [
        { text: "Lead", value: "Lead" },
        { text: "Opportunity", value: "Opportunity" },
        { text: "Dealed", value: "Dealed" },
        { text: "Closed", value: "Closed" },
        { text: "Lost", value: "Lost" },
      ],
    },
    {
      field: "updatedAt",
      text: "Updated On",
      options: [
        { text: "Area A", value: "Area A" },
        { text: "Area B", value: "Area B" },
      ],
    },
    {
      field: "area",
      text: "Area",
      options: [
        { text: "option-1", value: "option-1" },
        { text: "option-2", value: "option-2" },
      ],
    },
    {
      field: "branch",
      text: "Branch",
      options: [
        { text: "A-1", value: "A-1" },
        { text: "A-2", value: "A-2" },
      ],
    },
  ];

  return (
    <div className="m-5 flex gap-5">
      <form className="m-5 flex gap-5">
        {filterTypes.map((filterBy) => (
          <div key={filterBy.field}>
            <select
              id={filterBy.field}
              data-dropdown-toggle="dropdown"
              className="flex-shrink-0 z-10 inline-flex items-center rounded-lg py-2.5 px-4 text-sm font-medium text-center text-gray-900  border border-gray-300 dark:border-gray-700 dark:text-white  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              type="button"
              onChange={(e) => props.props.handleEndpointSwitcher(e, "search")}
            >
              <option hidden>{filterBy.text}</option>
              {filterBy.options.map((option) => {
                return (
                  <option key="value" value={option.value}>
                    {option.text}
                  </option>
                );
              })}
              <svg
                aria-hidden="true"
                className="ml-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </select>
            {/* <div
          id="dropdown"
          className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdown-button"
          >
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Shopping
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Images
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                News
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Finance
              </a>
            </li>
          </ul>
        </div> */}
          </div>
        ))}
      </form>
      <button className="underline text-sm">Clear filter</button>
    </div>
  );
}
