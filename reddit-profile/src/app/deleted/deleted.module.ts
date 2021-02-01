import { ProfileHeaderComponent } from '../profile-header/profile-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeletedPageRoutingModule } from './deleted-routing.module';

import { DeletedPage } from './deleted.page';
import { RedditPostComponent } from '../reddit-post/reddit-post.component';
import { RedditPostsListComponent } from '../reddit-posts-list/reddit-posts-list.component';
import { PageHeaderComponent } from '../page-header/page-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeletedPageRoutingModule
  ],
  declarations: [
    DeletedPage,
    ProfileHeaderComponent,
    RedditPostComponent,
    RedditPostsListComponent,
    PageHeaderComponent
  ]
})
export class DeletedPageModule { }
