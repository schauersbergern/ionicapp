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

  meetup$: Observable<MeetupModel>;
  meetupId: string;

  constructor(private route: ActivatedRoute,
              private meetupService: MeetupService) { }

  ngOnInit() {

    this.meetup$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.meetupId = params.get('meetupId');
        return this.meetupService.get(this.meetupId);
      }));
  }

}
