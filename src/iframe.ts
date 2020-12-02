/**
 * This file will execute within the iframe context. Due to how we're
 * inlining this, note that it will not have access to the rest of the
 * bundle, and executes as if the entire file were eval'd directly
 * within the iframe contentDocument.
 */

const ROOT_SIZE = "SEASONS_ROOT_SIZE";

const rootElement = document.getElementById("root") as HTMLElement | null;
if (rootElement) {
  window.parent.postMessage(
    {
      type: ROOT_SIZE,
      data: {
        width: rootElement.offsetWidth,
        height: rootElement.offsetHeight,
      },
    },
    "*"
  );
}
