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

  try {
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
      throw new Error(`Request Failed with status ${response.status}`);
    }
  } catch (error) {
    console.error("API Request Error: ", error);
    throw error;
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
    if (response.status === 422) {
      const errorData = (await response.json()) as Error422Resp;

      const errorMsg = errorData.errors.map((err) => err.message).join("\n");

      throw new Error(errorMsg);
    }

    if (response.status === 403) {
      throw new Error("Unauthorized access");
    }

    throw new Error(`Request Failed with status ${response.status}`);
  }

  const data = await response.json();

  return data as ResponseType;
}

interface Error422Resp {
  errors: {
    message: string;
    rule: string;
    field: string;
  }[];
}
