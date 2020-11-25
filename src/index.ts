// @ts-ignore
import baseCss from "./base.css";
// @ts-ignore
import iframeScript from "raw-loader!./iframe";

enum WidgetType {
  TEXT_BUTTON_LIGHT = "TEXT_BUTTON_LIGHT",
  TEXT_BUTTON_DARK = "TEXT_BUTTON_DARK",
}

enum FrameEvent {
  PRIMARY_ACTION_CLICKED = "SEASONS_PRIMARY_ACTION_CLICKED",
}

const widgets = {
  [WidgetType.TEXT_BUTTON_LIGHT]: {
    html: require("./components/text-button/index.html"),
    css: require("./components/text-button/light.css"),
  },
  [WidgetType.TEXT_BUTTON_DARK]: {
    html: require("./components/text-button/index.html"),
    css: require("./components/text-button/dark.css"),
  },
};

const frameMessageHandlers = {
  [FrameEvent.PRIMARY_ACTION_CLICKED]: () => {
    if (process.env.NODE_ENV !== "production") {
      console.log("[TryWithSeasons] handling event: PRIMARY_ACTION_CLICKED");
    }

    // FIXME: navigate to product
    // window.location.href = "https://wearseasons.com";
  },
};

const render = ({
  containerElement,
  type,
}: {
  containerElement: Element;
  type: WidgetType;
}) => {
  const { html, css } = widgets[type];
  const iframeAttributes = [
    ["allowtransparency", "true"],
    ["frameborder", "0"],
    ["scrolling", "no"],
    ["tabindex", "0"],
    ["title", "Try With Seasons"],
    ["style", "border: none !important"],
    [
      "srcdoc",
      `
        <!DOCTYPE html>  
        <head>
          <style type="text/css">
            ${baseCss}
            ${css}
          </style>
        </head>
        <body>
          ${html}
          <script type="text/javascript">
            ${iframeScript}
          </script>
        </body>
      `,
    ],
  ];

  const iframe = document.createElement("iframe");
  iframeAttributes.forEach(([key, value]) => iframe.setAttribute(key, value));

  window.addEventListener("message", (ev: MessageEvent<FrameEvent>) => {
    if ((ev.source as WindowProxy)?.frameElement !== iframe) {
      return;
    }

    if (frameMessageHandlers[ev.data]) {
      frameMessageHandlers[ev.data]();
    } else if (process.env.NODE_ENV !== "production") {
      console.warn("[TryWithSeasons] unhandled iframe event: " + ev);
    }
  });

  containerElement.appendChild(iframe);
};

export default {
  render,
  WidgetType,
};
