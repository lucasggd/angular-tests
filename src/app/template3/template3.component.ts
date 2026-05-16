import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Template2Component } from '../template2/template2.component';
import { AbstractTest } from './abstract';
import ModelTeste from '../template1/model-teste.interface';

@Component({
  selector: 'app-template3',
  imports: [Template2Component],
  templateUrl: './template3.component.html',
  styleUrl: './template3.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Template3Component extends AbstractTest {
  @ViewChild(`templateTestea`) templateTestea!: TemplateRef<any>;

  constructor() {
    super();
  }

  override getDisplayColumns(): ModelTeste[] {
    return [
      {
        nome: `string`,
        test: { template: this.templateTestea },
      },
      {
        nome: `PAO QUENTINHO`,
        test: { template: this.templateTestea },
      },
    ];
  }
}
