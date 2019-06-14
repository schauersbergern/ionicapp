import { Component, Input } from '@angular/core';
import { MeetupModel } from '../../services/model/MeetupModel';
import { MeetupService } from '../../services/MeetupService';

/**
 * Generated class for the MeetupEditComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'meetup-edit',
  templateUrl: 'meetup-edit.html'
})
export class MeetupEditComponent {

  @Input()
  meetup : MeetupModel;
  

  constructor(private meetupService : MeetupService) {
  }

  
}
