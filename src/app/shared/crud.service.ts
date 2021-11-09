import { Injectable } from '@angular/core';
import { Chord } from './chord';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  chordsRef: AngularFireList<any>;
  chordRef: AngularFireObject<any>;
  
  constructor(private db: AngularFireDatabase) { }

  AddChord(chord: Chord) {
    this.chordsRef.push({
        symbol: chord.symbol,
        name: chord.name,
        description: chord.description,
        learned: chord.learned,
    })
  }

  GetChord(id: string) {
    this.chordRef = this.db.object('chords-list/' + id);
    return this.chordRef;
  }

  GetChordsList() {
    this.chordsRef = this.db.list('chords-list');
    return this.chordsRef;
  }  

  UpdateChord(chord: Chord) {
    this.chordRef.update({
      symbol: chord.symbol,
        name: chord.name,
        description: chord.description,
        learned: chord.learned,
    })
  }  

  DeleteChord(id: string) { 
    this.chordRef = this.db.object('chords-list/'+id);
    this.chordRef.remove();
  }
  
}