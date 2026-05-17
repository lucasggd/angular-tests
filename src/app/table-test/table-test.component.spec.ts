import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTestComponent } from './table-test.component';

describe('TableTestComponent', () => {
  let component: TableTestComponent;
  let fixture: ComponentFixture<TableTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableTestComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
