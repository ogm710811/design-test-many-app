import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Joke} from '../models/joke';
import {JokeService} from '../services/joke.service';
import {Memoize} from 'lodash-decorators';

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.scss']
})
export class JokeListComponent implements OnInit {
  jokes$: Observable<Array<Joke>>;

  constructor(private jokeService: JokeService) { }

  ngOnInit() {
    this.jokes$ = this.jokeService.jokes;
    console.log('JOKES:::::', this.jokes$)
  }

  @Memoize()
  getVotes(id: number) {
    return Math.floor(10 + Math.random() * (100 - 10));
  }

}
