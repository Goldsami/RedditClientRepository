import { Component, OnInit } from '@angular/core';
import { RedditPost } from '../models/RedditPost';
import { RedditProfile } from '../models/RedditProfile';
import { RedditProfileService } from '../services/reddit-profile.service';

@Component({
  selector: 'app-starred',
  templateUrl: './starred.page.html',
  styleUrls: ['./starred.page.scss'],
})
export class StarredPage implements OnInit {

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
