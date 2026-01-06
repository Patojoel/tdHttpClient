export abstract class HttpClient {
  abstract post(
    url: string,
    data: Object,
    signal?: AbortSignal,
    blob?: boolean
  ): Promise<Response>;

  abstract get(url: string, signal?: AbortSignal): Promise<Response>;

}
