import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { NgForm } from '@angular/forms';
import { LoginDto } from '../../DTO/users/loginDto';
import { LoginResponse } from '../../responses/user/loginResponse';
import { TokenService } from 'src/app/service/token.service';
import { UserResponse } from 'src/app/responses/user/userResponse';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm
  // Admin account
  phoneNumber: string = '42345678';
  password: string = '123123';

  // User account
  // phoneNumber: string = '12345678';
  // password: string = '123123';

  userResponse?: UserResponse

  constructor(private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private cartService: CartService) { }

  onPhoneNumberChange() {
    console.log(this.phoneNumber);
  }

  loginClick() {
    const loginData: LoginDto = {
      phone_number: this.phoneNumber,
      password: this.password
    }
    this.userService.login(loginData).subscribe({
      next: (response: LoginResponse) => {
        debugger
        const { token } = response
        this.tokenService.setToken(token)
        this.userService.getUserDetails(token).subscribe({
          next: (response: UserResponse) => {
            debugger
            this.userResponse = {
              ...response,
              date_of_birth: new Date(response.date_of_birth)
            }
            this.userService.saveUserToLocalStorage(this.userResponse)
            if (this.userResponse.role.id === 1 || this.userResponse.role.name === "Admin") {
              this.router.navigate(['/admin/orders'])
            } else {
              this.router.navigate(['/'])
            }
          }, complete: () => {
            this.cartService.refreshCart()

          },
          error: (error: any) => {
            alert(`Cannot login, error: ${error}`)
          }
        })
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        alert(`Cannot login, error: ${error}`)
      }
    })
  }
}
