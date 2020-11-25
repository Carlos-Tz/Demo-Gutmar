import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() public submitSurveyData: any;
  @Input() public myForm: FormGroup;
  // @Input() public myForm2: FormGroup;
  @Input() public save: number;
  @Input() public user_u: boolean;
  @Input() public goBack: any;
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
