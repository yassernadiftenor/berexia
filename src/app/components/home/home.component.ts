import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  array:any;
  images:any;
  ngOnInit() {
    this.images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);
    this.array = ["https://ak2.picdn.net/shutterstock/videos/13000862/thumb/3.jpg", "https://i.pinimg.com/originals/6a/1d/3a/6a1d3a143b69d9812dd17aa57eb615fb.jpg", "https://image.shutterstock.com/image-photo/desktop-source-code-technology-background-260nw-1171962814.jpg"];
  }

}
