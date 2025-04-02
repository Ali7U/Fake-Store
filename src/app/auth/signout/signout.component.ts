import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  standalone: true,
  imports: [],
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.scss'
})
export class SignoutComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    setTimeout(() => {
          this.authService.signout()
    this.router.navigateByUrl('/signin')
    }, 1000);

  }
}
