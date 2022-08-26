import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable} from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 user:Observable<firebase.User|null>;
  constructor(private _AngularFireAuth:AngularFireAuth) { 
    this.user=this._AngularFireAuth.user
  } 
  signUp(email:any,password:any){
    return this._AngularFireAuth.createUserWithEmailAndPassword(email,password)
     }
     signIn(email:any,password:any){
       return this._AngularFireAuth.signInWithEmailAndPassword(email,password)
     }
}
