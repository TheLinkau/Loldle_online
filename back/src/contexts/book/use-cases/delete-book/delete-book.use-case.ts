import { IBookRepository } from "../../infrastructure"

export class DeleteBookUseCase {
    constructor(private bookRepository: IBookRepository) { }

    async execute(id: string): Promise<string> {
        return this.bookRepository.deleteBook(id)
    }
}