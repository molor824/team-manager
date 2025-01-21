import { API_URL } from "../main";

export async function getApi(url: string) {
  return fetch(`${API_URL}${url}`).then((res) =>
    res.status < 400 ? res.json() : Promise.reject(res)
  );
}
export async function postApi(url: string, body: any) {
  return fetch(`${API_URL}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => (res.status < 400 ? res.json() : Promise.reject(res)));
}
