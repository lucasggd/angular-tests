import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import ModelTeste from './model-teste.interface';

@Component({
  selector: 'app-template1',
  imports: [NgTemplateOutlet],
  templateUrl: './template1.component.html',
  styleUrl: './template1.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Template1Component {
  @Input({ alias: `obj`, required: true }) obj!: ModelTeste[];

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('👽 ~ Template1Component ~ ngOnChanges ~ changes:', changes);
  }
}
