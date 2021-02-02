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

  deletePost(post: RedditPost) {
    this._redditProfileService.deletePost(post.id);
  }

  savePost(post: RedditPost) {
    this._redditProfileService.savePost(post.id);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

}
