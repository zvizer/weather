import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { IUser } from 'src/app/Models/user';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { WeatherService } from 'src/app/Services/weather.service';

@Component({
  selector: 'members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  public userTemp = [];
  constructor(
    private localStorageService: LocalStorageService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.getAllMembers().forEach((member) => {
      this.weatherService
        .getWeather(member.city)
        .pipe(take(1))
        .subscribe((data) => {
          this.userTemp.push({
            name: member.name,
            temp: Math.round((data['main']['temp'] - 273.15) * 1.8),
            icon:
              'http://openweathermap.org/img/w/' +
              data['weather'][0]['icon'] +
              '.png',
          });
        });
    });
  }

  private readonly currentUserKey = 'currentUser';

  public getAllMembers() {
    const members: IUser[] = [];
    const storage: Storage = this.localStorageService.getAllData();

    Object.keys(storage).forEach((key) => {
      if (key && key != this.currentUserKey)
        members.push({ name: key, city: storage[key] });
    });
    return members;
  }
}
