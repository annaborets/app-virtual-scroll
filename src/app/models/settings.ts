export interface ItemsSettings {
  // startIndex: number;
  itemHeight: number;
  viewportHeight: number;
  additionalItems: number;
}

export interface ScrollSettings {
  itemsAbove: number;
  itemsBelow: number;
  renderedItemsAmount: number;
  topOffsetHeight: number;
  bottomOffsetHeight: number;
}
