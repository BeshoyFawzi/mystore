import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  data: any;
  constructor(private _AuthService: AuthService, private _AngularFirestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }
  register(regForm: any) {
    console.log(regForm.value);
    this.data = regForm.value;
    this._AuthService.signUp(this.data.email, this.data.password).then((user) => {
      localStorage.setItem("userConnect", user.user!.uid)
      this._AngularFirestore.collection("users").doc(user.user?.uid).set({
        userName: this.data.userName,
        email: this.data.email,
        description: this.data.description,
        uid: user.user?.uid,
        img: "https://firebasestorage.googleapis.com/v0/b/mystore-be2a6.appspot.com/o/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg?alt=media&token=5a85a08f-a819-4ebb-8a38-5ad075597c54",
        cover:"https://firebasestorage.googleapis.com/v0/b/mystore-be2a6.appspot.com/o/3e9f63e1223851a6fda98f4ffb5f5b1a.jpg?alt=media&token=e2d29429-b79a-4f6b-a449-d40d93f4dad4",
      }).then(() => {
        this.router.navigate(['/home'])
      })
    }).catch(() => {
      console.log("errror")
    })

  }

}
