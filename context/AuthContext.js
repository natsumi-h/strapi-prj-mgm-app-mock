import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "../config/index";
// import { data } from "autoprefixer";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  //DOMになる瞬間（マウントされる瞬間）に、checkUserLoggedInの処理が走る
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  //Register user
  const register = async (user) => {
    console.log(user);
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/");
    } else {
      console.log({ message: data.message });
      setError(data.message);
      setError(null);
    }
  };

  //Login user
  const login = async ({ email: identifier, password }) => {
    // console.log({ identifier, password });

    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/");
    } else {
      console.log({ message: data.message });
      setError(data.message);
      setError(null);
    }
  };

  //Logout user
  const logout = async () => {
    // console.log("Logout");
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });
    if (res.ok) {
      setUser(null);
      router.push("/account/login");
    }
  };

  // Check if user is logged in
  //resがOKならuserにuserデータを渡す
  // マウント時に実行する関数
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
      router.push("/account/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
