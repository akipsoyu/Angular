import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  showError: boolean = false; // Hata mesajını göstermek için bir değişken
  errorMessage: string = '';  // Hata mesajının içeriği için bir değişken

  showSuccess: boolean = false;
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  onLogin() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://158.178.204.211:8080/api/users/login', loginData).subscribe(
      (response: any) => {
        if (response.token) { // Eğer token yanıtta dönerse
          localStorage.setItem('token', response.token); // Token'ı yerel depolamada sakla
          console.log("Giriş başarılı!");
          this.showSuccess = true;
          this.successMessage = "Basarili bir sekilde giris yaptınız! Yönlendiriliyorsunuz..."
          setTimeout(() => {
            this.router.navigate(['/hakkimizda']); // "hakkimizda" yoluna yönlendirir
          }, 2000);
        } else {
          this.showError = true; // Hata olduğunda hata mesajını göster
          this.errorMessage = "Kullanıcı Adınız veya Şifreniz hatalı!";
          console.error("Giriş başarısız.");
        }
      },
      error => {
        this.showError = true; // HTTP hatası olduğunda hata mesajını göster
        this.errorMessage = "Bir hata oluştu!";
        console.error("Bir hata oluştu:", error.message);
      }
    );
  }
}
