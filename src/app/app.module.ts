import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherViewComponent } from './Components/weather-view/weather-view.component';
import { UserComponent } from './Components/user/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembersComponent } from './Components/members/members.component';

@NgModule({
  declarations: [AppComponent, WeatherViewComponent, UserComponent, MembersComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
