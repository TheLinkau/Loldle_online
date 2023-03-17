import { Book } from "@prisma/client";
import { BookRaw } from "../../../../contexts/book";

export function toBookRaw(book: Book): BookRaw {
    return {
        id: book.id,
        title: book.title,
        description: book.description,
    };
}