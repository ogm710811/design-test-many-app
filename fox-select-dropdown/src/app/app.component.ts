import {Component, OnInit} from '@angular/core';
import { Data} from './share/models/data.interface';
import {DataService} from './share/services/data.service';

@Component({
  selector: 'fox-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectDropdownDataSource: Data[];
  basicSelectedItemsSelectAll: Data[] = [];
  selectedItemsSelectAll: Data[] = [];

  default = {
    closeOnSelect: false,
    placeholder: 'select value',
    hideSelected: true,
    hasAllSelectCheckbox: false
  };

  selectAll = {
    closeOnSelect: false,
    placeholder: 'select value',
    hideSelected: false,
    hasAllSelectCheckbox: true
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    console.log('app.component');
    this.dataService.getPlans()
      .pipe()
      .subscribe((res) => {
        this.selectDropdownDataSource = res;
      });
  }

  onSelectedItemsSelectAll(items: Data[]) {
    this.selectedItemsSelectAll = items;
  }

  onBasicSelectedItemsSelectAll(items: Data[]) {
    this.basicSelectedItemsSelectAll = items;
  }
}
