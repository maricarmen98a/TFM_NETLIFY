import { Component, OnInit } from '@angular/core';
import { faEllipsisH, faHome, faPlane, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthStateService } from '../../shared/Services/auth-state.service';

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
  isSignedIn!: boolean;
  
  constructor( private auth: AuthStateService) { }
  ngOnInit(): void {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
  }
}
