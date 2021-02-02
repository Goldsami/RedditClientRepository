import { RedditProfile } from '../models/RedditProfile';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  @Input() redditProfile: RedditProfile;

}

