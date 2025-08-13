import { FormMethod } from "react-router-dom";

function createHeaders(token?: string | null) {
  let headers = { "Content-Type": "application/json" } as Record<
    string,
    string
  >;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export async function fetchApi(
  url: string,
  method: FormMethod,
  body?: any,
  token?: string | null
) {
  return fetch(`/api${url}`, {
    method,
    headers: createHeaders(token),
    body: body && JSON.stringify(body),
  }).then((res) =>
    res.status < 400 ? Promise.resolve(res) : Promise.reject(res)
  );
}

export async function getApi(url: string, token?: string | null) {
  return fetchApi(url, "GET", undefined, token).then((res) => res.json());
}

export async function postApi(url: string, body: any, token?: string | null) {
  return fetchApi(url, "POST", body, token).then((res) => res.json());
}

export async function putApi(url: string, body: any, token?: string | null) {
  return fetchApi(url, "PUT", body, token);
}

export async function deleteApi(url: string, token?: string | null) {
  return fetchApi(url, "DELETE", undefined, token);
}
