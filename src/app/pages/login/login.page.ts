import { Component, OnInit, ViewChild } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  public wavesPosition: number = 0;
  public wavesDifference: number = 80;

  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;

  constructor(
    public keyboard: Keyboard,
    private loadingControll: LoadingController,
    private toastControll: ToastController,
    private authServices: AuthService

  ) { }

  ngOnInit() { }

  // Moving the background according to the "login" and "register" button
  segmentChanged(event: any) {
    if (event.detail.value === "login") {
      this.slides.slidePrev();
      this.wavesPosition += this.wavesDifference;
    } else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDifference;
    }
  }

  // Logging in user
  async signIn() {
    await this.presentLoading();

    try {
      this.authServices.currentUser = null;
      await this.authServices.signIn(this.userLogin);
    } catch (error) {
      // Catching errors
      let message: string;
      switch (error.code) {
        case 'auth/invalid-email':
          message = 'E-mail ou Senha incorreto!'
          break;

        case 'auth/wrong-password':
          message = 'E-mail ou Senha incorreta!'
          break;

        case 'auth/user-not-found':
          message = 'Usuario não encontrado!'
          break;

        default:
          break;
      }
      this.presentToast(message);
    } finally {
      // Hiding the loading
      this.loading.dismiss();
    }
  }

  // Registering a user
  async signUp() {
    await this.presentLoading();

    try {
      // It returns the authenticated user
      await this.authServices.signUp(this.userRegister);
    } catch (error) {
      // Catching errors
      let message: string;
      switch (error.code) {
        case 'auth/invalid-email':
          message = 'Esse e-mail é inválido! '
          break;

        case 'auth/email-already-in-use':
          message = 'Esse e-mail ja foi utilizado!'
          break;

        case 'auth/weak-password':
          message = 'Sua senha deve ter no minimo 6 caracteres!'
          break;

        case 'auth/argument-error':
          message = 'Preencha os campos acima!'
          break;

        default:
          break;
      }
      this.presentToast(message);
    } finally {
      // Hiding the loading
      this.loading.dismiss();
    }
  }

  // Loading popup
  async presentLoading() {
    this.loading = await this.loadingControll.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

  // Toast message
  async presentToast(message: string) {
    const toast = await this.toastControll.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
