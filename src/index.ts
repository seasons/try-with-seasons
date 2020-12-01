// @ts-ignore
import baseCss from "./static/base.css";
// @ts-ignore
import iframeScript from "raw-loader!./iframe";
import {
  WidgetType,
  FrameEvent,
  RenderConfig,
  FrameEventHandler,
  FrameEventDataRootSize,
} from "./types";

import { parse as parseStructuredData } from "./product-detail-parsers/structured-data";

const widgets = {
  [WidgetType.TEXT_BUTTON_LIGHT]: {
    html: require("./static/components/button/index.html"),
    css: require("./static/components/button/text-light.css"),
  },
  [WidgetType.TEXT_BUTTON_DARK]: {
    html: require("./static/components/button/index.html"),
    css: require("./static/components/button/text-dark.css"),
  },
  [WidgetType.OUTLINE_BUTTON_LIGHT]: {
    html: require("./static/components/button/index.html"),
    css: require("./static/components/button/outline-light.css"),
  },
  [WidgetType.OUTLINE_BUTTON_DARK]: {
    html: require("./static/components/button/index.html"),
    css: require("./static/components/button/outline-dark.css"),
  },
  [WidgetType.SOLID_BUTTON_LIGHT]: {
    html: require("./static/components/button/index.html"),
    css: require("./static/components/button/solid-light.css"),
  },
  [WidgetType.SOLID_BUTTON_DARK]: {
    html: require("./static/components/button/index.html"),
    css: require("./static/components/button/solid-dark.css"),
  },
  [WidgetType.SOLID_BUTTON_BLUR]: {
    html: require("./static/components/button/index.html"),
    css: require("./static/components/button/solid-blur.css"),
  },
  [WidgetType.CTA_LIGHT]: {
    html: require("./static/components/cta/index.html"),
    css: require("./static/components/cta/light.css"),
  },
  [WidgetType.CTA_DARK]: {
    html: require("./static/components/cta/index.html"),
    css: require("./static/components/cta/dark.css"),
  },
};

const compileWidget = ({
  html,
  variables,
}: {
  html: string;
  variables: { [key: string]: string };
}): string => {
  return Object.entries(variables).reduce((memo, [key, value]) => {
    return memo.replace(new RegExp("\\${" + key + "}"), value);
  }, html);
};

const frameMessageHandlers = {
  [FrameEvent.ROOT_SIZE]: ({
    iframe,
    data: { width, height },
  }: FrameEventHandler<FrameEventDataRootSize>) => {
    iframe.style.height = `${height + 1}px`;
    iframe.style.width = `${width + 1}px`;
    iframe.style.visibility = "visible";
  },
};

const render = async ({
  containerElement,
  type,
  productDetails,
}: RenderConfig) => {

  const parsedProductDetails = productDetails
    ? productDetails
    : await parseStructuredData();

  if (!parsedProductDetails) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[TryWithSeasons] Could not find product details, exiting without rendering."
      );
    }
    return;
  }

  const { html, css } = widgets[type];

  const compiledHtml = compileWidget({
    html,
    variables: {
      ...parsedProductDetails,
      seasonsHomeUrl: process.env.FLARE_ORIGIN as string,
    },
  });

  const iframeAttributes = [
    ["allowtransparency", "true"],
    ["frameborder", "0"],
    ["scrolling", "no"],
    ["tabindex", "0"],
    ["title", "Try With Seasons"],
    [
      "style",
      "border: none !important; visibility: hidden !important; width:100% !important;",
    ],
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
          ${compiledHtml}
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
      if (process.env.NODE_ENV !== "production") {
        console.log("[TryWithSeasons] frame event: ", ev.data);
      }

      if (frameMessageHandlers[ev.data.type]) {
        frameMessageHandlers[ev.data.type]({ iframe, data: ev.data.data });
      } else if (process.env.NODE_ENV !== "production") {
        console.warn("[TryWithSeasons] unhandled frame event: " + ev);
      }
    }
  );

  containerElement.appendChild(iframe);
};

export default {
  render,
  WidgetType,
};
