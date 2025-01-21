import { API_URL } from "../main";

export async function getApi(url: string, token?: string) {
  let headers = {} as Record<string, string>;
  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(`${API_URL}${url}`, { headers }).then((res) =>
    res.status < 400 ? res.json() : Promise.reject(res)
  );
}
export async function postApi(url: string, body: any, token?: string) {
  let headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(`${API_URL}${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  }).then((res) => (res.status < 400 ? res.json() : Promise.reject(res)));
}
