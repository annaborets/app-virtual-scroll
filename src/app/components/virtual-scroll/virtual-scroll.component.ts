import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';

import { ItemsSettings, ScrollSettings } from 'src/app/models/settings';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.scss']
})
export class VirtualScrollComponent implements OnInit, AfterViewInit {
  public scrollSettings: ScrollSettings = {
    itemsAbove: 0,
    itemsBelow: 0,
    renderedItemsAmount: 0,
    topOffsetHeight: 0,
    bottomOffsetHeight: 0
  };

  public renderedItems!: any[];

  @Input() items: any[] = [];
  @Input() itemsSettings!: ItemsSettings;

  @ViewChild('wrapper') wrapper!: ElementRef;

  ngOnInit(): void {
    this.scrollSettings.renderedItemsAmount =
      this.itemsSettings.viewportHeight / this.itemsSettings.itemHeight;
    this.renderedItems = this.getRenderedData(
      0,
      this.scrollSettings.renderedItemsAmount
    );
    this.calculateBottomOffsetHeight();
    console.log(this.wrapper.nativeElement.scrollTop);
  }

  ngAfterViewInit(): void {
    const initialScrollPosition = this.scrollSettings.topOffsetHeight;
    if (!initialScrollPosition) {
      this.onTableScroll(0);
    }

    this.wrapper.nativeElement.scrollTop = initialScrollPosition;
  }

  public onTableScroll(event: any): void {
    const AdditionalItemsHeight =
      this.itemsSettings.additionalItems * this.itemsSettings.itemHeight;
    const endIndex =
      this.scrollSettings.renderedItemsAmount +
      2 * this.itemsSettings.additionalItems;
    const startIndex =
      1 +
      Math.floor(
        (event.target.scrollTop - AdditionalItemsHeight) /
          this.itemsSettings.itemHeight
      );
    this.getRenderedData(startIndex, endIndex);
    this.calculateTopOffsetHeight(startIndex);
    this.calculateBottomOffsetHeight();
  }

  private getRenderedData(startIndex: number, endIndex: number): any[] {
    this.renderedItems = [];
    const startPoint = Math.max(0, startIndex);
    const endPoint = Math.min(startIndex + endIndex - 1, this.items.length);
    if (startPoint <= endPoint) {
      for (let i = startPoint; i <= endPoint; i++) {
        this.renderedItems.push(this.items[i]);
      }
    }
    return this.renderedItems;
  }

  private calculateTopOffsetHeight(startIndex: number) {
    this.scrollSettings.itemsAbove = startIndex - 1;
    this.scrollSettings.topOffsetHeight =
      this.scrollSettings.itemsAbove * this.itemsSettings.itemHeight;
  }

  private calculateBottomOffsetHeight() {
    this.scrollSettings.itemsBelow =
      this.items.length -
      this.itemsSettings.additionalItems * 2 -
      this.scrollSettings.itemsAbove -
      this.renderedItems.length;
    this.scrollSettings.bottomOffsetHeight =
      this.scrollSettings.itemsBelow * this.itemsSettings.itemHeight;
  }
}
