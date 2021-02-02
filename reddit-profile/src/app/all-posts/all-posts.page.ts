import { RedditPost } from './../models/RedditPost';
import { RedditProfile } from '../models/RedditProfile';
import { RedditProfileService } from '../services/reddit-profile.service';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.page.html',
  styleUrls: ['./all-posts.page.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllPostsPage implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  constructor(private _redditProfileService: RedditProfileService) {
    this._subscriptions.push(this._redditProfileService.savedPostsIds.subscribe(res => this.savedPostsIds = res));
    this._subscriptions.push(this._redditProfileService.deletedPostsIds.subscribe(res => this.deletedPostsIds = res));
    this._subscriptions.push(this._redditProfileService.posts.subscribe(res => this.posts = res));
    this._subscriptions.push(this._redditProfileService.profile.subscribe(res => this.profile = res));

  }

  ngOnInit() {

  }

  profile: RedditProfile;
  posts: RedditPost[];
  savedPostsIds: string[];
  deletedPostsIds: string[];

  deletePost(postId: string) {
    console.debug('delete');
    if (this.savedPostsIds.includes(postId)) {
      this._redditProfileService.presentToast('Starred post cannot be deleted', 'warning');
      return;
    }
    else this._redditProfileService.deletePost(postId);
  }

  savePost(postId: string) {
    if (this.savedPostsIds.includes(postId)) {
      this._redditProfileService.presentToast('Post is starred already', 'warning');
      return;
    }
    this._redditProfileService.savePost(postId);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

}
