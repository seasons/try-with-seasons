export const productURLFromSlug = (slug: string) =>
  `${process.env.FLARE_ORIGIN}/product/${slug}?utm_source=${window.location.hostname}&utm_campaign=trywithseasons&utm_medium=widget`;
