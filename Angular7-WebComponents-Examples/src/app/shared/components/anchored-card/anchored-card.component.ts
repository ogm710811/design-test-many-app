import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-anchored-card',
  templateUrl: './anchored-card.component.html',
  styleUrls: ['./anchored-card.component.scss']
})
export class AnchoredCardComponent implements OnInit {
  @Input() public disabledCard = false;
  constructor() {}

  public ngOnInit() {}
}
