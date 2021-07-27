import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: User = null;
  
  constructor(private authServices: AuthService) {
    this.user = this.authServices.currentUser;
  }

  ngOnInit() {
    console.log(this.user)
  }  
}
