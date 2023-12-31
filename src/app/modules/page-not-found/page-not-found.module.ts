import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from "./page-not-found.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [PageNotFoundComponent],
})
export class PageNotFoundModule {}
