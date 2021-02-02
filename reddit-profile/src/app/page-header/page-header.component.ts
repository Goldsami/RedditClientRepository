import { RedditProfileService } from './../services/reddit-profile.service';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderComponent implements OnInit {

  constructor(private _redditProfileService: RedditProfileService) { }

  ngOnInit() { }

  @Input() pageName: string;

  refresh() {
    this._redditProfileService.refreshPage();
  }

}
