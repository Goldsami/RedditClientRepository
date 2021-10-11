import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SwipeParams } from '../models/classes';
import { RedditPost } from '../models/RedditPost';
import { RedditProfileService } from '../services/reddit-profile.service';

@Component({
  selector: 'app-starred',
  templateUrl: './starred.page.html',
  styleUrls: ['./starred.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarredPage implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  posts: Observable<RedditPost[]>;
  savedPostsIds: Observable<string[]>;

  swipeParams: SwipeParams = new SwipeParams(true, false, 'star-outline', '');

  constructor(
    private redditProfileService: RedditProfileService,
    private cdr: ChangeDetectorRef
  ) {
    this.posts = this.redditProfileService.posts;
    this.savedPostsIds = this.redditProfileService.savedPostsIds;
  }

  ngOnInit() {}

  unSavePost(postId: string) {
    this.redditProfileService.removePostFromSaved(postId);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
