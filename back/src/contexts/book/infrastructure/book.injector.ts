import { Router } from "express"
import { BookRepository, RelationalDatabase } from "../../../infrastructure/database"
import { CreateBookUseCase, GetBooksUseCase, UpdateBookUseCase, DeleteBookUseCase } from "../use-cases"
import { bookRoutes } from "./book.routes"
import { BookController } from "./controller"

export type BookExternalDependencies = {
    database: RelationalDatabase
}

export const bookInjector = (externalDependencies: BookExternalDependencies): Router => {
    const bookRepository = new BookRepository(externalDependencies.database)

    const getBooksUseCase = new GetBooksUseCase(bookRepository)
    const updateBookUseCase = new UpdateBookUseCase(bookRepository)
    const createBookUseCase = new CreateBookUseCase(bookRepository)
    const deleteBookUseCase = new DeleteBookUseCase(bookRepository)

    const bookController = new BookController(
        getBooksUseCase,
        createBookUseCase,
        updateBookUseCase,
        deleteBookUseCase
    )

    return bookRoutes(bookController)
}