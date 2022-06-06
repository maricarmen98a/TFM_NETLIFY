import { Component } from '@angular/core';
import { SharedService } from './shared/Services/shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Aer Iolar';
  loading: boolean;
  
  constructor(private sharedService: SharedService){
    this.loading = true;
  }
  ngOnInit(): void {
    if(this.loading == true) {
      document.body.style.overflow = 'hidden';
    } 
    setTimeout(()=>{
      this.loading = false;
      document.body.style.overflow = 'auto'
    }, 2000);
    this.sharedService.getLoading().subscribe(loading => this.loading = loading);
  }
  disableScroll() {
    document.body.classList.add("stop-scrolling");
  }
  enableScroll() {
    document.body.classList.remove("stop-scrolling");
  }
}