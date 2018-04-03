import { Component, OnInit } from '@angular/core';
import { SetService } from './set.service';

@Component({
  selector: 'app-root',
  providers: [ SetService ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {
  
  title = 'The Set Component';

}
