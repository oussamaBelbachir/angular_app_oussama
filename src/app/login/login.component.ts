import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public productForm!: FormGroup;
  public errorMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private as: AuthService
  ) {}
  ngOnInit(): void {
    this.productForm = this.fb.group({
      username: this.fb.control('user1'),
      password: this.fb.control('1234'),
    });
  }

  async handleSubmit() {
    const { username, password } = this.productForm.value;
    console.log(username, password);
    // if(username === "admin" && password === "1234"){
    //   this.route.navigateByUrl("/admin")
    // }

    await this.as
      .login(username, password)
      .then((resp) => {
        console.log('✅ ✅ ✅ ');
        this.route.navigateByUrl('/admin/products');
      })
      .catch((err) => {
        console.error(err);
        this.errorMessage = err;
      });
    console.log('=========================');

    // this.as.login(username, password).subscribe({
    //   next : (user:any) => {
    //     console.log("👉 👉 👉 ",user)
    //     if(btoa(password) !== user.password){
    //       console.log("💥 💥 💥 💥 💥 💥 💥 💥 ");
    //     }else{
    //
    //     }
    //
    //
    //   },
    //   error: (err) => {
    //     console.log('**************');
    //     console.error("Msg ",err.message);
    //     console.error(err);
    //   },
    // })
  }
}
