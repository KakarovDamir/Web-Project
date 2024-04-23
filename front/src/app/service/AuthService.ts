import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    { id: 1, email: 'test1@example.com', password: 'password1', token: 'token1' },
    { id: 2, email: 'test2@example.com', password: 'password2', token: 'token2' },
    // Add more mock users as needed
  ];

  constructor() { }

  login(email: string, password: string): any {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      return { result: true, data: { token: user.token } };
    } else {
      return { result: false, message: 'Invalid credentials' };
    }
  }

  signup(email: string, password: string): boolean {
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      return false;
    } else {
      const newUser = { id: this.users.length + 1, email, password, token: `token${this.users.length + 1}` };
      this.users.push(newUser);
      return true;
    }
  }
}