import { useRouter } from "next/router";
import { API_URL } from "../../config";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import cookie from "cookie";
import Footer from "../../components/Footer";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useFetcher } from "../../hooks/useFetcher";
import Spinner from "../../components/Spinner";

export default function CreateProjectPage2(props) {
  const token = props.token;
  // console.log(props.project);

  const pmUrl = `${API_URL}/users`;
  const { data: pms, error: pmsError } = useFetcher(pmUrl, token);

  const areaUrl = `${API_URL}/areas?populate=*`;
  const { data: areas, error: areasError } = useFetcher(areaUrl, token);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm({
    criteriaMode: "all",
    defaultValues: {
      projectName: props.project.data.attributes.projectName,
      pm: props.project.data.attributes.pm.data.id
        ? props.project.data.attributes.pm.data.id
        : "",
      status: props.project.data.attributes.status,
      related_area: props.project.data.attributes.related_area.data
        ? props.project.data.attributes.related_area.data.id
        : "",
      related_branch: props.project.data.attributes.related_branch.data
        ? props.project.data.attributes.related_branch.data.id
        : "",
      sales: props.project.data.attributes.sales,
    },
  });

  const values = getValues();
  //データをPOSTするときに、リレーショナルフィールド（Area Branch）の値がなければプロパティを除外する
  const sendingValues = () => {
    if (values.related_area == "") {
      if (values.related_branch == "") {
        delete values["related_area"];
        delete values["related_branch"];
        // return values;
      } else {
        delete values["related_area"];
        // return values;
      }
    } else if (values.related_branch == "") {
      delete values["related_branch"];
      // return values;
    } else {
      return values;
    }
    return values;
  };
  // console.log(sendingValues());

  //Areaのinputバリューを取得し、それと同じidのareasのオブジェクトを抜き出し、そこからそこに紐づくbranchesのデータをとってくる
  const getfilteredAreaBranches = () => {
    if (areas) {
      const areaValue = values.related_area;
      const areasData = areas.data;
      const filteredArea = areasData.filter((area) => {
        return area.id == areaValue;
      });
      const filteredAreaBranches =
        filteredArea[0] && filteredArea[0].attributes.branches.data;

      return filteredAreaBranches;
    }
  };

  const watchArea = watch("related_area", "");
  const watchAll = watch();

  const router = useRouter();

  // const onSubmit = (data) => console.log(data);

  const onSubmit = async (e) => {
    const res = await fetch(`${API_URL}/projects/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ data: values }),
      body: JSON.stringify({ data: sendingValues() }),
    });
    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        console.log("No token included");
        return;
      } else {
        console.log("something went wrong");
      }
    } else {
      const newProject = await res.json();
      console.log(newProject);
      // alert("Project created!");
      // router.push("/");
      props.setModalClass("");
      props.setModalText("Project successfully edited!");
      props.setButtonType("close");
    }
  };

  if ((!pmsError && !pms) || (!areasError && !areas)) {
    return <Spinner />;
  } else if (pmsError || areasError) {
    return;
    <>
      <div>{pmsError.message}</div>
      <div>{areasError.message}</div>
      <div>{projectError.message}</div>
    </>;
  } else {
    return (
      <>
        <Header />
        <Modal props={props} />
        <form className="w-9/12 mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Project name
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Project ABC"
              {...register("projectName", {
                required: "Project name is required.",
                maxLength: {
                  value: 50,
                  message: "This input must be within 50 characters",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="projectName"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p className="mt-1 text-red-400 text-sm" key={type}>
                        {message}
                      </p>
                    ))
                  : null;
              }}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              PM
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("pm", { required: "PM is required." })}
            >
              <option hidden value="">
                Select option
              </option>
              {pms.map((pm) => (
                <option key={pm.id} value={pm.id}>
                  {pm.username}
                </option>
              ))}
            </select>
            <ErrorMessage
              errors={errors}
              name="pm"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p className="mt-1 text-red-400 text-sm" key={type}>
                        {message}
                      </p>
                    ))
                  : null;
              }}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Status
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("status", { required: "Status is required." })}
            >
              <option hidden value="">
                Select option
              </option>
              <option value="Lead">Lead</option>
              <option value="Opportunity">Opportunity</option>
              <option value="Dealed">Dealed</option>
              <option value="Closed">Closed</option>
              <option value="Lost">Lost</option>
            </select>
            <ErrorMessage
              errors={errors}
              name="status"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p className="mt-1 text-red-400 text-sm" key={type}>
                        {message}
                      </p>
                    ))
                  : null;
              }}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Area
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("related_area")}
            >
              <option hidden value="">
                Select option
              </option>
              {areas.data.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.attributes.areaName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Branch
            </label>
            <select
              disabled={watchArea ? "" : "disabled"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("related_branch")}
            >
              <option hidden value="">
                Select option
              </option>
              {values.related_area &&
                getfilteredAreaBranches().map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.attributes.branchName}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Sales
            </label>
            <input
              type="number"
              placeholder="0"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("sales", { required: "Sales is required." })}
            />
            <ErrorMessage
              errors={errors}
              name="sales"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p className="mt-1 text-red-400 text-sm" key={type}>
                        {message}
                      </p>
                    ))
                  : null;
              }}
            />
          </div>
          <input
            type="submit"
            value="Save"
            data-modal-toggle="popup-modal"
            className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          />
        </form>
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

  const projectRes = await fetch(`${API_URL}/projects/${id}?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const project = await projectRes.json();

  return token
    ? {
        props: {
          project,
          token,
          id,
        },
      }
    : {
        props: {},
      };
}
