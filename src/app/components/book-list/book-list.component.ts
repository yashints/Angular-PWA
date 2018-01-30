import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../core/models';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Observable<Book[]>;
  title = 'Crime';

  constructor(private bookService: BooksService, private router: Router) { }

  ngOnInit() {
    this.books = this.bookService.getBooks(this.title);
  }

  search() {
    this.books = this.bookService.getBooks(this.title);
  }

  showBookDetails(id: any) {
    this.router.navigate(['books', id]);
  }

}
