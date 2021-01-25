import { RedditProfileService } from './../services/reddit-profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.page.html',
  styleUrls: ['./all-posts.page.scss'],
})
export class AllPostsPage implements OnInit {

  constructor(private _redditProfileService: RedditProfileService) {
    this._redditProfileService.getSubredditPosts().subscribe(r => { this.posts = r.data; console.debug(r) });
    this._redditProfileService.getSubredditPage().subscribe(r => { this.profile = r.data; console.debug(r) });
  }

  ngOnInit() {

  }

  profile: any;
  posts: any;

}
