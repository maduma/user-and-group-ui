import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { SeteditComponent } from './setedit/setedit.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule }    from '@angular/common/http';
import { InMemoryDataService }  from './in-memory-data.service';


@NgModule({
  declarations: [
    AppComponent,
    SeteditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
