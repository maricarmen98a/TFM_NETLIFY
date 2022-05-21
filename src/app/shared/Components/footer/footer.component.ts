import { Component, OnInit } from '@angular/core';
import { faEllipsisH, faHome, faPlane, faTicketAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faPlane = faPlane;
  faHouse = faHome;
  faBoarding = faTicketAlt;
  faMenu = faEllipsisH;

  constructor() { }

  ngOnInit(): void {
  }
}
