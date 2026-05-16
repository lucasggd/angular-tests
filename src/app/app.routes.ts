import { Routes } from '@angular/router';
import { Template2Component } from './template2/template2.component';
import { Template3Component } from './template3/template3.component';

export const routes: Routes = [{ path: '**', component: Template3Component }];
