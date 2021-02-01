import { RedditPost } from './../models/RedditPost';
import { DisplayOptions } from '../models/classes';
import { RedditProfile } from '../models/RedditProfile';
import { RedditProfileService } from '../services/reddit-profile.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Direction, StackConfig } from 'angular2-swing';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.page.html',
  styleUrls: ['./all-posts.page.scss'],
})
export class AllPostsPage implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  constructor(private _redditProfileService: RedditProfileService) {
    this._subscriptions.push(this._redditProfileService.posts.subscribe(res => this.posts = res));
    this._subscriptions.push(this._redditProfileService.profile.subscribe(res => this.profile = res));

  }

  ngOnInit() {

  }

  profile: RedditProfile;
  posts: RedditPost[];

  stackConfig: StackConfig = {
    allowedDirections: [
      Direction.LEFT,
      Direction.RIGHT
    ]
  };

  displayOptions: DisplayOptions = new DisplayOptions(false, false);

  deletePost(post: RedditPost) {
    console.debug(post);
    if (post.isStarred) {
      this._redditProfileService.presentToast('You can\'t delete starred post.', 'danger');
      return;
    }
    post.isDeleted = true;
  }

  savePost(post: RedditPost) {
    if (post.isStarred) {
      this._redditProfileService.presentToast('Post is already starred.', 'warning');
      return;
    }
    post.isStarred = true;
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

}
