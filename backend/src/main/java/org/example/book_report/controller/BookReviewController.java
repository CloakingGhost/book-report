package org.example.book_report.controller;


import lombok.RequiredArgsConstructor;
import org.example.book_report.common.ApiResponse;
import org.example.book_report.dto.request.CreateReviewRequestDto;
import org.example.book_report.dto.request.UpdateBookReviewRequestDto;
import org.example.book_report.dto.response.*;
import org.example.book_report.entity.ImageType;
import org.example.book_report.entity.User;
import org.example.book_report.service.BookReviewService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class BookReviewController {

    private final BookReviewService bookReviewService;

    // 감상문 상세 조회
    @GetMapping("/reviews/{reviewId}")
    public ResponseEntity<ApiResponse<BookReviewDetailResponseDto>> bookReviewDetail(
            @PathVariable("reviewId") Long reviewId) {
        return ResponseEntity.ok(ApiResponse.ok(bookReviewService.findByBookReviewId(reviewId)));
    }


    // 메인 페이지 감상문 조회
    @GetMapping("/reviews")
    public BookReviewsWithPageResponseDto getBookReviews(@RequestParam("title") String bookTitle, Pageable pageable) {
        return bookReviewService.getBookReviews(bookTitle, pageable);
    }


    // 감상문 공개/비공개 전환
    @PatchMapping("/reviews/{reviewId}")
    public ResponseEntity<ApiResponse<BookReviewToggleApprovedResponseDto>> updateApproved(
            @PathVariable("reviewId") Long reviewId
    ) {
        return ResponseEntity.ok(
                ApiResponse.ok(
                        bookReviewService.updateApproved(reviewId)
                )
        );
    }


    // 감상문 수정
    @PutMapping("/reviews/{reviewId}")
    public void putBookReview(@PathVariable("reviewId") Long reviewId,
                              @RequestPart(value = "imageFile", required = false) List<MultipartFile> images,
                              @RequestPart(value = "data") UpdateBookReviewRequestDto requestDto
    ) {
        // dirty checking 으로 BookReview 업데이트
        //
        // 1.직접 입력 시
        //      bookId == null
        //      title => 필수
        //      author => 선택
        //      publisher => 선택
        //      유저Id 비즈니스 로직에서 추가 시키기
        // 2. DB에 있던 정보인 경우
        //      bookId => 필수
        //      title == null
        //      author == null
        //      publisher == null

        // images.size() == 0 이면 책표지 생성 안함
        // images.size() != 0 이면 새로 생성해서 BookReview 테이블의 FK인 ImageId 업데이트 해야함
    }


    // 감상문 삭제
    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable("reviewId") Long reviewId) {
        bookReviewService.remove(reviewId);
        return ResponseEntity.noContent().build();
    }

    // 사용자가 업로드한 이미지 조회
    @GetMapping("/reviews/images")
    public ResponseEntity<ApiResponse<UserCardImageResponseDto>> getUserCardImages(
            @RequestParam ImageType type,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(ApiResponse.ok(bookReviewService.getUserCardImages(type, user)));
    }

    // 감상문 생성
    @PostMapping("/reviews")
    public ResponseEntity<ApiResponse<CreateReviewResponseDto>> createReview(
            @RequestPart(value = "data") CreateReviewRequestDto requestDto,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile,
            @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(ApiResponse.ok(bookReviewService.createReview(requestDto, imageFile, user)));
    }

    // 유저별 감상문 모음 조회
    @GetMapping("/userpage/{username}")
    public ResponseEntity<ApiResponse<UserBookReviewsResponseDto>> getUserBookReviews(@PathVariable("username") String username, Pageable pageable) {
        return ResponseEntity.ok(
                ApiResponse.ok(
                        bookReviewService.getUserBookReviews(username, pageable)
                )
        );
    }
}
