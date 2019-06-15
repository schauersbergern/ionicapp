import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MeetupModel } from 'src/services/model/MeetupModel';
import { MeetupService } from 'src/services/MeetupService';

@Component({
  selector: 'app-meetup-edit',
  templateUrl: './meetup-edit.component.html',
  styleUrls: ['./meetup-edit.component.scss'],
})
export class MeetupEditComponent implements OnInit {

  meetup: MeetupModel;

  constructor() { }

  ngOnInit() {
  }

  edit(form) {
    console.log('Formdata: ', form);
  }
}
