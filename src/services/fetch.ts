import { useLogger } from "./logs";

export const AppHeaders = {
  jsonContentType: ["Content-Type", "application/json"],
} as const;

export const createBaseHeaders = (...headers: (keyof typeof AppHeaders)[]) => {
  const baseHeaders = new Headers();
  headers.forEach((header) => baseHeaders.append(...AppHeaders[header]));
  return baseHeaders;
};

export const useFetch = () => {
  const logger = useLogger();

  /** Wrapper that logs unexpected errors.
   * - When there are unexpected errors, the response is undefined. */
  const appFetch = async (url: RequestInfo | URL, options?: RequestInit) => {
    try {
      const res = await fetch(url, options);

      if (!res.ok && res.headers.get("Content-Type") !== "application/json") {
        // All the known errors have a json body
        // If it's does not have json, we log the status and statusText
        logger({
          err: `Error: ${res.status} ${res.statusText}`,
          requestUrl: url,
        });
      } else {
        return res;
      }
    } catch (err) {
      logger({ err, requestUrl: url });
    }
  };

  /** Wrapper that logs unexpected errors and sets up the request init for JSON bodies
    - When there are unexpected errors, the response is undefined. */
  const appPostFetch = (url: RequestInfo | URL, body?: unknown) =>
    appFetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: createBaseHeaders("jsonContentType"),
    });

  return { appFetch, appPostFetch };
};
