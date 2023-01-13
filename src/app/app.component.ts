import { Component, OnInit } from '@angular/core';
import { ItemsSettings } from './models/settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public items: string[] = [];
  public itemsSettings: ItemsSettings = {
    // startIndex: 1,
    itemHeight: 60,
    viewportHeight: 600,
    // itemsAmount: 10,
    additionalItems: 2
  };

  ngOnInit() {
    this.generateItems(1000);
  }

  public generateItems(length: number): string[] {
    if (1 <= length) {
      for (let i = 1; i <= length; i++) {
        this.items.push(`Item №${i}`);
      }
    }
    return this.items;
  }
}
