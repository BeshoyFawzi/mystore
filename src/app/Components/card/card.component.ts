import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit ,OnDestroy {
  getprodId!:Subscription;
  prodId:any;
  prodDet={
    title:'',
    description:'',
    img:'',
    uid:'',
  };
  addmassge:string=""
  deletemassge:string=""
  constructor(private _ActivatedRoute: ActivatedRoute,private _AngularFirestore:AngularFirestore,
    private router: Router) { 
    this.getprodId=this._ActivatedRoute.params.subscribe(params => {
      return this.prodId=params.key
     })
  }

  ngOnInit(): void {
    this._AngularFirestore.collection<any>("products").ref.doc(this.prodId).get().then(data => {
    this.prodDet.title=data.data()["title"]
    this.prodDet.description=data.data()["description"]
    this.prodDet.img=data.data()["img"]
    this.prodDet.uid=data.data()["uid"]
    })
      }
      ngOnDestroy(){
        this.getprodId.unsubscribe()
      }
      Delete(){
    localStorage.removeItem("idprod")
    this.deletemassge="Delete"
    setTimeout(()=>{
      this.router.navigate(['/products'])
     }, 1000);
      }
      Submit(){
    localStorage.removeItem("idprod")
       this.addmassge="Done";
       setTimeout(()=>{
        this.router.navigate(['/products'])
       }, 1000);
      }
}
