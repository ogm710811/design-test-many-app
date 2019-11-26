import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './views/view.html'
})
export class StylingExampleComponent implements OnInit {

  constructor() {

  }

  itemList = [];
  selectedItems = [];
  settings = {};
  title = 'Custom styling';
  tsgist = 'CuppaLabs/67fb11cbb67a62888ca0a3adb44ee440';
  htmlgist = 'CuppaLabs/eb78d42ab7971fda6493586e329bfdb8';
  cssgist = 'CuppaLabs/e6efeedade8f737df03107625df165e7';
  tstitle = 'customStyling.ts';
  htmltitle = 'customStyling.html';
  csstitle = 'app.css';
  ngOnInit() {
    this.itemList = [
      { 'id': 1, 'itemName': 'India' },
      { 'id': 2, 'itemName': 'Singapore' },
      { 'id': 3, 'itemName': 'Australia' },
      { 'id': 4, 'itemName': 'Canada' },
      { 'id': 5, 'itemName': 'South Korea' },
      { 'id': 6, 'itemName': 'Brazil' }
    ];

    this.settings = {
      text: 'Plans:',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: 'myclass custom-class-example'
    };
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
}
