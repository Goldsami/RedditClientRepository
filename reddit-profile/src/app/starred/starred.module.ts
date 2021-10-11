import { GetStarredPipe } from './../services/pipes';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StarredPageRoutingModule } from './starred-routing.module';

import { StarredPage } from './starred.page';
import { RedditPostsListComponent } from '../reddit-posts-list/reddit-posts-list.component';
import { RedditPostComponent } from '../reddit-post/reddit-post.component';
import { ProfileHeaderComponent } from '../profile-header/profile-header.component';
import { PageHeaderComponent } from '../page-header/page-header.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, StarredPageRoutingModule],
  declarations: [
    StarredPage,
    ProfileHeaderComponent,
    RedditPostComponent,
    RedditPostsListComponent,
    PageHeaderComponent,
    GetStarredPipe,
  ],
})
export class StarredPageModule {}
