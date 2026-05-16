import { ChangeDetectorRef, Inject, inject } from '@angular/core';
import ModelTeste from '../template1/model-teste.interface';

@Inject({})
export abstract class AbstractTest {
  public obj: ModelTeste[] = [];

  public cdr = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    this.obj = this.getDisplayColumns();
    this.cdr.detectChanges();
  }

  abstract getDisplayColumns(): ModelTeste[];
}
