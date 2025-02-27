package org.example.book_report.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.book_report.common.BaseTimeEntity;

@Entity(name = "book_review")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class BookReview extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 작성자
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    // 책
    @ManyToOne(fetch = FetchType.LAZY)
    private Book book;

    // 카드 배경
    @OneToOne
    private Image image;

    // 제목
    private String title;

    // 내용
    private String content;

    // 공개 비공개 : boolean
    private boolean approved;



    public BookReview toggleApproved() {
        this.approved = !this.approved;
        return this;
    }
}
