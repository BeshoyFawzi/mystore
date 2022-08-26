import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isUser:any;
  idprod:any;
  constructor(private _AngularFireAuth:AngularFireAuth,private router:Router,private _AuthService:AuthService) {
    this._AuthService.user.subscribe(user => {
  if(user){
    this.isUser = true
  }else{
    this.isUser = false
  }
})
   }
  
  ngOnInit(): void {
    setInterval(()=>{
      this.idprod=(localStorage.getItem('idprod'))
      if(this.idprod){
        this.idprod = this.idprod
      }else{
        this.idprod! = this.idprod
      }
    },500)
  
  }
  logout(){
this._AngularFireAuth.signOut().then(() => {
  localStorage.removeItem("userConnect")
  localStorage.removeItem("userDocId")
  localStorage.removeItem("idprod")
  this.router.navigate(['/login'])
}).catch(()=>{
  console.log("error")
})
  }
  prodShop(){
    this.router.navigate(['/CardComponent/'+this.idprod])
  }
}
