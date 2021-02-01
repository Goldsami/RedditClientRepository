import { RedditPost } from '../models/RedditPost';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reddit-posts-list',
  templateUrl: './reddit-posts-list.component.html',
  styleUrls: ['./reddit-posts-list.component.scss'],
})
export class RedditPostsListComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit() {
  }

  @Input() posts: RedditPost[] = [];

  @Output() rightSwingEvent = new EventEmitter<RedditPost>();

  @Output() leftSwingEvent = new EventEmitter<RedditPost>();

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

}
