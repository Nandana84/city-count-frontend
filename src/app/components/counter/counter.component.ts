import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-counter',
  standalone: false,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent implements OnInit{
  cityForm: FormGroup;
  count: number | null = null;
  public isFormSubmitted: boolean;
  showResult: boolean;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.cityForm ={}  as FormGroup;
    this.isFormSubmitted = false;
    this.showResult = false;
  }
  ngOnInit(): void {
    this.initializeForm();  
  }


  public initializeForm(){
    this.cityForm = this.fb.group({
      letter: ['', [Validators.required, Validators.pattern('^[a-zA-Z]$')]]
    });
  }

  get userFormControls(){
    return this.cityForm.controls;
  }

  onInput(): void {
    // Hide the result when the user starts typing again
    this.showResult = false;
  }
  getCityCount(): void {
    this.isFormSubmitted=true;
    this.showResult = true;
    var letter = this.cityForm.value.letter.toLowerCase();
    var API_URL = `http://localhost:8080/api/citycount?startsWith=${letter}`; 

      this.http.get<number>(API_URL).subscribe(response => {
        this.count = response;
      });
 
  }

}
