import { API_URL } from "../../config";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "GET") {
    // リクエストのヘッダーにcookieがなかったら403を返す
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }

    //リクエストのクッキーを{token}オブジェクトにパース？する
    const { token } = cookie.parse(req.headers.cookie);
    // console.log({ token });

    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ user, token });
    } else {
      res.status(403).json({ message: "User forbidden" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
