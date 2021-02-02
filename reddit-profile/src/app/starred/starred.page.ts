import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SwipeParams } from '../models/classes';
import { RedditPost } from '../models/RedditPost';
import { RedditProfileService } from '../services/reddit-profile.service';

@Component({
  selector: 'app-starred',
  templateUrl: './starred.page.html',
  styleUrls: ['./starred.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarredPage implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  constructor(private _redditProfileService: RedditProfileService, private cdr: ChangeDetectorRef) {
    this.posts = this._redditProfileService.posts;
    this.savedPostsIds = this._redditProfileService.savedPostsIds;
  }

  ngOnInit() {
  }

  posts: Observable<RedditPost[]>;
  savedPostsIds: Observable<string[]>;

  swipeParams: SwipeParams = new SwipeParams(true, false, 'star-outline', '');

  unSavePost(postId: string) {
    this._redditProfileService.removePostFromSaved(postId);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

}
