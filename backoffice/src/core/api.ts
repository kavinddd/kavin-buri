const API_URL = "http://localhost:3333"; // FIXME:

const defaultOptions: RequestInit = {
  headers: {
    "Content-Type": "application/json",
  },
};

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
    const response = await fetch(`${API_URL}/${path}?${params})}`, {
      ...defaultOptions,
      ...options,
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
