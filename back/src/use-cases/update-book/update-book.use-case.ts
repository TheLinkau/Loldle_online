import { Book } from "../../domains/types"
import { IBookRepository } from "../../infrastructure"

export class UpdateBookUseCase {
    constructor(private bookRepository: IBookRepository) { }

    async execute(book: Book): Promise<string> {
        return this.bookRepository.updateOneBook(book)
    }
}