import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {GetUnitsService} from "../../services/get-units.service";
import {LocationInterface} from "../../types/location.interface";
import {FilterUnitsService} from "../../services/filter-units.service";

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {
  results: LocationInterface[] = [];
  filteredResults: LocationInterface[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: GetUnitsService,
    private filterService: FilterUnitsService
  ) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    });

    this.service.getAllUnits()
      .subscribe(data => {
          this.results = data
          this.filteredResults = data
      });
  }


  onSubmit() {
    this.filteredResults = this.filterService.filter(this.results, this.formGroup.value.showClosed, this.formGroup.value.hour)
    this.service.setFilteredUnits(this.filteredResults)
  }

  onClean() {
    this.formGroup.reset();
    this.formGroup.value.showClosed = true
    this.filteredResults = this.results
  }
}
