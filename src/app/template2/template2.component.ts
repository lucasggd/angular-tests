import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  contentChild,
  ContentChild,
  Input,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Template1Component } from '../template1/template1.component';
import { CommonModule } from '@angular/common';
import ModelTeste from '../template1/model-teste.interface';

@Component({
  selector: 'app-template2',
  imports: [Template1Component, CommonModule],
  templateUrl: './template2.component.html',
  styleUrl: './template2.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Template2Component {
  @Input({ alias: `obj`, required: true }) obj!: ModelTeste[];

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('👽 ~ Template2Component ~ ngOnChanges ~ changes:', changes);
  }
}
