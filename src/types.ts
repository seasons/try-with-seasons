export type ProductDetails = {
  name: string;
  seasonsProductUrl: string;
};

export enum WidgetType {
  TEXT_BUTTON_LIGHT = "TEXT_BUTTON_LIGHT",
  TEXT_BUTTON_DARK = "TEXT_BUTTON_DARK",
  OUTLINE_BUTTON_LIGHT = "OUTLINE_BUTTON_LIGHT",
  OUTLINE_BUTTON_DARK = "OUTLINE_BUTTON_DARK",
  SOLID_BUTTON_LIGHT = "SOLID_BUTTON_LIGHT",
  SOLID_BUTTON_DARK = "SOLID_BUTTON_DARK",
  SOLID_BUTTON_BLUR = "SOLID_BUTTON_BLUR",
  CTA_LIGHT = "CTA_LIGHT",
  CTA_DARK = "CTA_DARK",
}

export enum ParserType {
  STRUCTURED_DATA = "STRUCTURED_DATA",
  OPEN_GRAPH_META = "OPEN_GRAPH_META",
}

export type RenderConfig = {
  containerElement: Element;
  type: WidgetType;
  productDetails?: ProductDetails;
  parser?: ParserType;
};

export enum FrameEvent {
  ROOT_SIZE = "SEASONS_ROOT_SIZE",
}

export type FrameEventDataRootSize = { width: number; height: number };

export type FrameEventHandler<D> = { iframe: HTMLIFrameElement; data: D };
