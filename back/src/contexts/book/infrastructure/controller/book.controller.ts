import { Request, Response } from "express";
import { BookNotFoundException } from "../../../../infrastructure/database/repositories";
import { GetBooksUseCase, CreateBookUseCase, UpdateBookUseCase, DeleteBookUseCase, GetOneBookUseCase } from "../../use-cases";

export class BookController {

    constructor(
        private readonly getBooksUseCase: GetBooksUseCase,
        private readonly createBookUseCase: CreateBookUseCase,
        private readonly updateBookUseCase: UpdateBookUseCase,
        private readonly deleteBookUseCase: DeleteBookUseCase,
        private readonly getOneBookUseCase: GetOneBookUseCase
    ) { }

    async getBooks(req: Request, res: Response) {
        const books = await this.getBooksUseCase.execute();
        res.status(200).json(books);
    }

    async getOneBook(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const book = await this.getOneBookUseCase.execute(id);
            res.status(200).json(book);
        } catch (e) {
            if (e instanceof BookNotFoundException) {
                console.log('Book not found:', e.message);
            } else {
                throw e;
            }
        }
    }

    async createBook(req: Request, res: Response) {
        const { title, description } = req.body;
        const book = await this.createBookUseCase.execute({ title, description, id: "2" });
        res.status(201).json(book);
    }

    async updateBook(req: Request, res: Response) {
        const { id } = req.params;
        const { title, description } = req.body;
        const book = await this.updateBookUseCase.execute({ title, id, description });
        res.status(200).json(book);
    }

    async deleteBook(req: Request, res: Response) {
        const { id } = req.params;
        await this.deleteBookUseCase.execute(id);
        res.status(204).send();
    }
}