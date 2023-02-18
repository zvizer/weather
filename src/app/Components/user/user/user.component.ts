import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IUser } from 'src/app/Models/user';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public userForm: FormGroup = new FormGroup({
    name: new FormControl(),
    city: new FormControl(),
  });
  @Output() user: EventEmitter<IUser> = new EventEmitter<IUser>();

  public name: string;
  public city: string;

  private readonly currentUserKey = 'currentUser';

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  public create() {
    if (this.name && this.city) {
      this.localStorageService.saveData(this.currentUserKey, this.name);
      this.localStorageService.saveData(this.name, this.city);
      this.user.emit({ name: this.name, city: this.city } as IUser);
    }
  }

  public getCurrentUser() {
    const currentName = this.localStorageService.getData(this.currentUserKey);

    if (currentName) {
      this.name = currentName;
      this.city = this.localStorageService.getData(this.name);
      this.user.emit({ name: this.name, city: this.city } as IUser);
    }
  }
}
