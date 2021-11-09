import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-chord',
  templateUrl: './add-chord.component.html',
  styleUrls: ['./add-chord.component.scss']
})

export class AddChordComponent implements OnInit {
  public chordForm: FormGroup;
 
  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) { }

 
  ngOnInit() {
    this.crudApi.GetChordsList();
    this.chordForms();
  }

  chordForms() {
    this.chordForm = this.fb.group({
      symbol: ['', [Validators.required, Validators.minLength(2)]],
      name: [''],
      description: [''],
      learned: [false]
    })  
  }

  get symbol() {
    return this.chordForm.get('symbol');
  }

  get name() {
    return this.chordForm.get('name');
  }  

  get description() {
    return this.chordForm.get('description');
  }

  get learned() {
    return this.chordForm.get('learned');
  }

  ResetForm() {
    this.chordForm.reset();
  }  
 
  submitChordData() {
    this.crudApi.AddChord(this.chordForm.value);
    this.toastr.success(this.chordForm.controls['symbol'].value + ' successfully added!');
    this.ResetForm();
   };

}