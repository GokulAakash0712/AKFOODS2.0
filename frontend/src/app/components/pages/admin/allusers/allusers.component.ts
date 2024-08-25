import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../shared/models/User';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrl: './allusers.component.scss',
})
export class AllusersComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.allusers().subscribe((data) => {
      this.users = data;
    });
  }
}
