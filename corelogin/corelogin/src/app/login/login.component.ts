import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../shared/login.model';
import { ServiceService } from '../shared/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login = <Login>{};
  private _returnUrl: string;

  constructor(private service: ServiceService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  Log():void{
    this.service.LoginUser(this.login).subscribe((result) => {
      localStorage.setItem("token", result.token);
      localStorage.setItem("email", result.email);
      console.log(result)
      //this._router.navigate([this._returnUrl]);
      this._router.navigate(['/home']);
   
   });
  
 }

}
