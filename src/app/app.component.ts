import { Component, OnInit } from '@angular/core';
import { ListSettings } from './models/settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public list: string[] = [];
  public listSettings: ListSettings = {
    minIndex: 0,
    maxIndex: 1000,
    startIndex: 1,
    itemHeightinPixels: 60,
    itemsAmount: 10,
    additionalItems: 2
  };

  ngOnInit() {
    this.generateList(1000);
  }

  public generateList(length: number): string[] {
    if (1 <= length) {
      for (let i = 1; i <= length; i++) {
        this.list.push(`Item №${i}`);
      }
    }
    return this.list;
  }
}
