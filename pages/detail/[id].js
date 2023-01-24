// 詳細ページ
import * as React from "react";
import { API_URL } from "../../config";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import cookie from "cookie";
import dayjs from "dayjs";
import Link from "next/link";
import Modal from "../../components/Modal";
import { useFetcher } from "../../hooks/useFetcher";
import Spinner from "../../components/Spinner";
import { useSelector } from "react-redux";

export default function BasicList(props) {
  // const token = props.token;
  // console.log(props.project);

  const { token } = useSelector((state) => state.auth);
  const projectUrl = `${API_URL}/projects/${props.id}?populate=*`;
  const { data: project, error: projectError } = useFetcher(projectUrl, token);
  // console.log(project);

  const deleteConfirmation = () => {
    props.setModalClass("");
    props.setModalText("Are you sure you want to delete this project?");
  };

  if (!projectError && !project) {
    return <Spinner />;
  } else if (projectError) {
    return <div>{projectError.message}</div>;
  } else {
    return (
      <>
        <Header props={props} />
        <Modal props={props} id={props.id} />
        <div className="mx-auto w-9/12">
          <dl className=" text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
            <div className="flex flex-col pb-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Project ID
              </dt>
              <dd className="text-lg font-semibold">{project.data.id}</dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Project Name
              </dt>
              <dd className="text-lg font-semibold">
                {project.data.attributes.projectName}
              </dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Created On
              </dt>
              <dd className="text-lg font-semibold">
                {dayjs(project.data.attributes.createdAt).format("YYYY/MM/DD")}
              </dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Updated On
              </dt>
              <dd className="text-lg font-semibold">
                {dayjs(project.data.attributes.updatedAt).format("YYYY/MM/DD")}
              </dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                PM
              </dt>
              <dd className="text-lg font-semibold">
                {project.data.attributes.pm.data.attributes.username}
              </dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Status
              </dt>
              <dd className="text-lg font-semibold">
                {project.data.attributes.status}
              </dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Area
              </dt>
              <dd className="text-lg font-semibold h-7">
                {project.data.attributes.related_area.data
                  ? project.data.attributes.related_area.data.attributes
                      .areaName
                  : ""}
              </dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Branch
              </dt>
              <dd className="text-lg font-semibold h-7">
                {project.data.attributes.related_branch.data
                  ? project.data.attributes.related_branch.data.attributes
                      .branchName
                  : ""}
              </dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Sales($)
              </dt>
              <dd className="text-lg font-semibold">
                {project.data.attributes.sales}
              </dd>
            </div>
          </dl>
          <Link href={`/edit/${props.id}`}>
            <button className="mt-8 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Edit
            </button>
          </Link>
          <button
            onClick={deleteConfirmation}
            className="mt-8 ml-5 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Delete
          </button>
        </div>
        <Footer />
      </>
    );
  }
}

export async function getServerSideProps(context) {
  const req = context.req;
  const id = context.params.id;
  const parseCookies = (req) => {
    return cookie.parse(req ? req.headers.cookie || "" : "");
  };
  const { token } = parseCookies(req);

  return {
    props: {
      // token,
      id,
    },
  };
}
