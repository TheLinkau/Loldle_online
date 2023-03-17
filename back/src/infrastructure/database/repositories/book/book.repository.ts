import { Book } from "@prisma/client";
import { BookRaw, IBookRepository } from "../../../../contexts/book";
import { RelationalDatabase } from "../../database";
import { toBookRaw } from "./book.mapper";

export class BookNotFoundException extends Error {
    constructor(id: string) {
        super(`Book with id ${id} not found`);
        this.name = 'BookNotFoundException';
    }
}

export class BookRepository implements IBookRepository {

    constructor(private readonly database: RelationalDatabase) { }


    async getAllBooks(): Promise<BookRaw[]> {
        const books = await this.database.client.book.findMany();
        return books.map(toBookRaw);
    }

    async getOneBook(id: string): Promise<BookRaw> {
        const book = await this.database.client.book.findUnique({
            where: { id }
        });
        if (!book) {
            throw new BookNotFoundException(id);
        }
        return toBookRaw(book);
    }

    async createOneBook(book: BookRaw): Promise<BookRaw> {
        const createdBook = await this.database.client.book.create({
            data: book
        });
        return toBookRaw(createdBook);
    }

    async deleteBook(id: string): Promise<string>  {
        const deletedBook = await this.database.client.book.delete({
            where: { id }
        });
        return deletedBook.id;
    }

    async updateOneBook(book: Book): Promise<string> {
        const updatedBook = await this.database.client.book.update({
            where: { id: book.id },
            data: book
        });
        return updatedBook.id;
    }
}