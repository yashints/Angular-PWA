export class Book {
  constructor(book: any) {
    if (!book) {
      return;
    }

    this.id = book['id'];
    this.selfLink = book['selfLink'];
    this.volumeInfo = new VolumeInfo(book['volumeInfo']);
  }
  id: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
}

export class VolumeInfo {

  constructor(info: any) {
    if (!info) {
      return;
    }

    this.title = info['title'] || null;
    this.authors = info['authors'] || [];
    this.description = info['description'] || null;
    this.publishedDate = info['publishedDate'] || null;
    this.categories = info['categories'] || null;
    this.pageCount = info['pageCount'] || null;
    this.averageRating = info['averageRating'] || null;
    this.imageLinks = new ImageLinks(info['imageLinks']);
  }
  title: string;
  authors: Array<string>;
  publishedDate: string;
  description: string;
  pageCount: number;
  categories: string;
  averageRating: number;
  imageLinks: ImageLinks;
}

export class ImageLinks {
  constructor (links: any) {
    if (!links) {
      return;
    }
    this.smallThumbnail = links['smallThumbnail'] || null;
    this.thumbnail = links['thumbnail'] || null;
    this.medium = links['medium'] || null;
  }
  smallThumbnail: string;
  thumbnail: string;
  medium: string;
}
