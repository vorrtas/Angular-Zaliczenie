import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../shared/crud.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-chord',
  templateUrl: './edit-chord.component.html',
  styleUrls: ['./edit-chord.component.scss']
})

export class EditChordComponent implements OnInit {
  editForm: FormGroup;
  
  constructor(
    private crudApi: CrudService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ){ }

  ngOnInit() {
    this.updateChordData();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.crudApi.GetChord(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data)
    })
  }

  get symbol() {
    return this.editForm.get('symbol');
  }

  get name() {
    return this.editForm.get('name');
  }  

  get description() {
    return this.editForm.get('description');
  }

  get learned() {
    return this.editForm.get('learned');
  } 

  updateChordData() {
    this.editForm = this.fb.group({
      symbol: ['', [Validators.required, Validators.minLength(2)]],
      name: [''],
      description: [''],
      learned: [false]
    })
  }

  goBack() {
    this.location.back();
  }

  updateForm(){
    this.crudApi.UpdateChord(this.editForm.value);
    this.toastr.success(this.editForm.controls['symbol'].value + ' updated successfully');
    this.router.navigate(['view-chords']);
  }

}