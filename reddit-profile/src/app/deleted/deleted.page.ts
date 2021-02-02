import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs';
import { RedditPost } from '../models/RedditPost';
import { RedditProfile } from '../models/RedditProfile';
import { RedditProfileService } from '../services/reddit-profile.service';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.page.html',
  styleUrls: ['./deleted.page.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeletedPage implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  constructor(private _redditProfileService: RedditProfileService) {
    this._subscriptions.push(this._redditProfileService.deletedPostsIds.subscribe(res => this.deletedPostsIds = res));
    this._subscriptions.push(this._redditProfileService.posts.subscribe(res => { this.posts = res; console.debug(res) }));
  }

  ngOnInit() {
  }

  posts: RedditPost[];
  deletedPostsIds: string[];

  restorePost(postId: string) {
    this._redditProfileService.removePostFromDeleted(postId);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

}


