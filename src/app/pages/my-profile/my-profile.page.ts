import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  user: User = null;
  
  constructor(
    private authServices: AuthService, 
    private navgation: NavController,
  ) {
    this.user = this.authServices.currentUser;
  }

  ngOnInit() {}

  async singOut() {
    try {
      await this.authServices.singOut();
      this.navgation.navigateForward("/login")
    } catch (err) {
      console.log(err)
    }
  }
}
