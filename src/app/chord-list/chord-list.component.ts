import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Chord } from '../shared/chord'; 
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-chord-list',
  templateUrl: './chord-list.component.html',
  styleUrls: ['./chord-list.component.scss']
})

export class ChordListComponent implements OnInit {
  p: number = 1;
  Chord: Chord[];
  hideWhenNoChord: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  

  constructor(
    public crudApi: CrudService,
    public toastr: ToastrService
    ){ }


  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetChordsList(); 
    s.snapshotChanges().subscribe(data => {
      this.Chord = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Chord.push(a as Chord);
      })
    })
  }

  dataState() {     
    this.crudApi.GetChordsList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoChord = false;
        this.noData = true;
      } else {
        this.hideWhenNoChord = true;
        this.noData = false;
      }
    })
  }

  deleteChord(chord : Chord) {
    if (window.confirm('Czy na pewno usunąć ten akord')) { 
      this.crudApi.DeleteChord(chord.$key)
      this.toastr.success(chord.symbol + ' został usunięty!');
    }
  }

}