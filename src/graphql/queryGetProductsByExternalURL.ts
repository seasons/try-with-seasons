export type Params = { externalURL: string };
export type Data = { products?: { slug: string; status: string }[] };

export const queryGetProductsByExternalURL = ({ externalURL }: Params) => `
  query GetProductsByExternalURL {
    products(where: { externalURL: "${externalURL}" }) {
      slug
      status
    }
  }
`;
