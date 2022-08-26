import { Component, OnInit,OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit ,OnDestroy {
prodId:any
prodDet={
  title:'',
  description:'',
  img:'',
  uid:'',
};
getprodId!:Subscription;
  constructor(private _ActivatedRoute: ActivatedRoute,private _AngularFirestore:AngularFirestore,private router: Router) { 
  this.getprodId=this._ActivatedRoute.params.subscribe(params => {
     return this.prodId=params.key
    })
  }

ngOnInit(): void {
this._AngularFirestore.collection<any>("products").ref.doc(this.prodId).get().then(data => {
this.prodDet.title=data.data()["title"]
this.prodDet.description=data.data()["description"]
this.prodDet.img=data.data()["img"]
})
  }
  ngOnDestroy(){
    this.getprodId.unsubscribe()
  }
  idpro(){
    localStorage.setItem("idprod",this.prodId)
    this.router.navigate(['/CardComponent/'+this.prodId])

  }
}
