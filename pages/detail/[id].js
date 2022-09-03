// 詳細ページ
import * as React from "react";
import { useRouter } from "next/router";
import { API_URL } from "../../config";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import cookie from "cookie";
import dayjs from "dayjs";
import Link from "next/link";

export default function BasicList(props) {
  const token = props.token;
  // console.log(token);
  console.log(props);

  const router = useRouter();
  const editEvent = (e) => {
    router.push(`/edit/${props.project.data.id}`);
  };

  const deleteEvent = async (e) => {
    if (window.confirm("Delete?")) {
      const res = await fetch(`${API_URL}/projects/${props.project.data.id}`, {
        method: "DELETE",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <>
      <Header />

      {props.project.data ? (
        <div className="mx-auto w-9/12">
          <dl className=" text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
            <div className="flex flex-col pb-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Project ID
              </dt>
              <dd className="text-lg font-semibold">{props.project.data.id}</dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Project Name
              </dt>
              <dd className="text-lg font-semibold">
                {props.project.data.attributes.projectName}
              </dd>
            </div>
            <div className="flex flex-col pt-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Created On
              </dt>
              <dd className="text-lg font-semibold">
                {dayjs(props.project.data.attributes.cratedAt).format(
                  "YYYY/MM/DD"
                )}
              </dd>
            </div>
            <div className="flex flex-col pt-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Updated On
              </dt>
              <dd className="text-lg font-semibold">
                {dayjs(props.project.data.attributes.updatedAt).format(
                  "YYYY/MM/DD"
                )}
              </dd>
            </div>
            <div className="flex flex-col pt-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                PM
              </dt>
              <dd className="text-lg font-semibold">
                {props.project.data.attributes.pm.data
                  ? props.project.data.attributes.pm.data
                      .attributes.username
                  : ""}
              </dd>
            </div>
            <div className="flex flex-col pt-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Status
              </dt>
              <dd className="text-lg font-semibold">
                {props.project.data.attributes.status}
              </dd>
            </div>
            <div className="flex flex-col pt-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Area
              </dt>
              <dd className="text-lg font-semibold">
                {props.project.data.attributes.area}
              </dd>
            </div>
            <div className="flex flex-col pt-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Branch
              </dt>
              <dd className="text-lg font-semibold">
                {props.project.data.attributes.branch}
              </dd>
            </div>
            <div className="flex flex-col pt-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Sales($)
              </dt>
              <dd className="text-lg font-semibold">
                {props.project.data.attributes.sales}
              </dd>
            </div>
          </dl>
          <Link href={`/edit/${props.project.data.id}`}>
            <button className="mt-8 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Edit
            </button>
          </Link>
          <button
            onClick={deleteEvent}
            className="mt-8 ml-5 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Delete
          </button>
        </div>
      ) : (
        <p>no such project</p>
      )}

      <Footer />
    </>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/projects?populate=*`);
//   const projects = await res.json();
//   const projectsData = projects.data;
//   console.log(projectsData);
//   const paths = projectsData.map((project) => ({
//     params: { id: project.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: "blocking",
//   };
// }

// export async function getStaticProps({ params: { id } }) {
//   const res = await fetch(`${API_URL}/projects/${id}?populate=*`);
//   const projects = await res.json();

//   if (!projects.data) {
//     return {
//       notFound: true,
//     };
//   } else {
//     return {
//       props: {
//         projects,
//       },
//       revalidate: 1,
//     };
//   }
// }

export async function getServerSideProps(context) {
  const req = context.req;
  const id = context.params.id;
  // console.log(id);
  const parseCookies = (req) => {
    return cookie.parse(req ? req.headers.cookie || "" : "");
  };
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/projects/${id}?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const project = await res.json();

  return {
    props: {
      project,
      token,
    },
  };
}
