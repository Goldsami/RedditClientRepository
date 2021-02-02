import { RedditProfileService } from './../services/reddit-profile.service';
import { Subscription } from 'rxjs';
import { RedditPost } from '../models/RedditPost';
import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-reddit-post',
  templateUrl: './reddit-post.component.html',
  styleUrls: ['./reddit-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedditPostComponent implements OnDestroy {
  // private _subscriptions: Subscription[] = []

  constructor(private _redditProfileService: RedditProfileService, private cdr: ChangeDetectorRef) {
    // this._subscriptions.push(this._redditProfileService.savedPostsIds.subscribe(res => this.savedPostsIds = res))
  }

  @Input() post: RedditPost;

  @Input() savedPostsIds: string[] = [];

  open(postId: string) {
    this._redditProfileService.openPostInBrowser(postId);
  }

  ngOnDestroy() {
    // this._subscriptions.forEach(s => s.unsubscribe())
  }

}
