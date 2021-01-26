import { ProfileHeaderComponent } from './../profile-header/profile-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StarredPageRoutingModule } from './starred-routing.module';

import { StarredPage } from './starred.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarredPageRoutingModule
  ],
  declarations: [StarredPage, ProfileHeaderComponent]
})
export class StarredPageModule { }
