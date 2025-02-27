package org.example.book_report.service;

import lombok.RequiredArgsConstructor;
import org.example.book_report.dto.response.*;
import org.example.book_report.entity.BookReview;
import org.example.book_report.entity.User;
import org.example.book_report.entity.UserImage;
import org.example.book_report.repository.BookReviewRepository;
import org.example.book_report.repository.UserImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookReviewService {

    private final BookReviewRepository bookReviewRepository;
    private final UserImageRepository userImageRepository;

    public BookReviewDetailResponseDto findByBookReviewId(Long reviewId) {
        Optional<BookReview> bookReview = bookReviewRepository.findById(reviewId);

        return BookReviewDetailResponseDto.from(bookReview.orElseThrow(IllegalArgumentException::new));
    }

    public BookReviewToggleApprovedResponseDto updateApproved(Long reviewId) {
        BookReview bookReview = bookReviewRepository.findById(reviewId).orElseThrow(IllegalArgumentException::new);
        return BookReviewToggleApprovedResponseDto.from(bookReview.toggleApproved());
    }

    public void remove(Long reviewId) {
        bookReviewRepository.deleteById(reviewId);
    }

    public List<BookReviewsResponseDto> findAll() {

        return bookReviewRepository.findAll().stream().map(BookReviewsResponseDto::from).toList();
    }

    // 사용자가 업로드한 이미지 조회
    public UserCardImageResponseDto getUserCardImages(User user){

        List<UserImage> userImages = userImageRepository.findAllByUserId(user.getId());

        List<ImageResponseDto> imageResponseDtos = userImages.stream().map((userImage)->{
            return ImageResponseDto.from(userImage.getImage());
        }).toList();

        return UserCardImageResponseDto.from(imageResponseDtos);
    }
}
