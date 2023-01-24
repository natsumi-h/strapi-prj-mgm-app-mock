import Link from "next/link";
import dayjs from "dayjs";
import { useFetcher } from "../hooks/useFetcher";
import Spinner from "./Spinner";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { PageNumberContext } from "../pages/_app";
// import { useContext, useEffect } from "react";
// import { API_URL } from "../config";
import {
  newAscDescId,
  newAscDescCreatedAt,
  newAscDescUpdatedAt,
  newAscDescSales,
} from "../state/endpointSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProjectList(props) {
  // 分割代入
  // const {
  //   token,
  //   // ascDescId,
  //   // ascDescSales,
  //   // ascDescUpdatedAt,
  //   // ascDescCreatedAt,
  //   // handleEndpointSwitcher,
  //   // endpointUrl,
  //   // pageNumber,
  //   // field,
  //   // value,
  // } = props.props;

  // const ascDescId = useSelector((state) => state.endpoint.ascDescId);
  // const ascDescCreatedAt = useSelector(
  //   (state) => state.endpoint.ascDescCreatedAt
  // );
  // const ascDescUpdatedAt = useSelector(
  //   (state) => state.endpoint.ascDescUpdatedAt
  // );
  // const ascDescSales = useSelector((state) => state.endpoint.ascDescSales);

  // 分割代入
  const {
    ascDescId,
    ascDescCreatedAt,
    ascDescUpdatedAt,
    ascDescSales,
    endpointUrl,
  } = useSelector((state) => state.endpoint);

  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { data, error } = useFetcher(endpointUrl, token);
  const projectsList = data ? data.data : "";

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
                      // onClick={(e) => handleEndpointSwitcher("id", "sort")}
                      onClick={() => dispatch(newAscDescId())}
                    >
                      {ascDescId == "desc" ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                      {/* {ascDescId == "desc" ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )} */}
                    </button>
                  </div>
                </th>
                <th scope="col" className="text-center py-3 px-6">
                  <div className="flex items-center gap-2 justify-center">
                    <p>Created On</p>
                    <button
                      // onClick={(e) =>
                      //   handleEndpointSwitcher("createdAt", "sort")
                      // }
                      onClick={() => dispatch(newAscDescCreatedAt())}
                    >
                      {ascDescCreatedAt == "desc" ? (
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
                      // onClick={(e) =>
                      //   handleEndpointSwitcher("updatedAt", "sort")
                      // }
                      onClick={() => dispatch(newAscDescUpdatedAt())}
                    >
                      {ascDescUpdatedAt == "desc" ? (
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
                      // onClick={(e) => handleEndpointSwitcher("sales", "sort")}
                      onClick={() => dispatch(newAscDescSales())}
                    >
                      {ascDescSales == "desc" ? (
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
                  <button
                    // onClick={(e) =>
                    //   handleEndpointSwitcher("id", "sort", pageNumber)
                    // }
                    onClick={() => dispatch(newAscDescId())}
                  >
                    {/* {ascDescId == "desc" ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )} */}
                    {ascDescId == "desc" ? (
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
                    // onClick={(e) =>
                    //   handleEndpointSwitcher("createdAt", "sort", pageNumber)
                    // }
                    onClick={() => dispatch(newAscDescCreatedAt())}
                  >
                    {ascDescCreatedAt == "desc" ? (
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
                    // onClick={(e) => handleEndpointSwitcher("updatedAt", "sort")}
                    onClick={() => dispatch(newAscDescUpdatedAt())}
                  >
                    {ascDescUpdatedAt == "desc" ? (
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
                    // onClick={(e) =>
                    //   handleEndpointSwitcher("sales", "sort", pageNumber)
                    // }
                    onClick={() => dispatch(newAscDescSales())}
                  >
                    {ascDescSales == "desc" ? (
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
                  <td className="py-4 px-6">
                    {project.attributes.related_area.data
                      ? project.attributes.related_area.data.attributes.areaName
                      : ""}
                  </td>
                  <td className="py-4 px-6">
                    {project.attributes.related_branch.data
                      ? project.attributes.related_branch.data.attributes
                          .branchName
                      : ""}
                  </td>
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
