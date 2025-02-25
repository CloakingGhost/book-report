package org.example.book_report.service;

import lombok.RequiredArgsConstructor;
import org.example.book_report.entity.Book;
import org.example.book_report.repository.BookRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;

    public Page<Book> findAllByTitle(String title, Pageable pageable) {

        return bookRepository.findAllByTitleContaining(title, pageable);
    }
}
