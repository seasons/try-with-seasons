/**
 * This file will execute within the iframe context. Due to how we're
 * inlining this, note that it will not have access to the rest of the
 * bundle, and executes as if the entire file were eval'd directly
 * within the iframe contentDocument.
 */

const PRIMARY_ACTION_CLICKED = "SEASONS_PRIMARY_ACTION_CLICKED";
const ROOT_SIZE = "SEASONS_ROOT_SIZE";

const rootElement = document.querySelector(".root") as HTMLElement | null;
if (rootElement) {
  console.log(rootElement.offsetWidth, rootElement.offsetHeight)
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

const primaryActionElement = document.getElementById("primary-action");
if (primaryActionElement) {
  primaryActionElement.addEventListener("click", () => {
    window.parent.postMessage({ type: PRIMARY_ACTION_CLICKED }, "*");
  });
}
