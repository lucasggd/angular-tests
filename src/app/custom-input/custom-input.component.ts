import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkInputComponent } from '../cdk-input/cdk-input.component';

@Component({
  selector: 'app-custom-input',
  imports: [ReactiveFormsModule, CdkInputComponent],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css',
})
export class CustomInputComponent {
  control = new FormControl(null, [Validators.required]);
  control2 = new FormControl(null);

  public validators = Validators;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.control.valueChanges.subscribe((data) => console.log(data));
  }
}
