export interface ListSettings {
  minIndex: number;
  maxIndex: number;
  startIndex: number;
  itemHeightinPixels: number;
  itemsAmount: number;
  additionalItems: number;
}

export interface ScrollSettings {
  viewportHeight: number;
  start: number;
  visibleRows: number;
  topPaddingHeight: number;
  bottomPaddingHeight: number;
}
