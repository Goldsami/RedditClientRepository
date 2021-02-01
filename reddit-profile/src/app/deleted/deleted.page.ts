import { Component, OnDestroy, OnInit } from '@angular/core';
import { Direction, StackConfig } from 'angular2-swing';
import { Subscription } from 'rxjs';
import { DisplayOptions } from '../models/classes';
import { RedditPost } from '../models/RedditPost';
import { RedditProfile } from '../models/RedditProfile';
import { RedditProfileService } from '../services/reddit-profile.service';
import { URLList } from '../services/URLs';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.page.html',
  styleUrls: ['./deleted.page.scss'],
})
export class DeletedPage implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  constructor(private _redditProfileService: RedditProfileService) {
    this._subscriptions.push(this._redditProfileService.posts.subscribe(res => { this.posts = res; console.debug(res) }));
  }

  ngOnInit() {
  }

  posts: RedditPost[];

  stackConfig: StackConfig = {
    allowedDirections: [
      Direction.RIGHT
    ]
  };

  displayOptions: DisplayOptions = new DisplayOptions(false, true)

  restorePost(post: RedditPost) {
    post.isDeleted = false;
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

}


