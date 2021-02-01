import { RedditPost } from './../models/RedditPost';
import { RedditProfile } from '../models/RedditProfile';
import { RedditProfileService } from '../services/reddit-profile.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
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

  deletePost(post: RedditPost) {
    // console.debug(post);
    // if (post.isStarred) {
    //   this._redditProfileService.presentToast('You can\'t delete starred post.', 'danger');
    //   return;
    // }
    // let postCopy = new RedditPost(post.id, post.title, post.imageUrl, post.subredditId);
    // postCopy.isDeleted = true;
    // this.posts.splice(this.posts.indexOf(post), 1, postCopy);
  }

  savePost(post: RedditPost) {
    // if (post.isStarred) {
    //   this._redditProfileService.presentToast('Post is already starred.', 'warning');
    //   return;
    // }
    // post.isStarred = true;
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

}
