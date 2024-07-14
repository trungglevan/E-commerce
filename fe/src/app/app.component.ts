import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  auth: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit() {
    this.loadPage()

  }

  loadPage() {
    const userInfo = localStorage.getItem('data');
    console.log(userInfo);
    if (userInfo) {
      this.auth = true;
    } else {
      this.auth = false;
    }
  }

  logOut() {
    this.authService.logout();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }

}
