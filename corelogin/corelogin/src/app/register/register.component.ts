import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Registration } from '../shared/registration.model';
import { ServiceService } from '../shared/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newregister: Registration = <Registration>{};
  x:string;
  public errorMessage: string = '';
  public showError: boolean;
  constructor(private service:ServiceService,private snack: MatSnackBar) { }

  ngOnInit(): void {
  }
  register():void{
     this.service.postRegister(this.newregister).subscribe((result) => {
      console.log(JSON.stringify(result));
      console.log((result));
    }, (error: HttpErrorResponse) => {
      if (error.status === 403) {
        this.snack.open('This email is taken', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 16000
        });
      }
      else if(error.error == "aa"){
       console.log(error.error),
        this.snack.open('This username is taken.', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 19000
         
         
          
        });
      }
      else{
      this.snack.open('An error occurred on our servers, try again', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 9000
      })}
     console.log(error.status)
    })
   
  }
  
}
