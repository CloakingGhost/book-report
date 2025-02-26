package org.example.book_report.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.book_report.common.BaseTimeEntity;
import org.example.book_report.dto.request.ImageUploadRequestDto;

@Table(name = "image")
@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Image extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ImageType type;

    @Column(nullable = true)
    private String imageUrl;

    @OneToOne
    @JoinColumn(name = "member_image_id")
    private UserImage userImage;

}
