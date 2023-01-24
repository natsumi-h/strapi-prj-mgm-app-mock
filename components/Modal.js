import { useRouter } from "next/router";
import { API_URL } from "../config";
import { useSelector } from "react-redux";

export default function Modal(props) {
  const router = useRouter();
  // console.log(props);
  const { token } = useSelector((state) => state.auth);
  // const token = props.props.token;
  const id = props.id ? props.id : "";

  const deleteEvent = async (e) => {
    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      props.props.setModalText(data.message);
    } else {
      //   router.push("/");
      //   props.props.setModalClass("hidden");
      props.props.setModalText("Project deleted");
      props.props.setButtonType("close");
      console.log("deleted");
    }
  };

  return (
    <div
      id="popup-modal"
      tabindex="-1"
      className={`${props.props.modalClass} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full`}
      //   className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full"
    >
      <div
        className="relative p-4 w-full max-w-md h-full md:h-auto inset-y-10 left-2/4 -translate-x-2/4"
        //   inset-2/4
        //   -translate-y-2/4
        //   -translate-x-2/4
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-6 text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {props.props.modalText}
            </h3>

            <div className="flex justify-center gap-x-3">
              {props.props.buttonType !== "close" ? (
                <>
                  <button
                    data-modal-toggle="popup-modal"
                    type="button"
                    className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => deleteEvent()}
                  >
                    Delete
                  </button>
                  <button
                    data-modal-toggle="popup-modal"
                    type="button"
                    className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                      props.props.setModalClass("hidden");
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  data-modal-toggle="popup-modal"
                  type="button"
                  className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => {
                    props.props.setModalClass("hidden");
                    props.props.setButtonType("");
                    router.push("/");
                  }}
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
