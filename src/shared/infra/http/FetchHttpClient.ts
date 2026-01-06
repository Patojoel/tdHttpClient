import { BACK_END_APP_URL } from "../../../config/env";
import InternalServerException from "../../exceptions/InternalServerException";
import type { HttpClient } from "../../gateway/HttpClient";

class FetchHttpClient implements HttpClient {
  post(
    url: string,
    data: Object,
    signal?: AbortSignal,
    blob?: boolean
  ): Promise<Response> {
    return this.fetchData(url, {
      method: "POST",
      redirect: "error",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      signal,
      blob,
    });
  }
  get(url: string, signal?: AbortSignal): Promise<Response> {
    return this.fetchData(url, {
      method: "GET",
      redirect: "error",
      headers: { "Content-Type": "application/json" },
      signal,
    })
      .then((res) => res)
      .catch((err) => {
        if (err.name !== "AbortError") {
          return err;
        }
      });
  }

  private async fetchData(
    url: string,
    requestInit?: RequestInit & { blob?: boolean }
  ): Promise<Response> {
    let fetchUrl = url;
    if (!url.includes("http")) {
      fetchUrl = BACK_END_APP_URL + url;
    }
    return new Promise((resolve, reject) => {
      return fetch(fetchUrl, {
        ...requestInit,
        redirect: "manual",
        signal: requestInit?.signal,
      })
        .then(async (response) => {
          if (response.status === 500 || response.status === 405) {
            return reject(new InternalServerException());
          }

          if (requestInit?.blob) {
            return resolve(response);
          }

          return resolve(response);
        })
        .catch((value) => {
          reject(value);
        });
    });
  }
}
const httpClient = new FetchHttpClient();
export default httpClient;