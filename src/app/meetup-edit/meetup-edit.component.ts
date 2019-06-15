import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Input()
  meetup: MeetupModel;

  @Output() saved = new EventEmitter<MeetupModel>();
  
  constructor() { }

  ngOnInit() {
  }

  edit(form) {
    console.log('Formdata: ', form, 'Meketupdata:', this.meetup);

    this.saved.emit(this.meetup);
  }
}
