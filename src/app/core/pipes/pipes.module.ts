import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { SortByAlphabetPipe } from './sort-by-alphabet.pipe';
import { ShortenPipe } from './shorten.pipe';
import { SortByDatePipe } from './sort-by-date.pipe';

@NgModule({
  declarations: [
    SafePipe,
    SortByAlphabetPipe,
    ShortenPipe,
    SortByDatePipe
  ],
  imports: [ CommonModule ],
  exports: [
    SafePipe,
    SortByAlphabetPipe,
    ShortenPipe,
    SortByDatePipe
  ],
  providers: [],
})
export class PipesModule {}
