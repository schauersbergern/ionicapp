import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MeetupViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'meetup/:meetupId'
})
@Component({
  selector: 'page-meetup-view',
  templateUrl: 'meetup-view.html',
})
export class MeetupViewPage implements OnInit {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeetupViewPage');
  }


  ngOnInit() {
    let meetupId = this.navParams.get('meetupId');
    console.log("MeetupId: ", meetupId);
  }
}
