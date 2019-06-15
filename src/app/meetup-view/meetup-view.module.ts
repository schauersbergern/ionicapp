import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeetupViewPage } from './meetup-view.page';
import { MeetupEditComponent } from '../meetup-edit/meetup-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MeetupViewPage
  },
  {
    path: ':meetupId',
    component: MeetupViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MeetupViewPage,
    MeetupEditComponent]
})
export class MeetupViewPageModule {}
