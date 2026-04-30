// Client-side fetch utility (for use in Client Components)
class ClientFetch {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || "";
  }

  async get(path: string, options?: RequestInit) {
    const response = await fetch(`${this.baseURL}${path}`, {
      method: "GET",
      ...options,
      credentials: "include", // Include cookies for client-side requests
    });
    return response;
  }

  async post(path: string, options?: RequestInit) {
    const response = await fetch(`${this.baseURL}${path}`, {
      method: "POST",
      ...options,
      credentials: "include",
    });
    return response;
  }

  async patch(path: string, options?: RequestInit) {
    const response = await fetch(`${this.baseURL}${path}`, {
      method: "PATCH",
      ...options,
      credentials: "include",
    });
    return response;
  }

  async delete(path: string, options?: RequestInit) {
    const response = await fetch(`${this.baseURL}${path}`, {
      method: "DELETE",
      ...options,
      credentials: "include",
    });
    return response;
  }
}

const clientFetch = new ClientFetch();
export default clientFetch;
