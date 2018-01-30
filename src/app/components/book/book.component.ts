import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Observable } from 'rxjs/Observable';
import { Book } from '../../core/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  book: Observable<Book>;
  bookId: string;
  constructor(private bookService: BooksService,
      private activatedRoute: ActivatedRoute,
      private router: Router) {
    this.bookId = activatedRoute.snapshot.params['id'];
    if (!this.bookId) {
      this.router.navigate(['books']);
    }
  }

  ngOnInit() {
    this.book = this.bookService.getBook(this.bookId);
  }

}
