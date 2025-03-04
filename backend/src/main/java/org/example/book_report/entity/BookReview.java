package org.example.book_report.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.book_report.common.BaseTimeEntity;

@Table(name = "book_review")
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class BookReview extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 작성자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 책
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    // 카드 배경
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id")
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
