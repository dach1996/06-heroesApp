import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth.routing.module';
import { LayoutPagesComponent } from './pages/layout-pages/layout-pages.component';



@NgModule({
  declarations: [
    LayoutPagesComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
