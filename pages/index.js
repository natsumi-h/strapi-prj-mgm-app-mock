// import * as React from "react";
import Header from "../components/Header";
import { API_URL } from "../config";
import Link from "next/link";
import cookie from "cookie";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import dayjs from "dayjs";
import Footer from "../components/Footer";

// https://tailwindui.com/components/application-ui/lists/tables

export default function ProjectsList(projects) {
  const projectsList = projects.projects.data;
  console.log(projectsList);

  const sortedProjectsList = projectsList.sort((a, b) => {
    a = new Date(a.attributes.updatedAt);
    b = new Date(b.attributes.updatedAt);
    return b-a
  });
  console.log(sortedProjectsList);

  const { user } = useContext(AuthContext);
  // console.log(user);
  //const router = useRouter();
  //!user &&  router.push("/account/login");

  return user ? (
    <>
      <Header />
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="text-center py-3 px-6">
                ID
              </th>
              <th scope="col" className="text-center py-3 px-6">
                Created On
              </th>
              <th scope="col" className="text-center py-3 px-6">
                Updated On
              </th>
              <th scope="col" className="text-center py-3 px-6">
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
                Sales($)
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedProjectsList.map((project) => (
              <Link
                key={project.id}
                className="cursor-pointer"
                href={`/detail/${project.id}`}
              >
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:bg-blue-50">
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
                  {/* <td className="py-4 px-6">
                    {project.attributes.pm.data
                      ? project.attributes.pm.data.attributes.username
                      : ""}
                  </td> */}
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
      <Footer />
    </>
  ) : (
    <p>Unauthorized User</p>
  );
}

export async function getServerSideProps({ req }) {
  const parseCookies = (req) => {
    return cookie.parse(req ? req.headers.cookie || "" : "");
  };
  const { token } = parseCookies(req);
  console.log({ token });

  const res = await fetch(`${API_URL}/projects?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const projects = await res.json();
  // console.log(projects.error.name);
  console.log(projects);

  return {
    props: {
      projects,
    },
  };
}
