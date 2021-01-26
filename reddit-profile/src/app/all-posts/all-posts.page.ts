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
    if (!_redditProfileService.posts) {
      _redditProfileService.getSubredditPosts().subscribe(r => {
        this.posts = _redditProfileService.posts;
      })
    }
    if (!_redditProfileService.profile) {
      _redditProfileService.getSubredditProfile().subscribe(r => {
        this.profile = _redditProfileService.profile;
      })
    }
  }

  ngOnInit() {

  }

  profile: RedditProfile;
  posts: RedditPost[];

}
