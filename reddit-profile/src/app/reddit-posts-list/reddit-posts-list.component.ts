import { DisplayOptions } from '../models/classes';
import { RedditProfileService } from '../services/reddit-profile.service';
import { RedditPost } from '../models/RedditPost';
import { Component, ViewChild, ViewChildren, QueryList, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ToastController } from '@ionic/angular';
import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  Direction,
  SwingStackComponent,
  SwingCardComponent
} from 'angular2-swing';
import { __spread } from 'tslib';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reddit-posts-list',
  templateUrl: './reddit-posts-list.component.html',
  styleUrls: ['./reddit-posts-list.component.scss'],
})
export class RedditPostsListComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  @ViewChild('myswing') swingStack: SwingStackComponent;
  @ViewChildren('mycards') swingCards: QueryList<SwingCardComponent>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this._subscriptions.push(this.swingStack.throwoutright.subscribe(
      (event: ThrowEvent) => {
        let post = this.posts.filter(x => x.id === event.target.id)[0];
        this.rightSwingEvent.emit(post);
      }))

    this._subscriptions.push(this.swingStack.throwoutleft.subscribe(
      (event: ThrowEvent) => {
        let post = this.posts.filter(x => x.id === event.target.id)[0];
        this.leftSwingEvent.emit(post);
      }))
  }

  @Input() posts: RedditPost[] = [];

  @Input() stackConfig: StackConfig;

  @Input() displayOptions: DisplayOptions;

  @Output() rightSwingEvent = new EventEmitter<RedditPost>();

  @Output() leftSwingEvent = new EventEmitter<RedditPost>();

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

}
