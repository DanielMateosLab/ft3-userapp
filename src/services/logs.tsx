import { useUser } from "@/context/userContext";
import { LogData } from "@/types/logData";
import { useRouter } from "next/router";
import { createBaseHeaders } from "./appFetch";

export const useLogger = () => {
  const { user } = useUser();
  const { pathname } = useRouter();

  /** Logs an error, if it fails, tries to log the error up to three times */
  const log = (errorInfo: unknown) => {
    const logData: LogData = {
      timestamp: new Date().toISOString(),
      path: pathname,
      userId: user?.id,
      errorInfo,
    };

    const logRequest = () =>
      fetch("/api/logs", {
        method: "POST",
        body: JSON.stringify(logData),
        headers: createBaseHeaders("jsonContentType"),
      });

    logRequest().catch(() => retry(logRequest, 1));
  };

  return log;
};

export const retry = (request: () => Promise<unknown>, attempt: 1 | 2 | 3) => {
  if (attempt > 3) return;

  const retryDelay = {
    1: 1000,
    // 30 seconds
    2: 30000,
    // 1 minute
    3: 60000,
  } as const;

  setTimeout(() => {
    request().catch(() => retry(request, (attempt + 1) as 1 | 2 | 3));
  }, retryDelay[attempt]);
};
