import Header from "../components/Header";
import cookie from "cookie";
import AuthContext from "../context/AuthContext";
import Footer from "../components/Footer";
import { useContext } from "react";
import Pagination from "../components/Pagination";
import ProjectList from "../components/ProjectList";
import Filter from "../components/Filter";

export default function ProjectsList(props) {
  const meta = props.meta;
  const { user } = useContext(AuthContext);

  return user ? (
    <>
      <Header />
      <Filter props={props} />
      <ProjectList props={props} />
      <Pagination props={props} />
      <Footer />
    </>
  ) : (
    <></>
  );
}

export async function getServerSideProps({ req }) {
  const parseCookies = (req) => {
    return cookie.parse(req ? req.headers.cookie || "" : "");
  };
  const { token } = parseCookies(req);

  return token
    ? {
        props: {
          token,
        },
      }
    : {
        props: {},
      };

  // const res = await fetch(
  //   `${API_URL}/projects?populate=*`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }
  // );

  // const projects = await res.json();

  // const meta = projects.meta;

  // return meta !== undefined
  // ? {
  //     props: {
  //       meta,
  //       token,
  //     },
  //   }
  // : {
  //     props: {
  //       token,
  //     },
  //   };

  // console.log(projects.error.name);
  // console.log(projects);
  // const projectsData = projects.data;

  // console.log(meta);

  // return meta !== undefined
  //   ? {
  //       props: {
  //         projects,
  //         meta,
  //         token,
  //       },
  //     }
  //   : {
  //       props: {
  //         projects,
  //       },
  //     };
}
