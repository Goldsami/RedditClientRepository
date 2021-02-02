import { RedditPost } from './../models/RedditPost';
import { RedditProfile } from '../models/RedditProfile';
import { RedditProfileService } from '../services/reddit-profile.service';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.page.html',
  styleUrls: ['./all-posts.page.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllPostsPage implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  constructor(private _redditProfileService: RedditProfileService, private cdr: ChangeDetectorRef) {
    this.savedPostsIds = this._redditProfileService.savedPostsIds;
    this.deletedPostsIds = this._redditProfileService.deletedPostsIds;
    this.posts = this._redditProfileService.posts;
    this.profile = this._redditProfileService.profile;

  }

  ngOnInit() {

  }

  profile: Observable<RedditProfile>;
  posts: Observable<RedditPost[]>;
  savedPostsIds: Observable<string[]>;
  deletedPostsIds: Observable<string[]>;

  deletePost(postId: string) {
    this._subscriptions.push(
      this.savedPostsIds.subscribe(ids => {
        if (ids.includes(postId)) {
          this._redditProfileService.presentToast('Starred post cannot be deleted', 'warning');
          return;
        }
        else this._redditProfileService.deletePost(postId);
      }))

  }

  savePost(postId: string) {
    this._subscriptions.push(
      this.savedPostsIds.subscribe(ids => {
        if (ids.includes(postId)) {
          this._redditProfileService.presentToast('Post is starred already', 'warning');
          return;
        }
        else this._redditProfileService.savePost(postId);
      }))
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

}
