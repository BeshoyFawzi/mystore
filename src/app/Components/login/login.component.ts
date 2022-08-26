import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
data: any;
messageError!: string;
  constructor(private _AuthService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  login(logform:any){
this.data=logform.value;
this._AuthService.signIn(this.data.email,this.data.password).then((user) => {
  this.router.navigate(['/home'])
  localStorage.setItem("userConnect",user.user!.uid)
  console.log(user.user!.uid)
  
}).catch(() => {
  this.messageError="incorrect email and password"
})

  }
}
