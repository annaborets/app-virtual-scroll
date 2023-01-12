import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';

import { ListSettings, ScrollSettings } from 'src/app/models/settings';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.scss']
})
export class VirtualScrollComponent implements OnInit, AfterViewInit {
  public scrollSettings: ScrollSettings = {
    viewportHeight: 0,
    start: 0,
    visibleRows: 0,
    topPaddingHeight: 0,
    bottomPaddingHeight: 0
  };

  public renderedListPart!: any[];

  @Input() list: any[] = [];
  @Input() listSettings!: ListSettings;

  @ViewChild('wrapper') wrapper!: ElementRef;

  ngOnInit(): void {
    const itemsAbove =
      this.listSettings.startIndex -
      this.listSettings.additionalItems -
      this.listSettings.minIndex;
    this.scrollSettings.topPaddingHeight =
      itemsAbove * this.listSettings.itemHeightinPixels;
    this.renderedListPart = this.getRenderedData(
      this.scrollSettings.start,
      this.listSettings.itemsAmount
    );
    this.scrollSettings.viewportHeight =
      this.listSettings.itemHeightinPixels * this.listSettings.itemsAmount;
  }

  ngAfterViewInit(): void {
    const initialScrollPosition = this.scrollSettings.topPaddingHeight;
    if (!initialScrollPosition) {
      this.onTableScroll(0);
    }

    this.wrapper.nativeElement.scrollTop = initialScrollPosition;
  }

  public onTableScroll(event: any): void {
    const AdditionalItemsHeight =
      this.listSettings.additionalItems * this.listSettings.itemHeightinPixels;
    const endIndex =
      this.listSettings.itemsAmount + 2 * this.listSettings.additionalItems;
    const totalHeight =
      (this.listSettings.maxIndex - this.listSettings.minIndex + 1) *
      this.listSettings.itemHeightinPixels;
    const startIndex =
      this.listSettings.minIndex +
      Math.floor(
        (event.target.scrollTop - AdditionalItemsHeight) /
          this.listSettings.itemHeightinPixels
      );
    this.getRenderedData(startIndex, endIndex);
    this.scrollSettings.topPaddingHeight =
      (startIndex - this.listSettings.minIndex) *
      this.listSettings.itemHeightinPixels;
    this.scrollSettings.bottomPaddingHeight =
      totalHeight -
      this.scrollSettings.topPaddingHeight -
      this.list.length * this.listSettings.itemHeightinPixels;
  }

  private getRenderedData(startIndex: number, endIndex: number): any[] {
    this.renderedListPart = [];
    const startPoint = Math.max(this.listSettings.minIndex, startIndex);
    const endPoint = Math.min(
      startIndex + endIndex - 1,
      this.listSettings.maxIndex
    );
    if (startPoint <= endPoint) {
      for (let i = startPoint; i <= endPoint; i++) {
        this.renderedListPart.push(this.list[i]);
      }
    }

    return this.renderedListPart;
  }
}
