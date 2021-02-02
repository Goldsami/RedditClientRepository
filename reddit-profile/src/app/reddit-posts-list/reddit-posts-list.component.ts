import { SwipeParams } from './../models/classes';
import { RedditPost } from '../models/RedditPost';
import {
  AfterViewInit, Component, OnInit, Input, Output, EventEmitter, OnDestroy,
  ElementRef, QueryList, ViewChildren, OnChanges, AfterViewChecked, ChangeDetectionStrategy, AfterContentInit, DoCheck, AfterContentChecked, ChangeDetectorRef, NgZone
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AnimationController, DomController, GestureController } from '@ionic/angular'

@Component({
  selector: 'app-reddit-posts-list',
  templateUrl: './reddit-posts-list.component.html',
  styleUrls: ['./reddit-posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedditPostsListComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit() {
  }

  @Input() posts: RedditPost[];

  @Input() savedPostsIds: string[];

  @Input() swipeParams: SwipeParams;

  @Output() rightSwingEvent = new EventEmitter<string>();

  @Output() leftSwingEvent = new EventEmitter<string>();

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
    this.leftSwingEvent.emit(post.id)
  }

  swipeRight(post: RedditPost, slidingItem) {
    slidingItem.close();
    this.rightSwingEvent.emit(post.id)
  }

  tf(s) {
    s.close();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

}
