import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  showError: boolean = false;
  errorMessage: string = '';
  showSuccess: boolean = false;
  successMessage: string = '';
  showFacePopup: boolean = false;

  webcamWidth = 300;
  webcamHeight = 300;
  webcamImageType = 'image/jpeg';
  webcamImage: WebcamImage | null = null;
  capturedImage: string | null = null; // Çekilen fotoğrafın önizlemesi için değişken
  webcamTrigger: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient, private router: Router) { }

  onLogin() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post('https://backend.yedekle.net/api/users/login', loginData).subscribe(
      (response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          console.log("Giriş başarılı!");
          this.openFacePopup();
        } else {
          this.showError = true;
          this.errorMessage = "Kullanıcı Adınız veya Şifreniz hatalı!";
          console.error("Giriş başarısız.");
        }
      },
      error => {
        this.showError = true;
        this.errorMessage = "Bir hata oluştu!";
        console.error("Bir hata oluştu:", error.message);
      }
    );
  }

  openFacePopup(): void {
    this.showFacePopup = true;
    this.webcamTrigger.next();
  }

  get webcamTriggerObservable(): Observable<void> {
    return this.webcamTrigger.asObservable();
  }

  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.capturedImage = webcamImage.imageAsDataUrl; // Çekilen fotoğrafı sakla
  }

  triggerSnapshot(): void {
    this.webcamTrigger.next();
  }

  confirmFace(): void {
    if (!this.webcamImage) {
      console.error("Fotoğraf çekilmedi!");
      return;
    }

    // Fotoğrafı binary formatına dönüştürmek için Blob'a çevir
    fetch(this.webcamImage.imageAsDataUrl)
      .then(res => res.blob())
      .then(blob => {
        const formData = new FormData();
        formData.append('image', blob, 'face.jpg');

        // Backend'e POST isteği gönder
        this.http.post('https://backend.yedekle.net/api/face-verification', formData).subscribe(
          response => {
            console.log("Yüz doğrulama başarılı", response);
            this.showSuccess = true;
            this.successMessage = "Başarılı bir şekilde giriş yaptınız! Yönlendiriliyorsunuz...";
            setTimeout(() => {
              this.router.navigate(['/hakkimizda']);
            }, 2000);
          },
          error => {
            console.error("Yüz doğrulama başarısız", error);
            // Hata durumunda yapılacak işlemleri buraya ekleyebilirsiniz
          }
        );
      });

    this.showFacePopup = false;
  }
}

