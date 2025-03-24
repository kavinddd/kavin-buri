const API_URL = "http://localhost:3333/api"; // FIXME:

// const defaultOptions: RequestInit = {
//   headers: {
//     "Content-Type": "application/json",
//   },
// };
//
export async function fetchVoid(
  path: string,
  options?: RequestInit,
  searchParams?: string | Record<string, string>,
): Promise<void> {
  const params =
    typeof searchParams === "string"
      ? searchParams
      : new URLSearchParams({
          ...searchParams,
        }).toString();

  const url = `${API_URL}/${path}`;
  const finalUrl = params ? url + `?${params}` : url;
  const response = await fetch(finalUrl, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    try {
      const errorData = (await response.json()) as ErrorResp;
      const errorMsg = errorData.errors.map((err) => err.message).join("\n");
      throw new Error(errorMsg);
    } catch {
      throw new Error(`Request Failed with status ${response.status}`);
    }
  }
}

export async function fetchJson<ResponseType>(
  path: string,
  options?: RequestInit,
  searchParams?: string | Record<string, string>,
): Promise<ResponseType> {
  const params =
    typeof searchParams === "string"
      ? searchParams
      : new URLSearchParams({
          ...searchParams,
        }).toString();

  const url = `${API_URL}/${path}`;
  const finalUrl = params ? url + `?${params}` : url;
  const response = await fetch(finalUrl, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // "content-type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    try {
      const errorData = await response.json();
      if ("errors" in errorData && Array.isArray(errorData.errors)) {
        const errorMsg = (errorData as ErrorResp).errors
          .map((err) => err.message)
          .join("\n");
        throw new Error(errorMsg);
      }
      throw new Error(`Unexpected error format with status ${response.status}`);
    } catch (e) {
      throw e instanceof Error
        ? e
        : new Error(`Request Failed with status ${response.status}`);
    }
  }

  const data = await response.json();

  return data as ResponseType;
}

interface ErrorResp {
  errors: {
    message: string;
    rule?: string;
    field?: string;
  }[];
}
