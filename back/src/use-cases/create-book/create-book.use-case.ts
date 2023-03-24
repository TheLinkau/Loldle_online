import { Book } from "../../domains/types"
import { IBookRepository } from "../../infrastructure"

export class CreateBookUseCase {
    constructor(private bookRepository: IBookRepository) { }

    async execute(book: Book): Promise<Book> {
        return this.bookRepository.createOneBook(book)
    }
}