import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '../shared/models/User';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import {
  ALL_USERS_URL,
  USER_LOGIN_URL,
  USER_REGISTER_URL,
} from '../shared/constants/urls';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { Router } from '@angular/router';

const USER_KEY = 'AKFOOD_Users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable!: Observable<User>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome To AKFOODS ${user.name}`);
        },
        error: (errorResponse) => {
          this.toastrService.error('Email or Password Invalid');
        },
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome To AKFOODS ${user.name}`);
        },
        error: (errorResponse) => {
          this.toastrService.error('Enter Valid Inputs');
        },
      })
    );
  }

  allusers(): Observable<any> {
    return this.http.get(ALL_USERS_URL);
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    this.router.navigateByUrl('/');
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    if (isPlatformBrowser(this.platformId)) {
      const userJson = localStorage.getItem(USER_KEY);
      return userJson ? JSON.parse(userJson) : new User();
    }
    return new User();
  }
}
