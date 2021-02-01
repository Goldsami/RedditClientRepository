import { ProfileHeaderComponent } from '../profile-header/profile-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllPostsPageRoutingModule } from './all-posts-routing.module';

import { AllPostsPage } from './all-posts.page';
import { RedditPostComponent } from '../reddit-post/reddit-post.component';
import { SwingModule } from 'angular2-swing';
import { RedditPostsListComponent } from '../reddit-posts-list/reddit-posts-list.component';
import { PageHeaderComponent } from '../page-header/page-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllPostsPageRoutingModule,
    SwingModule
  ],
  declarations: [
    AllPostsPage,
    ProfileHeaderComponent,
    RedditPostComponent,
    RedditPostsListComponent,
    PageHeaderComponent
  ],
})
export class AllPostsPageModule { }
