import Cookies from "universal-cookie";

const cookies = new Cookies();

export function getCsrfToken() {
  return cookies.get("csrftoken");
}
