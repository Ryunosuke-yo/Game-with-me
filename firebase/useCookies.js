import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const getUserFromCookies = () => {
  const cookie = Cookies.get("auth");

  if (cookie) {
    const d = JSON.stringify(cookie);
    console.log(Object.values(cookie));
    return cookie;
  } else {
    console.log("no cookies");
    useRouter().push("/");
    return false;
  }
};

export const setUserCookie = (user) => {
  const c = Cookies.set("auth", user, {
    expires: 1 / 24,
  });
  console.log(`${c} クッキーだよ`);
};

export const removeUserCookie = () => {
  Cookies.remove("auth");
  console.log("removed cookie");
};
