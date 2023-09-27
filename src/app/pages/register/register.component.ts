import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  showError: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient) { } // HttpClient'ı enjekte edin

  ngOnInit(): void {
  }

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.showError = true;
      this.errorMessage = 'Şifreler eşleşmiyor!';
      return;
    }

    const userData = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('http://localhost:8080/api/users', userData).subscribe(response => {
      if (response.status === 'Basarili') {
        this.successMessage = 'Başarılı ile kayıt oldunuz!';
        this.showError = false;
      }
        // Bu kısmı kaldırabilirsiniz, çünkü 400 Bad Request durumunda buraya girmeyecek.
        // else if (response.status === 'Hata' && response.message === 'Bu kullanıcı adı zaten kullanılıyor.') {
        //   this.showError = true;
        //   this.errorMessage = 'Bu kullanıcı ismi zaten kullanılıyor.';
      // }
      else {
        this.showError = true;
        this.errorMessage = 'Kayıt işlemi sırasında bir hata oluştu.';
      }
    }, error => {
      this.showError = true;
      if (error.error && error.error.message) {
        this.errorMessage = error.error.message; // Sunucudan gelen özel hata mesajını kullan
      } else {
        this.errorMessage = 'Bir hata oluştu: ' + error.message;
      }
    });
  }
}
