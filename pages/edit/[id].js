import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "../../config";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import cookie from "cookie";

export default function EditProjectPage(props) {
  const id = props.project.data.id;
  const projectData = props.project.data.attributes;
  const pmsList = props.pms;
  const token = props.token;
  const router = useRouter();

  const [values, setValues] = useState({
    projectName: projectData.projectName,
    status: projectData.status,
    area: projectData.area,
    branch: projectData.branch,
    sales: projectData.sales,
    project_manager: projectData.pm.data
      ? projectData.pm.data.id
      : "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(values));

    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: values }),
    });
    if (!res.ok) {
      console.log("something went wrong");
    } else {
      const editedProject = await res.json();
      console.log(editedProject.data.id);
      router.push(`/detail/${editedProject.data.id}`);
    }
  };

  const handleInputChange = (e) => {
    //inputの内容が変わるたびに（onChange）、setValuesの中のnameタグの中の値のフィールドが、初期値からvalueタグの中の値に変わる
    const { name, value } = e.currentTarget;
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <Header />
      <form className="w-9/12 mx-auto" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Project name
          </label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Project ABC"
            required
            value={values.projectName}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            PM
          </label>
          <select
            id="project_manager"
            name="project_manager"
            value={values.project_manager}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appea"
          >
            <option hidden> 選択してください</option>
            {pmsList.map((pm) => (
              <option key={pm.id} value={pm.id}>
                {pm.username}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={values.status}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option hidden> 選択してください</option>
            <option value="Lead">Lead</option>
            <option value="Opportunity">Opportunity</option>
            <option value="Dealed">Dealed</option>
            <option value="Closed">Closed</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Area
          </label>
          <select
            id="area"
            name="area"
            value={values.area}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option hidden> 選択してください</option>
            <option value="Area A">Area A</option>
            <option value="Area B">Area B</option>
            <option value="Area C">Area C</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Branch
          </label>
          <select
            id="branch"
            name="branch"
            value={values.branch}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option hidden> 選択してください</option>
            <option value="A-1">A-1</option>
            <option value="A-2">A-2</option>
            <option value="A-3">A-3</option>
            <option value="B-1">B-1</option>
            <option value="B-2">B-2</option>
            <option value="B-3">B-3</option>
            <option value="C-1">C-1</option>
            <option value="C-2">C-2</option>
            <option value="C-3">C-3</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Sales
          </label>
          <input
            type="number"
            id="sales"
            name="sales"
            value={values.sales}
            placeholder="0"
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <input
          type="submit"
          value="Save"
          className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        />
      </form>
      <Footer />
    </>
  );
}

// export async function getStaticProps({ params: { id } }) {
//   const resEvents = await fetch(`${API_URL}/projects/${id}?populate=*`);
//   const project = await resEvents.json();
//   const resPms = await fetch(`${API_URL}/project-managers`);
//   const pms = await resPms.json();
//   //console.log(pms);

//   if (!project.data) {
//     return {
//       notFound: true,
//     };
//   } else {
//     return {
//       props: {
//         project,
//         pms,
//       },
//     };
//   }
// }

export async function getServerSideProps(context) {
  const req = context.req;
  const id = context.params.id;

  const parseCookies = (req) => {
    return cookie.parse(req ? req.headers.cookie || "" : "");
  };
  const { token } = parseCookies(req);
  console.log(token);

  const projectRes = await fetch(`${API_URL}/projects/${id}?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const project = await projectRes.json();

  const resPms = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const pms = await resPms.json();

  return {
    props: {
      project,
      pms,
      token,
    },
  };
}
