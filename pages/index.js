import Header from "../components/Header";
// import AuthContext from "../context/AuthContext";
import Footer from "../components/Footer";
// import { useContext } from "react";
import Pagination from "../components/Pagination";
import ProjectList from "../components/ProjectList";
// import Filter from "../components/Filter";
import { useSelector } from "react-redux";

export default function ProjectsList(props) {
  // const { meta } = props;
  // const { user } = useContext(AuthContext);

  // 分割代入
  const { user } = useSelector((state) => state.auth);

  return user ? (
    <>
      <Header />
      {/* <Filter props={props} /> */}
      <ProjectList />
      <Pagination props={props} />
      <Footer />
    </>
  ) : (
    <>
      <p>Not authorized!</p>
    </>
  );
}

// export async function getServerSideProps({ req }) {
//   const parseCookies = (req) => {
//     return cookie.parse(req ? req.headers.cookie || "" : "");
//   };
//   const { token } = parseCookies(req);

//   return token
//     ? {
//         props: {
//           token,
//         },
//       }
//     : {
//         props: {},
//       };

//   // const res = await fetch(
//   //   `${API_URL}/projects?populate=*`,
//   //   {
//   //     headers: {
//   //       Authorization: `Bearer ${token}`,
//   //     },
//   //   }
//   // );

//   // const projects = await res.json();

//   // const meta = projects.meta;

//   // return meta !== undefined
//   // ? {
//   //     props: {
//   //       meta,
//   //       token,
//   //     },
//   //   }
//   // : {
//   //     props: {
//   //       token,
//   //     },
//   //   };

//   // console.log(projects.error.name);
//   // console.log(projects);
//   // const projectsData = projects.data;

//   // console.log(meta);

//   // return meta !== undefined
//   //   ? {
//   //       props: {
//   //         projects,
//   //         meta,
//   //         token,
//   //       },
//   //     }
//   //   : {
//   //       props: {
//   //         projects,
//   //       },
//   //     };
// }
