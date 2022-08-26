import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  dataArray:any
  constructor(private _AngularFirestore:AngularFirestore,private router:Router) { }
  ngOnInit(): void {
    this._AngularFirestore.collection<any>('products').snapshotChanges().subscribe((data)=>{
      this.dataArray=data.map(element=>{
         return{ 
           id:element.payload.doc.id ,
           title:element.payload.doc.data()["title"],
           description:element.payload.doc.data()['description'],
           img:element.payload.doc.data()['img'],
           uid:element.payload.doc.data()['uid'],
           // ...element.payload.doc.data()
          // title:element.payload.doc.data()as['title'],
        }
        })
     })
  }
  detail(id:any){
    this.router.navigate(['/product/'+id])

  }
}
