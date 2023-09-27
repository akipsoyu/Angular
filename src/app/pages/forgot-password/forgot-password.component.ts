import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  // Bu özelliği ekleyin
  email: string = '';

  showMessage: boolean = false;
  infoMessage: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onForgotPassword() {
    // ... şifre sıfırlama işlemleri

    // Örnek: Eğer işlem başarılıysa, bilgilendirme mesajını göster
    this.showMessage = true;
    this.infoMessage = 'Sıfırlama bağlantısı e-posta adresinize gönderildi.';
  }

}
