import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { SwipeParams } from '../models/classes';
import { RedditPost } from '../models/RedditPost';
import { RedditProfileService } from '../services/reddit-profile.service';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.page.html',
  styleUrls: ['./deleted.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeletedPage implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  posts: Observable<RedditPost[]>;
  deletedPostsIds: Observable<string[]>;

  swipeParams: SwipeParams = new SwipeParams(false, true, '', 'trash-outline');

  constructor(
    private redditProfileService: RedditProfileService,
    private cdr: ChangeDetectorRef
  ) {
    this.posts = this.redditProfileService.posts;
    this.deletedPostsIds = this.redditProfileService.deletedPostsIds;
  }

  ngOnInit() {}

  restorePost(postId: string) {
    this.redditProfileService.removePostFromDeleted(postId);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
