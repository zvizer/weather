import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

let url: String = 'https://api.openweathermap.org/data/2.5/weather';
let apiKey: String = 'a6552d8e4f53051ea40c369d4704bb06';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  private readonly string = '';
  getWeather(city: String) {
    return this.http.get(url + '?q=' + city + '&appid=' + apiKey);
  }
}
