import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  save = 1;
  constructor(
    public authService: AuthService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  goBack = () => {
    this.location.back();
  }

}
