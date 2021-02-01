import { RedditProfileService } from '../services/reddit-profile.service';
import { RedditPost } from '../models/RedditPost';
import { Component, Input, OnInit } from '@angular/core';
import { URLList } from '../services/constants';

@Component({
  selector: 'app-reddit-post',
  templateUrl: './reddit-post.component.html',
  styleUrls: ['./reddit-post.component.scss'],
})
export class RedditPostComponent implements OnInit {

  constructor(private _redditProfileService: RedditProfileService) { }

  ngOnInit() { }

  @Input() post: RedditPost;

  open(postId: string) {
    this._redditProfileService.openPostInBrowser(postId);
  }

}
