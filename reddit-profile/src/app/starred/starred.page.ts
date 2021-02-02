import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SwipeParams } from '../models/classes';
import { RedditPost } from '../models/RedditPost';
import { RedditProfileService } from '../services/reddit-profile.service';

@Component({
  selector: 'app-starred',
  templateUrl: './starred.page.html',
  styleUrls: ['./starred.page.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarredPage implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  constructor(private _redditProfileService: RedditProfileService) {
    this._subscriptions.push(this._redditProfileService.savedPostsIds.subscribe(res => this.savedPostsIds = res));
    this._subscriptions.push(this._redditProfileService.posts.subscribe(res => this.posts = res))
  }

  ngOnInit() {
  }

  posts: RedditPost[];
  savedPostsIds: string[];

  swipeParams: SwipeParams = new SwipeParams(true, false);

  unSavePost(postId: string) {
    this._redditProfileService.removePostFromSaved(postId);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

}
