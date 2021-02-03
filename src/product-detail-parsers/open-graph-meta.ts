import { ProductDetails } from "../types";
import { request } from "../graphql/client";
import {
  queryGetProductsByExternalURL,
  Data,
} from "../graphql/queryGetProductsByExternalURL";
import { productURLFromSlug } from "../lib/productURLFromSlug";

export const parse = async (): Promise<ProductDetails | null> => {
  const metaUrl: HTMLMetaElement | null = document.querySelector(
    'meta[property="og:url"]'
  );
  const metaName: HTMLMetaElement | null = document.querySelector(
    'meta[property="og:title"]'
  );

  if (!metaUrl || !metaName) {
    return null;
  }

  try {

    const { data } = await request<Data>(
      queryGetProductsByExternalURL({ externalURL: metaUrl.content })
    );

    if (!data || !data.products || !data.products.length) {
      return null;
    }

    const availableProduct = data.products.find(
      ({ status }) => status === "Available"
    );

    if (!availableProduct) {
      return null;
    }

    return {
      name: metaName.content,
      seasonsProductUrl: productURLFromSlug(availableProduct.slug),
    };
  } catch (ex) {
    console.error(ex);
    return null;
  }
};
