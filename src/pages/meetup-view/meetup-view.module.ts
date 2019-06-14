import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { MeetupViewPage } from './meetup-view';

@NgModule({
  declarations: [
    MeetupViewPage,
  ],
  imports: [
    IonicPageModule.forChild(MeetupViewPage),
  ],
})
export class MeetupViewPageModule {}
