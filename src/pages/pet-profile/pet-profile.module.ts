import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PetProfilePage } from './pet-profile';

@NgModule({
  declarations: [
    PetProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(PetProfilePage),
  ],
  exports: [
    PetProfilePage
  ]
})
export class PetProfilePageModule {}
