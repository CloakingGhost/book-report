package org.example.book_report.controller;


import java.util.List;

import lombok.RequiredArgsConstructor;
import org.example.book_report.common.ApiResponse;
import org.example.book_report.dto.request.CreateReviewRequestDto;
import org.example.book_report.dto.request.UpdateBookReviewRequestDto;
import org.example.book_report.dto.response.BookReviewDetailResponseDto;
import org.example.book_report.dto.response.BookReviewToggleApprovedResponseDto;
import org.example.book_report.dto.response.BookReviewsResponseDto;
import org.example.book_report.dto.response.CreateReviewResponseDto;
import org.example.book_report.service.BookReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import org.example.book_report.dto.response.UserCardImageResponseDto;
import org.example.book_report.entity.ImageType;
import org.example.book_report.entity.User;
import org.example.book_report.dto.response.CreateReviewResponseDto;
import org.example.book_report.entity.BookReview;
import org.example.book_report.service.BookReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reviews")
public class BookReviewController {

    private final BookReviewService bookReviewService;

    /**
     * @param reviewId { "reviewId": 1 } { "status" : 200,
     *                 <p>
     *                 "username" : "닉네임",
     *                 <p>
     *                 "book": { "title" : "책 제목", "author" : "저자", "publisher" : "출판사" "imageUrl" : "s3 url", },
     *                 <p>
     *                 "review" : { "title" : "한줄평", "content" : "아주 재밌다" "createdAt" : "감상문 생성 날짜", "approved" : false
     *                 } }
     */
    // 감상문 상세 조회
    @GetMapping("/{reviewId}")
    public ResponseEntity<ApiResponse<BookReviewDetailResponseDto>> bookReviewDetail(
            @PathVariable("reviewId") Long reviewId) {
        return ResponseEntity.ok(ApiResponse.ok(bookReviewService.findByBookReviewId(reviewId)));
    }


    /**
     * { "title" : "난쟁이가쏘아올린작은공" }
     * <p>
     * <p>
     * { "status" : 200, "items" : [ { "bookReviewId" : 1, "title" : "아주 재밌어요", "imageUrl" : http://~~~~, "approved" :
     * false }, { "bookReviewId" : 2, "title" : "쏘쏘한 듯", "imageUrl" : http://~~~~, "approved" : true }, ], }
     */
    // 감상문 목록 조회
    @GetMapping
    public ResponseEntity<ApiResponse<List<BookReviewsResponseDto>>> getBookReviews() {
        return ResponseEntity.ok(
                ApiResponse.ok(bookReviewService.findAll())
        );
    }


    /**
     * { "approved" : true }
     *
     * @param reviewId { "approved" : true }
     */
    // 감상문 공개/비공개 전환
    @PatchMapping("/{reviewId}")
    public ResponseEntity<ApiResponse<BookReviewToggleApprovedResponseDto>> updateApproved(
            @PathVariable("reviewId") Long reviewId
    ) {
        return ResponseEntity.ok(
                ApiResponse.ok(
                        bookReviewService.updateApproved(reviewId)
                )
        );
    }


    /**
     * { "book" : { "title" : "책 제목", "author" : "저자", "publisher" : "출판사", "imageId" : 1 }, "review" : { "imageId": 1,
     * "title" : "한줄평", "approved" : "false", "content" : "아주 재밌다" } }
     *
     * @param reviewId
     * @return { "status" : 200 "bookReviewId" : 1 }
     */
    // 감상문 수정
    @PutMapping("/{reviewId}")
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


    /**
     * { "reviewId" : 1 }
     *
     * @param reviewId { "status" : 204 }
     */
    // 감상문 삭제
    @DeleteMapping("/{reviewId}")
    public ResponseEntity.HeadersBuilder<?> deleteReview(@PathVariable("reviewId") Long reviewId) {
        bookReviewService.remove(reviewId);
        return ResponseEntity.noContent();
    }

    // 감상문 생성
    @PostMapping
    public CreateReviewResponseDto createReview(
            @RequestPart("data") CreateReviewRequestDto createReviewRequestDto,
            @RequestPart(value = "imageFile") MultipartFile imageFile) {

        return bookReviewService.createReview(createReviewRequestDto, imageFile);
    }

}
