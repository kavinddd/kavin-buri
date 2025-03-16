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
    throw new Error("Cannot connect to server.");
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

    const data = await response.json();

    return data as ResponseType;
  } catch (error) {
    console.error("API Request Error: ", error);
    throw new Error("Cannot connect to server.");
  }
}
