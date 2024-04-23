import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignupComponent implements OnInit {

  signupUsers: any[] = [];
  signupObj: any = {
    Email: '',
    Password: '',
    ConfirmPassword: '',
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    const localData = localStorage.getItem('signupUsers');
    if (localData) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  onSignup() {
    if (this.signupObj.Password === '' || this.signupObj.Email === '') {
      alert('Input is empty. Please fill all fields');
    } else if (this.signupUsers.find(user => user.Email === this.signupObj.Email)) {
      alert('Email already exists');
    } else if (this.signupObj.Password === this.signupObj.ConfirmPassword) {
      this.signupUsers.push(this.signupObj);
      localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
      this.signupObj = {
        Email: '',
        Password: '',
        ConfirmPassword: '',
        Username: ''
      };
      alert('Signup successful');
      this.router.navigate(['/login']);
    } else {
      alert('Passwords do not match');
    }
  }

}