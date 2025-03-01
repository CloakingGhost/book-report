package org.example.book_report.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.example.book_report.dto.request.CreateReviewRequestDto;
import org.example.book_report.dto.response.BookReviewDetailResponseDto;
import org.example.book_report.dto.response.BookReviewToggleApprovedResponseDto;
import org.example.book_report.dto.response.BookReviewsResponseDto;
import org.example.book_report.dto.response.CreateReviewResponseDto;
import org.example.book_report.dto.response.ImageResponseDto;
import org.example.book_report.dto.response.UserCardImageResponseDto;
import org.example.book_report.entity.Book;
import org.example.book_report.entity.BookReview;
import org.example.book_report.entity.Image;
import org.example.book_report.entity.ImageType;
import org.example.book_report.entity.User;
import org.example.book_report.entity.UserImage;
import org.example.book_report.repository.BookRepository;
import org.example.book_report.repository.BookReviewRepository;
import org.example.book_report.repository.ImageRepository;
import org.example.book_report.repository.UserImageRepository;
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

    public List<BookReviewsResponseDto> findAll() {

        return bookReviewRepository.findAll().stream().map(BookReviewsResponseDto::from).toList();
    }

    @Transactional
    public CreateReviewResponseDto createReview(CreateReviewRequestDto createReviewRequestDto,
                                                MultipartFile imageFile) {

        Image image = imageService.uploadImage(imageFile);
        Book book;

        if (createReviewRequestDto.getBook().getBookId() == null) {
            book = bookRepository.save(createReviewRequestDto.getBook().toEntity(image));
        } else {
            book = bookRepository.findById(createReviewRequestDto.getBook().getBookId())
                    .orElseThrow(IllegalArgumentException::new);
        }

        BookReview bookReview = BookReview.builder()
                .book(book)
                .title(createReviewRequestDto.getReview().getTitle())
                .image(image)
                .content(createReviewRequestDto.getReview().getContent())
                .build();

        return CreateReviewResponseDto.from(
                bookReviewRepository.save(
                        (bookReview)
                )
        );
    }

    // 사용자가 업로드한 카드 이미지 조회
    public UserCardImageResponseDto getUserCardImages(ImageType type, User user) {

        List<UserImage> userImages = userImageRepository.findAllByUserId(user.getId());

        List<ImageResponseDto> imageResponseDtos = userImages.stream().map((userImage) -> {
            Image image = imageRepository.findByImageType(type).orElseThrow(IllegalArgumentException::new);
            return ImageResponseDto.from(image);
        }).toList();

        return UserCardImageResponseDto.from(type, imageResponseDtos);
    }
}
