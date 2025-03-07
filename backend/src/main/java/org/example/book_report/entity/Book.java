package org.example.book_report.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.book_report.common.BaseTimeEntity;

@Getter
@Setter
@Entity
@Builder
@RequiredArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Book extends BaseTimeEntity {
    // TODO: 제약조건 추가
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id")
    private Image image;
    private String title;
    private String titleNormalized;
    private String author;
    private String publisher;

    @PrePersist
    @PreUpdate
    public void normalizeTitle() {
        this.titleNormalized = (this.title != null) ? this.title.replace(" ", "").toLowerCase() : null;
    }


}
