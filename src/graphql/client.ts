export function request<D>(query: string): Promise<{ data: D; errors?: any }> {
  return fetch(process.env.MONSOON_ORIGIN as string, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ query }),
  }).then((res) => res.json());
}
