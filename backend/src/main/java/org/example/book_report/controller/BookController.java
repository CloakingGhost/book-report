package org.example.book_report.controller;

import lombok.RequiredArgsConstructor;
import org.example.book_report.entity.Book;
import org.example.book_report.service.BookService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {
    private final BookService bookService;

    @GetMapping
    public ResponseEntity<Page<Book>> findAllByTitle(@RequestParam String title, Pageable pageable) {

        return ResponseEntity.ok(
                bookService.findAllByTitle(title, pageable)
        );
    }
}
