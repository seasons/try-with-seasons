/**
 * This file will execute within the iframe context. Due to how we're
 * inlining this, note that it will not have access to the rest of the
 * bundle, and executes as if the entire file were eval'd directly
 * within the iframe contentDocument.
 */

const PRIMARY_ACTION_CLICKED = "SEASONS_PRIMARY_ACTION_CLICKED";

const primaryAction = document.getElementById("primary-action");

if (primaryAction) {
  primaryAction.addEventListener("click", () => {
    window.parent.postMessage(PRIMARY_ACTION_CLICKED, "*");

    console.log("[TryWithSeasons] sending event: PRIMARY_ACTION_CLICKED");
  });
} else {
  console.warn(
    "[TryWithSeasons] Expected #primary-action to attach click listener, but found none."
  );
}
