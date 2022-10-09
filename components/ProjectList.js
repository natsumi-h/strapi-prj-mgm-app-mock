import Link from "next/link";
import dayjs from "dayjs";
import { useContext, useEffect } from "react";
import { PageNumberContext } from "../pages/_app";
import { API_URL } from "../config";
import { useFetcher } from "../hooks/useFetcher";
import Spinner from "./Spinner";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function ProjectList(props) {
  const setAscDesc = props.props.setAscDesc;
  const { pageNumber, setPageNumber } = useContext(PageNumberContext);
  const token = props.props.token;
  const url = `${API_URL}/projects?populate=*&sort[0]=${props.props.orderBy}:${props.props.ascDesc}&pagination[page]=${pageNumber}&pagination[pageSize]=10`;
  const { data, error } = useFetcher(url, token);
  const projectsList = data ? data.data : "";

  useEffect(() => {
    setAscDesc(() => {
      return props.props.ascDescId;
    });
  }, [props.props.ascDescId]);
  useEffect(() => {
    setAscDesc(() => {
      return props.props.ascDescSales;
    });
  }, [props.props.ascDescSales]);
  useEffect(() => {
    setAscDesc(() => {
      return props.props.ascDescUpdatedAt;
    });
  }, [props.props.ascDescUpdatedAt]);
  useEffect(() => {
    setAscDesc(() => {
      return props.props.ascDescCreatedAt;
    });
  }, [props.props.ascDescCreatedAt]);

  // https://tailwindui.com/components/application-ui/lists/tables
  if (!error && !data) {
    return (
      <>
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="text-center py-3 px-6">
                  <div className="flex items-center gap-2 justify-center">
                    <p>ID</p>
                    <button
                      onClick={() => props.props.handleSortSwitcher("id")}
                    >
                      {props.props.ascDescId == "desc" ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </button>
                  </div>
                </th>
                <th scope="col" className="text-center py-3 px-6">
                  <div className="flex items-center gap-2 justify-center">
                    <p>Created On</p>
                    <button
                      onClick={() =>
                        props.props.handleSortSwitcher("createdAt")
                      }
                    >
                      {props.props.ascDescCreatedAt == "desc" ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </button>
                  </div>
                </th>
                <th scope="col" className="text-center py-3 px-6">
                  <div className="flex items-center gap-2 justify-center">
                    <p>Updated On</p>
                    <button
                      onClick={() =>
                        props.props.handleSortSwitcher("updatedAt")
                      }
                    >
                      {props.props.ascDescUpdatedAt == "desc" ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </button>
                  </div>
                </th>
                <th
                  scope="col"
                  className="text-center py-3 px-6"
                  id="projectName"
                >
                  Project Name
                </th>
                <th scope="col" className="text-center py-3 px-6">
                  PM
                </th>
                <th scope="col" className="text-center py-3 px-6">
                  Status
                </th>
                <th scope="col" className="text-center py-3 px-6">
                  Area
                </th>
                <th scope="col" className="text-center py-3 px-6">
                  Branch
                </th>
                <th scope="col" className="text-center py-3 px-6">
                  <div className="flex items-center gap-2 justify-center">
                    <p>Sales</p>
                    <button
                      onClick={() => props.props.handleSortSwitcher("sales")}
                    >
                      {props.props.ascDescSales == "desc" ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
        <Spinner />
      </>
    );
  } else if (error) {
    return <div>{error.message}</div>;
  } else {
    return (
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="text-center py-3 px-6">
                <div className="flex items-center gap-2 justify-center">
                  <p>ID</p>
                  <button onClick={() => props.props.handleSortSwitcher("id")}>
                    {props.props.ascDescId == "desc" ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </button>
                </div>
              </th>
              <th scope="col" className="text-center py-3 px-6">
                <div className="flex items-center gap-2 justify-center">
                  <p>Created On</p>
                  <button
                    onClick={() => props.props.handleSortSwitcher("createdAt")}
                  >
                    {props.props.ascDescCreatedAt == "desc" ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </button>
                </div>
              </th>
              <th scope="col" className="text-center py-3 px-6">
                <div className="flex items-center gap-2 justify-center">
                  <p>Updated On</p>
                  <button
                    onClick={() => props.props.handleSortSwitcher("updatedAt")}
                  >
                    {props.props.ascDescUpdatedAt == "desc" ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </button>
                </div>
              </th>
              <th
                scope="col"
                className="text-center py-3 px-6"
                id="projectName"
              >
                Project Name
              </th>
              <th scope="col" className="text-center py-3 px-6">
                PM
              </th>
              <th scope="col" className="text-center py-3 px-6">
                Status
              </th>
              <th scope="col" className="text-center py-3 px-6">
                Area
              </th>
              <th scope="col" className="text-center py-3 px-6">
                Branch
              </th>
              <th scope="col" className="text-center py-3 px-6">
                <div className="flex items-center gap-2 justify-center">
                  <p>Sales</p>
                  <button
                    onClick={() => props.props.handleSortSwitcher("sales")}
                  >
                    {props.props.ascDescSales == "desc" ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </button>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {projectsList.map((project) => (
              <Link
                key={project.id}
                className="cursor-pointer"
                href={`/detail/${project.id}`}
              >
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:bg-blue-50 ">
                  <td className="py-4 px-6">{project.id}</td>
                  <td className="py-4 px-6">
                    {dayjs(project.attributes.createdAt).format("YYYY/MM/DD")}
                  </td>
                  <td className="py-4 px-6">
                    {dayjs(project.attributes.updatedAt).format("YYYY/MM/DD")}
                  </td>
                  <td className="py-4 px-6">
                    {project.attributes.projectName}
                  </td>
                  <td className="py-4 px-6">
                    {project.attributes.pm.data
                      ? project.attributes.pm.data.attributes.username
                      : ""}
                  </td>
                  <td className="py-4 px-6">{project.attributes.status}</td>
                  <td className="py-4 px-6">{project.attributes.area}</td>
                  <td className="py-4 px-6">{project.attributes.branch}</td>
                  <td className="py-4 px-6">{project.attributes.sales}</td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}