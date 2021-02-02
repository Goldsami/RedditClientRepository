import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription, Observable } from 'rxjs';
import { SwipeParams } from '../models/classes';
import { RedditPost } from '../models/RedditPost';
import { RedditProfile } from '../models/RedditProfile';
import { RedditProfileService } from '../services/reddit-profile.service';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.page.html',
  styleUrls: ['./deleted.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeletedPage implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  constructor(private _redditProfileService: RedditProfileService, private cdr: ChangeDetectorRef) {
    this.posts = this._redditProfileService.posts;
    this.deletedPostsIds = this._redditProfileService.deletedPostsIds
  }

  ngOnInit() {
  }

  posts: Observable<RedditPost[]>;
  deletedPostsIds: Observable<string[]>;

  swipeParams: SwipeParams = new SwipeParams(false, true, '', 'trash-outline');

  restorePost(postId: string) {
    this._redditProfileService.removePostFromDeleted(postId);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

}


