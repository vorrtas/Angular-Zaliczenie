import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { AddChordComponent } from './add-chord/add-chord.component';
import { EditChordComponent } from './edit-chord/edit-chord.component';
import { ChordListComponent } from './chord-list/chord-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/add-chord', pathMatch: 'full' },
  { path: 'add-chord', component: AddChordComponent },
  { path: 'view-chords', component: ChordListComponent },
  { path: 'edit-chord/:id', component: EditChordComponent }
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { }
