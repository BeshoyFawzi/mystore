import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Prodface } from '../../../app/interface/prodface'
@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.scss']
})
export class MyproductsComponent implements OnInit, AfterViewInit, OnDestroy {
  data: any;
  Uid: any;
  addmassge: string = "";
  // dataArray:Prodface[]=[];
  dataArray: any;
  dataup = {
    id: '',
    title: '',
    description: '',
    img: '',
    uid: '',
  }
    ider:any;
  getProducts!: Subscription;
  userid!: Subscription;
  task!: AngularFireUploadTask;
  ref!: AngularFireStorageReference;
  percentage: any;
  imgadd: any;
  @ViewChild('prodcard') inputTformmaster!: ElementRef
  constructor(private _AngularFirestore: AngularFirestore, private _AuthService: AuthService,
    private _AngularFireStorage: AngularFireStorage) {
    this.userid=this._AuthService.user.subscribe(user => {
      this.Uid = user?.uid;

    })
  }

  ngOnInit(): void {
    this.getProducts = this._AngularFirestore.collection<any>('products').snapshotChanges().subscribe((data) => {
      this.dataArray = data.map(element => {
        return {
          id: element.payload.doc.id,
          title: element.payload.doc.data()["title"],
          description: element.payload.doc.data()['description'],
          img: element.payload.doc.data()['img'],
          uid: element.payload.doc.data()['uid'],
          // ...element.payload.doc.data()
          // title:element.payload.doc.data()as['title'],
        }
      })

    })
  }
  ngOnDestroy() {
    this.getProducts.unsubscribe()
    this.userid.unsubscribe()
  }
  ngAfterViewInit() {
    this.inputTformmaster.nativeElement.style.color= "red";
    if(this.Uid!==this.dataArray.uid){
      this.inputTformmaster.nativeElement.style.disable="none";
    }
    // alert("xxx")
     console.log(this.dataArray.uid)
  }
  uploadImg2(event: any){
    const idp = Math.random().toString(36).substring(2);
    this.ref= this._AngularFireStorage.ref(idp)
    this.task= this.ref.put(event.target.files[0])
    this.task.then((data) => {
      data.ref.getDownloadURL().then(url => {
       this.imgadd=url
        console.log(this.imgadd)
      })
     
    })
 
    
  }
  addpro(prod: any) {
    this.data = prod.value;
    console.log(this.imgadd)
    console.log(this.data);
    this._AngularFirestore.collection("products").add({
      title: this.data.title,
      description: this.data.description,
      img:this.imgadd,
      uid: this.Uid
    }).then(() => {
      this.addmassge = "added"
      window.location.reload()
    })
  }
  delete(id: any) {
    this._AngularFirestore.collection("products").doc(id).delete()
  }
  update(id: any) {
    this._AngularFirestore.collection<any>("products").ref.doc(id).get().then((data) => {
      this.dataup.id = id
      this.dataup.description = data.data()["description"]
      this.dataup.title = data.data()["title"]
    })
  }
  UpdateInf() {
    this._AngularFirestore.collection("products").doc(this.dataup.id).update({
      title: this.dataup.title,
      description: this.dataup.description,
    }).then(() => {
      window.location.reload()
    }).catch(() => {
      console.log("error")
    })

  }
  getIdPic(id: any) {
    localStorage.setItem("userDocId", id)
  }
  uploadImg(event: any, id: any) {
    console.log(id)
    const idp = Math.random().toString(36).substring(2);
    this.ref = this._AngularFireStorage.ref(idp)
    this.task = this.ref.put(event.target.files[0])
    this.percentage = this.task.percentageChanges()
    this.task.then((data) => {
      data.ref.getDownloadURL().then(url => {
        this._AngularFirestore.collection("products").doc(localStorage.getItem('userDocId') || '{}').update({
          img: url
        }).then(() => {
          window.location.reload()
        })
      })
     
    })
    
  }
}
