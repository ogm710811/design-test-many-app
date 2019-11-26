import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectDropdownSettings} from '../../models/select-dropdown-settings';
import {Data} from '../../models/data.interface';

@Component({
  selector: 'fox-select-dropdown',
  templateUrl: './fox-select-dropdown.component.html',
  styleUrls: ['./fox-select-dropdown.component.css']
})
export class FoxSelectDropdownComponent implements OnInit {
  public static readonly selectDropdownSettingsDefault: SelectDropdownSettings = {
    closeOnSelect: false,
    placeholder: 'select value',
    hideSelected: false,
    hasAllSelectCheckbox: false
  };

  @Output() selectedItemsEmitter = new EventEmitter<any>();
  @Input() selectDropdownDataSource: Data[];
  @Input()
  set selectDropdownParams(selectDropdownParams: SelectDropdownSettings) {
    this._selectDropdownParams = {
      ...FoxSelectDropdownComponent.selectDropdownSettingsDefault,
      ...selectDropdownParams
    };
  }

  get selectDropdownParams(): SelectDropdownSettings {
    return this._selectDropdownParams;
  }

  set isSelectAllChecked(v: boolean) {
    this._isSelectAllChecked = v;
  }

  get isSelectAllChecked(): boolean {
    return this._isSelectAllChecked;
  }

  selectedItems: string[] = [];
  private _isSelectAllChecked = false;
  private _selectDropdownParams: SelectDropdownSettings;

  constructor() { }

  ngOnInit() { }

  onClear(): void {
    this.isSelectAllChecked = false;
  }

  onChange(): void {
    if (this.selectedItems.length < this.selectDropdownDataSource.length) {
      this.isSelectAllChecked = false;
    }
    const result: Data[] = [];
    if (this.selectedItems.length) {
      this.selectedItems.forEach((v, i) => {
        result.push(this.selectDropdownDataSource[v]);
      });
    }
    console.log(result)
    this.selectedItemsEmitter.emit(result);
  }

  checkSelectAll(): void {
    const result: Data[] = [];
    if (!this.selectedItems.length || this.selectedItems.length < this.selectDropdownDataSource.length) {
      this.selectedItems = this.selectDropdownDataSource.map(i => i.id);
      this.isSelectAllChecked = true;
      console.log(this.selectedItems)
      if (this.selectedItems.length) {
        this.selectedItems.forEach((v, i) => {
          result.push(this.selectDropdownDataSource[v]);
        });
      }
      this.selectedItemsEmitter.emit(result);
    } else {
      this.selectedItems = [];
      this.isSelectAllChecked = false;
      this.selectedItemsEmitter.emit(this.selectedItems);
    }
  }

}
