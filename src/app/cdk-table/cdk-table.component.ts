import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'cdk-table',
  imports: [CommonModule],
  templateUrl: './cdk-table.component.html',
  styleUrl: './cdk-table.component.css',
})
export class CdkTableComponent {
  @Input(`columns`) columns: any = [];
  @Input(`data`) data: any = [];
  @ContentChild(`thead`) thead!: ViewContainerRef;

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.

    console.log('👽 ~ CdkTableComponent ~ ngAfterContentInit ~ this.thead:', this.thead);
  }
}
