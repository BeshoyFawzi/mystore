import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit ,OnDestroy{
Uid: any;
dataprofile={
    userName:'',
    description:'',
    img:'',
    uid:'',
    email:'',
    cover:'',
};
userSubscrip!:Subscription;
infoDone:any;
task!:AngularFireUploadTask;
ref!:AngularFireStorageReference;
percentage:any;
  constructor(private _AuthService:AuthService,private _AngularFirestore:AngularFirestore,
    private _AngularFireStorage:AngularFireStorage) { 
   this.userSubscrip=this._AuthService.user.subscribe(user=>{
    this.Uid = user?.uid;
    })
  }

  ngOnInit(): void {
// this._AngularFirestore.collection<any>("users").snapshotChanges().subscribe((data)=>{
// this.dataprofile=data.map(element=>{
//   element
//   if(element.payload.doc.id===this.uid)
//   return {
//     id:element.payload.doc.id,
//     userName:element.payload.doc.data()["userName"],
//     description:element.payload.doc.data()["description"],
//     email:element.payload.doc.data()["email"],
//     img:element.payload.doc.data()["img"],


//   }
  

// })
// })

this._AngularFirestore.collection<any>("users").ref.doc(localStorage.getItem("userConnect")|| '{}').get().then((data)=>{
  this.dataprofile.userName=data.data()["userName"]
  this.dataprofile.description=data.data()["description"]
  this.dataprofile.img=data.data()["img"]
  this.dataprofile.email=data.data()["email"]
  this.dataprofile.cover=data.data()["cover"]
  this.dataprofile.uid=(localStorage.getItem('userConnect')|| '{}')
})}
UpdateInf(){
  this._AngularFirestore.collection("users").doc(this.dataprofile.uid).update({
    userName:this.dataprofile.userName,
    description:this.dataprofile.description,
    img:this.dataprofile.img,
  }).then(() => {
    this.infoDone="done"
    window.location.reload()
  }).catch(() => {
    console.log("error")
  })
}
uploadImg(event:any){
 const id=Math.random().toString(36).substring(2);
  this.ref=this._AngularFireStorage.ref(id)
   this.task=this.ref.put(event.target.files[0])
   this.percentage=this.task.percentageChanges()
   console.log( this.percentage)
   this.task.then((data) =>{
    data.ref.getDownloadURL().then(url=>{
      this._AngularFirestore.collection("users").doc(this.dataprofile.uid).update({
        img:url
        
      })

    })
   })
}
uploadcover(event:any){
  const id=Math.random().toString(36).substring(2);
  this.ref=this._AngularFireStorage.ref(id)
   this.task=this.ref.put(event.target.files[0])
   this.percentage=this.task.percentageChanges()
   this.task.then((data) =>{
    data.ref.getDownloadURL().then(url=>{
      this._AngularFirestore.collection("users").doc(this.dataprofile.uid).update({
        cover:url
      })
    })
    // window.location.reload()
   })

}
ngOnDestroy(){
  this.userSubscrip.unsubscribe()
}
}
