import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RedditPost } from '../models/RedditPost';
import { RedditProfileService } from '../services/reddit-profile.service';

@Component({
  selector: 'app-starred',
  templateUrl: './starred.page.html',
  styleUrls: ['./starred.page.scss'],
})
export class StarredPage implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  constructor(private _redditProfileService: RedditProfileService) {
    this._subscriptions.push(this._redditProfileService.posts.subscribe(res => this.posts = res))
  }

  ngOnInit() {
  }

  posts: RedditPost[];

  unSavePost(post: RedditPost) {
    // let postCopy = new RedditPost(post.id, post.title, post.imageUrl, post.subredditId);
    // postCopy.isStarred = false;
    // this.posts.splice(this.posts.indexOf(post), 1, postCopy);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

}
