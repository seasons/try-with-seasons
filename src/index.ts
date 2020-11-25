// @ts-ignore
import baseCss from "./base.css";
// @ts-ignore
import iframeScript from "raw-loader!./iframe";

enum WidgetType {
  TEXT_BUTTON_LIGHT = "TEXT_BUTTON_LIGHT",
  TEXT_BUTTON_DARK = "TEXT_BUTTON_DARK",
  OUTLINE_BUTTON_LIGHT = "OUTLINE_BUTTON_LIGHT",
  OUTLINE_BUTTON_DARK = "OUTLINE_BUTTON_DARK",
  SOLID_BUTTON_LIGHT = "SOLID_BUTTON_LIGHT",
  SOLID_BUTTON_DARK = "SOLID_BUTTON_DARK",
  SOLID_BUTTON_BLUR = "SOLID_BUTTON_BLUR",
}

enum FrameEvent {
  PRIMARY_ACTION_CLICKED = "SEASONS_PRIMARY_ACTION_CLICKED",
  ROOT_SIZE = "SEASONS_ROOT_SIZE",
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
  [WidgetType.OUTLINE_BUTTON_LIGHT]: {
    html: require("./components/outline-button/index.html"),
    css: require("./components/outline-button/light.css"),
  },
  [WidgetType.OUTLINE_BUTTON_DARK]: {
    html: require("./components/outline-button/index.html"),
    css: require("./components/outline-button/dark.css"),
  },
  [WidgetType.SOLID_BUTTON_LIGHT]: {
    html: require("./components/solid-button/index.html"),
    css: require("./components/solid-button/light.css"),
  },
  [WidgetType.SOLID_BUTTON_DARK]: {
    html: require("./components/solid-button/index.html"),
    css: require("./components/solid-button/dark.css"),
  },
  [WidgetType.SOLID_BUTTON_BLUR]: {
    html: require("./components/solid-button/index.html"),
    css: require("./components/solid-button/blur.css"),
  },
};

const frameMessageHandlers = {
  [FrameEvent.PRIMARY_ACTION_CLICKED]: () => {
    if (process.env.NODE_ENV !== "production") {
      console.log("[TryWithSeasons] handling event: PRIMARY_ACTION_CLICKED");
    }

    // FIXME: navigate to product using json-ld data
    // window.location.href = "https://wearseasons.com";
  },
  [FrameEvent.ROOT_SIZE]: (
    iframe: HTMLIFrameElement,
    data: { width: number; height: number }
  ) => {
    iframe.style.height = `${data.height + 1}px`;
    iframe.style.width = `${data.width + 1}px`;
    iframe.style.visibility = "visible";
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
    ["style", "border: none !important; visibility: hidden !important;"],
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

  window.addEventListener(
    "message",
    (ev: MessageEvent<{ type: FrameEvent; data?: any }>) => {
      if ((ev.source as WindowProxy)?.frameElement !== iframe) {
        return;
      }

      if (frameMessageHandlers[ev.data.type]) {
        frameMessageHandlers[ev.data.type](iframe, ev.data.data);
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[TryWithSeasons] unhandled iframe event: " + ev);
      }
    }
  );

  containerElement.appendChild(iframe);
};

export default {
  render,
  WidgetType,
};
