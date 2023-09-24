import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-anasayfa',
  templateUrl: './anasayfa.component.html',
  styleUrls: ['./anasayfa.component.css']
})
export class AnasayfaComponent implements OnInit {
  videoUrl: SafeResourceUrl = ''; // Burada videoUrl özelliğini başlatıyoruz

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // Örnek bir YouTube videosu linki. İstediğiniz başka bir linkle değiştirebilirsiniz.
    const url = 'https://www.youtube.com/embed/DpWo8Tl3pDE';
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
