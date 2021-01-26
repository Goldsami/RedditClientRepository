import { RedditPost } from './../models/RedditPost';
import { RedditProfile } from './../models/RedditProfile';
import { RedditProfileService } from './../services/reddit-profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.page.html',
  styleUrls: ['./all-posts.page.scss'],
})
export class AllPostsPage implements OnInit {

  constructor(private _redditProfileService: RedditProfileService) {

    this._redditProfileService.getSubredditPosts().subscribe(r => {
      this.posts = this._redditProfileService.posts;
      console.debug(this.posts);
    });

    this._redditProfileService.getSubredditProfile().subscribe(r => {
      this.profile = this._redditProfileService.profile;
      console.debug(this.profile);
    });
  }

  ngOnInit() {

  }

  profile: RedditProfile;
  posts: RedditPost[];

}
