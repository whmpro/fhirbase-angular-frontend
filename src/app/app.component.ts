import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fhircrud';
  minHeightN = window.innerHeight;
  ngOnInit(){
    console.log(window.innerHeight);
  }
}
