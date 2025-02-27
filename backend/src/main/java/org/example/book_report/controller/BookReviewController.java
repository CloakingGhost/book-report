package org.example.book_report.controller;

import lombok.RequiredArgsConstructor;
import org.example.book_report.service.BookReviewService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reviews")
public class BookReviewController {

    private final BookReviewService bookReviewService;
    /**
     *
     * @param reviewId
     * {
     *   "bookReviewId": 1
     * }
     * {
     *   "status" : 200,
     *
     *   "user" : {
     *     "username" : "닉네임"
     *   },
     *
     *   "book": {
     *     "title" : "책 제목",
     *     "author" : "저자",
     *     "publisher" : "출판사"
     *     "imageUrl" : "s3 url",
     *   },
     *
     *   "review" : {
     *     "title" : "한줄평",
     *     "content" : "아주 재밌다"
     *     "createdAt" : "감상문 생성 날짜",
     *     "private" : false
     *   }
     * }
     *
     *
     *
     */
    // 감상문 상세 조회
    @GetMapping("/{reviewId}")
    public void reviewDetails(@PathVariable("reviewId") String reviewId) {
    }


    /**
     * {
     *   "title" : "난쟁이가쏘아올린작은공"
     * }
     *
     *
     *{
     *   "status" : 200,
     *   "items" : [
     *     {
     *       "bookReviewId" : 1,
     *       "title" : "아주 재밌어요",
     *       "imageUrl" : http://~~~~,
     *       "mark" : false,
     *       "private" : false
     *     },
     *     {
     *       "bookReviewId" : 2,
     *       "title" : "쏘쏘한 듯",
     *       "imageUrl" : http://~~~~,
     *       "mark" : true,
     *       "private" : true
     *     },
     *   ],
     * }
     */
    // 감상문 목록 조회
    @GetMapping
    public void reviews() {}


    /**
     * {
     *   "book" : {
     *     "title" : "책 제목",
     *     "author" : "저자",
     *     "publisher" : "출판사",
     *     "imageId" : 1
     *   },
     *   "review" : {
     *     "imageId": 1,
     *     "title" : "한줄평",
     *     "private" : "false",
     *     "content" : "아주 재밌다"
     *   }
     * }
     * @param reviewId
     * {
     *   "status" : 200
     *   "bookReivewId" : 1
     * }
     */
    // 감상문 수정
    @PutMapping("/{reviewId}")
    public void updateReview(@PathVariable("reviewId") String reviewId) {}


    /**
     * {
     *   "private" : true
     * }
     * @param reviewId
     *
     * {
     *   "private" : true
     * }
     */
    // 감상문 공개/비공개 전환
    @PatchMapping("/{reviewId}")
    public void patchReview(@PathVariable("reviewId") String reviewId) {}


    /**
     *
     * {
     *   "reviewId" : 1
     * }
     * @param reviewId
     *
     * {
     *   "status" : 204
     * }
     */
    // 감상문 삭제
    @DeleteMapping("/{reviewId}")
    public void deleteReview(@PathVariable("reviewId") String reviewId) {}

    // 감상문 생성: 슬찬님
}
