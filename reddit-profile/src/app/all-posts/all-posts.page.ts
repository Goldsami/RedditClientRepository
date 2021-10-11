import { SwipeParams } from './../models/classes';
import { RedditPost } from './../models/RedditPost';
import { RedditProfile } from '../models/RedditProfile';
import { RedditProfileService } from '../services/reddit-profile.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.page.html',
  styleUrls: ['./all-posts.page.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllPostsPage implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  profile: Observable<RedditProfile>;
  posts: Observable<RedditPost[]>;
  savedPostsIds: Observable<string[]>;
  deletedPostsIds: Observable<string[]>;

  swipeParams: SwipeParams = new SwipeParams(true, true, 'star', 'trash');

  constructor(
    private redditProfileService: RedditProfileService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.savedPostsIds = this.redditProfileService.savedPostsIds;
    this.deletedPostsIds = this.redditProfileService.deletedPostsIds;
    this.posts = this.redditProfileService.posts;
    this.profile = this.redditProfileService.profile;
  }

  deletePost(postId: string) {
    this.subscriptions.push(
      this.savedPostsIds.subscribe((ids) => {
        if (ids.includes(postId)) {
          this.redditProfileService.presentToast(
            'Starred post cannot be deleted',
            'warning'
          );
          return;
        } else {
          this.redditProfileService.deletePost(postId);
        }
      })
    );
  }

  savePost(postId: string) {
    this.subscriptions.push(
      this.savedPostsIds.pipe(take(1)).subscribe((ids) => {
        if (ids.includes(postId)) {
          this.redditProfileService.presentToast(
            'Post is starred already',
            'warning'
          );
          return;
        } else {
          this.redditProfileService.savePost(postId);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
