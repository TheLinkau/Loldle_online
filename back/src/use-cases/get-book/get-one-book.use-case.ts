import { Book } from "../../domains/types"
import { IBookRepository } from "../../infrastructure"

export class GetOneBookUseCase {
    constructor(private bookRepository: IBookRepository) { }

    async execute(id: string): Promise<Book> {
        return this.bookRepository.getOneBook(id)
    }
}
