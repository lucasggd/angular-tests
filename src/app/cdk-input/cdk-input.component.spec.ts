import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkInputComponent } from './cdk-input.component';

describe('CdkInputComponent', () => {
  let component: CdkInputComponent;
  let fixture: ComponentFixture<CdkInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdkInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CdkInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
