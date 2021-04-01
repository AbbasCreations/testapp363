export const GetMetaTags = (props) => {
  document.title = props.title;

  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", props.description);
  document
    .querySelector('meta[name="keywords"]')
    .setAttribute("content", props.keywords);

  document
    .querySelector('meta[property="og:title"]')
    .setAttribute("content", props.title);
  document
    .querySelector('meta[property="og:description"]')
    .setAttribute("content", props.description);
  document
    .querySelector('meta[property~="og:image"]')
    .setAttribute("content", props.image);
  document
    .querySelector('meta[property~="og:url"]')
    .setAttribute("content", props.url);

  document
    .querySelector('meta[itemprop="name"]')
    .setAttribute("content", props.title);
  document
    .querySelector('meta[itemprop="description"]')
    .setAttribute("content", props.description);
  document
    .querySelector('meta[itemprop="image"]')
    .setAttribute("content", props.image);

  document
    .querySelector('link[rel="canonical"]')
    .setAttribute("href", props.url);

  return "";
};
