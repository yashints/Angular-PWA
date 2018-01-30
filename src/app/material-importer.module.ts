import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatIconModule,
  MatCardModule, MatButtonModule,
  MatFormFieldModule, MatInputModule,
  MatProgressSpinnerModule, MatChipsModule,
  MatSidenavModule, MatListModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSidenavModule,
    MatListModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSidenavModule,
    MatListModule
  ],
  declarations: []
})
export class MaterialImporterModule { }
