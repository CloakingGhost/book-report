package org.example.book_report.service;

import lombok.RequiredArgsConstructor;
import org.example.book_report.dto.request.CreateReviewRequestDto;
import org.example.book_report.dto.response.*;
import org.example.book_report.entity.*;
import org.example.book_report.repository.BookRepository;
import org.example.book_report.repository.BookReviewRepository;
import org.example.book_report.repository.ImageRepository;
import org.example.book_report.repository.UserImageRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BookReviewService {


    private final BookReviewRepository bookReviewRepository;
    private final BookRepository bookRepository;
    private final ImageService imageService;
    private final UserImageRepository userImageRepository;
    private final ImageRepository imageRepository;

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

    @Transactional
    public CreateReviewResponseDto createReview(CreateReviewRequestDto createReviewRequestDto,
                                                MultipartFile imageFile, User user) {

        Image image = null;
        Book book;
        if (imageFile != null && !imageFile.isEmpty()) {

            image = imageService.uploadImage(imageFile, user);
        }

        if (createReviewRequestDto.getBook().getBookId() == null) {
            book = bookRepository.save(createReviewRequestDto.getBook().toEntity(image, user));
        } else {
            book = bookRepository.findById(createReviewRequestDto.getBook().getBookId())
                    .orElseThrow(IllegalArgumentException::new);
        }

        Long imageId = createReviewRequestDto.getReview().getImageId();
        Image cardImage = imageRepository.findById(imageId).orElseThrow(()-> new IllegalArgumentException("카드 이미지가 없습니다."));


        BookReview bookReview = BookReview.builder()
                .book(book)
                .title(createReviewRequestDto.getReview().getTitle())
                .image(cardImage)
                .content(createReviewRequestDto.getReview().getContent())
                .user(user)
                .approved(true)
                .build();

        return CreateReviewResponseDto.from(
                bookReviewRepository.save(
                        (bookReview)
                )
        );
    }

    // 사용자가 업로드한 카드 이미지 조회
    public UserCardImageResponseDto getUserCardImages(ImageType type, User user) {

        List<UserImage> userImages = userImageRepository.findAllByUserIdWithType(type, user.getId());

        List<ImageResponseDto> imageResponseDtos = userImages.stream().map((userImage) -> {

            Image image = imageRepository.findById(userImage.getImage().getId())
                    .orElseThrow(IllegalArgumentException::new);
            return ImageResponseDto.from(image);
        }).toList();

        return UserCardImageResponseDto.from(type, imageResponseDtos);
    }

    // 메인페이지 감상문 조회
    public BookReviewsWithPageResponseDto getBookReviews(String bookTitle, Pageable pageable) {
        Page<BookReview> items = bookReviewRepository.getBookReviews(bookTitle, pageable);
        return BookReviewsWithPageResponseDto.from(items);
    }

    // 유저별 감상문 모음 조회
    public UserBookReviewsResponseDto getUserBookReviews(String username, Pageable pageable) {
        Page<BookReview> bookReviews = bookReviewRepository.getUserBookReviews(username, pageable);
        return UserBookReviewsResponseDto.from(bookReviews);
    }
}
