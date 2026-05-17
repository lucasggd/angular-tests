import { Routes } from '@angular/router';
import { Template2Component } from './template2/template2.component';
import { Template3Component } from './template3/template3.component';
import { TableTestComponent } from './table-test/table-test.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [{ path: '**', component: NavbarComponent }];
