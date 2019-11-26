import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isRoot: Observable<boolean>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isRoot = this.router.events.pipe(
        filter(x => x instanceof NavigationEnd),
        map((x: RouterEvent) => x.url !== '/')
    );
  }
}
