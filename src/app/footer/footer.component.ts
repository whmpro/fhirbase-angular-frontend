import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(  console.log);
  }

  //test = new FormControl('awdawd');
  form = this.fb.group({
    test: [''],
  });

  


  
  submit(){
    console.log(this.form.value);
  }

}
