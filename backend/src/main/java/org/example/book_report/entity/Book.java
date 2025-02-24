package org.example.book_report.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Book {
    // TODO: 제약조건 추가
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private User user;
    private String image; // TODO: 이미지 엔티티 생성 후 교체
    private String title;
    private String titleNormalized;
    private String author;
    private String publisher;

    protected Book() {
        // titleNormalized 서버에서 하면 여기서 함
    }

}
