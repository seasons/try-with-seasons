import { ProductDetails } from "../types";
import { request } from "../graphql/client";
import {
  queryGetProductsByExternalURL,
  Data,
} from "../graphql/queryGetProductsByExternalURL";
import { productURLFromSlug } from "../lib/productURLFromSlug";

export const parse = async (): Promise<ProductDetails | null> => {
  const script: HTMLScriptElement | null = document.querySelector(
    'script[type="application/ld+json"]'
  );
  if (!script) {
    return null;
  }

  try {
    const { name, url: externalURL = window.location.href } = JSON.parse(
      script.text
    );

    const { data } = await request<Data>(
      queryGetProductsByExternalURL({ externalURL })
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
      name,
      seasonsProductUrl: productURLFromSlug(availableProduct.slug),
    };
  } catch (ex) {
    console.error(ex)
    return null;
  }
};
