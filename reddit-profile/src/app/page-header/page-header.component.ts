import { RedditProfileService } from './../services/reddit-profile.service';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent implements OnInit {
  @Input() pageName: string;
  @Input() showRefresh: boolean;

  constructor(private redditProfileService: RedditProfileService) {}

  ngOnInit() {}

  refresh() {
    this.redditProfileService.refreshPage();
  }
}
