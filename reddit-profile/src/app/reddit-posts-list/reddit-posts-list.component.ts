import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RedditPost } from '../models/RedditPost';
import { SwipeParams } from './../models/classes';

@Component({
  selector: 'app-reddit-posts-list',
  templateUrl: './reddit-posts-list.component.html',
  styleUrls: ['./reddit-posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedditPostsListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @Input() posts: RedditPost[];

  @Input() savedPostsIds: string[];

  @Input() swipeParams: SwipeParams;

  @Output() rightSwingEvent = new EventEmitter<string>();

  @Output() leftSwingEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onSwipe(event, post: RedditPost, slidingItem) {
    switch (event.detail.side) {
      case 'end':
        this.swipeLeft(post, slidingItem);
        break;
      case 'start':
        this.swipeRight(post, slidingItem);
        break;
    }
  }

  swipeLeft(post: RedditPost, slidingItem) {
    slidingItem.close();
    this.leftSwingEvent.emit(post.id);
  }

  swipeRight(post: RedditPost, slidingItem) {
    slidingItem.close();
    this.rightSwingEvent.emit(post.id);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
