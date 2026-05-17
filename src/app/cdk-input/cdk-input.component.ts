import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'cdk-input',
  imports: [ReactiveFormsModule],
  templateUrl: './cdk-input.component.html',
  styleUrl: './cdk-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdkInputComponent {
  @Input({ alias: 'control', required: true }) control!: FormControl;
  @Input('label') label: string = '';
  @Input('placeholder') placeholder: string = '';

  public validators = Validators;
}
