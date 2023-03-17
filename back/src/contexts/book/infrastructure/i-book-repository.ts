import { Book } from "../domains/types";

export type BookRaw = Book;

export interface IBookRepository {
    getAllBooks(): Promise<BookRaw[]>;
    getOneBook(id: string): Promise<BookRaw>;
    createOneBook(book: Book): Promise<BookRaw>;
    deleteBook(id: string): Promise<string>;
    updateOneBook(book: Book): Promise<string>;
}