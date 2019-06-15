import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MeetupModel } from 'src/services/model/MeetupModel';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MeetupService } from 'src/services/MeetupService';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-meetup-view',
  templateUrl: './meetup-view.page.html',
  styleUrls: ['./meetup-view.page.scss'],
})
export class MeetupViewPage implements OnInit {

  meetup$: Observable<MeetupModel>;
  meetupId: string;

  constructor(private route: ActivatedRoute,
              private meetupService: MeetupService) { }

  ngOnInit() {

    this.meetup$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.meetupId = params.get('meetupId');
        console.log('MeeupId:', this.meetupId);

        return this.meetupService.get(this.meetupId);
      })
    );
  }

}
