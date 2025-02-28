package org.example.book_report.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.example.book_report.dto.request.CreateReviewRequestDto;
import org.example.book_report.dto.response.BookReviewDetailResponseDto;
import org.example.book_report.dto.response.BookReviewToggleApprovedResponseDto;
import org.example.book_report.dto.response.BookReviewsResponseDto;
import org.example.book_report.dto.response.CreateReviewResponseDto;
import org.example.book_report.entity.BookReview;
import org.example.book_report.entity.Image;
import org.example.book_report.repository.BookRepository;
import org.example.book_report.repository.BookReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BookReviewService {

    private final BookReviewRepository bookReviewRepository;
    private final BookRepository bookRepository;
    private final ImageService imageService;

    public BookReviewDetailResponseDto findByBookReviewId(Long reviewId) {
        Optional<BookReview> bookReview = bookReviewRepository.findById(reviewId);

        return BookReviewDetailResponseDto.from(bookReview.orElseThrow(IllegalArgumentException::new));
    }

    @Transactional
    public BookReviewToggleApprovedResponseDto updateApproved(Long reviewId) {
        BookReview bookReview = bookReviewRepository.findById(reviewId).orElseThrow(IllegalArgumentException::new);
        return BookReviewToggleApprovedResponseDto.from(bookReview.toggleApproved());
    }

    @Transactional
    public void remove(Long reviewId) {
        bookReviewRepository.deleteById(reviewId);
    }

    public List<BookReviewsResponseDto> findAll() {

        return bookReviewRepository.findAll().stream().map(BookReviewsResponseDto::from).toList();
    }

    @Transactional
    public CreateReviewResponseDto createReview(CreateReviewRequestDto createReviewRequestDto, MultipartFile imageFile) {

        Image image = imageService.uploadImage(imageFile);
        BookReview bookReview = createReviewRequestDto.toEntity(image);

        return CreateReviewResponseDto.from(bookReviewRepository.save(bookReview));

    }
}
