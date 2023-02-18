import { Component, OnInit } from '@angular/core';
import { timeInterval } from 'rxjs';
import { IUser } from 'src/app/Models/user';
import { IWeatherData } from 'src/app/Models/weather';
import { WeatherService } from 'src/app/Services/weather.service';

@Component({
  selector: 'weather-view',
  templateUrl: './weather-view.component.html',
  styleUrls: ['./weather-view.component.scss'],
})
export class WeatherViewComponent implements OnInit {
  public weather: IWeatherData = {
    description: '',
    currentTemperature: 0,
    icon: '',
    minTemperature: 0,
    maxTemperature: 0,
  };
  public user: IUser;
  public isMembersPage = false;
  public interval;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  public onUserChange(event: IUser) {
    this.getWeatherByUser(event);
    clearInterval(this.interval);
    this.interval = setInterval(() => this.getWeatherByUser(event), 15000);
  }

  private getWeatherByUser(user: IUser) {
    this.weatherService.getWeather(user.city).subscribe((data) => {
      this.weather.description = data['weather'][0]['main'];
      this.weather.currentTemperature = Math.round(
        (data['main']['temp'] - 273.15) * 1.8
      );
      this.weather.icon =
        'http://openweathermap.org/img/w/' +
        data['weather'][0]['icon'] +
        '.png';
    });
  }

  public togglePages() {
    this.isMembersPage = !this.isMembersPage;
  }
}
