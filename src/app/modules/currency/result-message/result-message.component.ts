import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-result-message',
  templateUrl: './result-message.component.html',
  styleUrls: ['./result-message.component.scss']
})
export class ResultMessageComponent implements OnInit {

  @Input() title;
  @Input() message;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
