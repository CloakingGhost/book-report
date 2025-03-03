package org.example.book_report.repository;

import org.example.book_report.entity.ImageType;
import org.example.book_report.entity.UserImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserImageRepository extends JpaRepository<UserImage, Long> {

    @Query("""
                SELECT ui FROM UserImage ui
                LEFT JOIN ui.image i
                WHERE i.id = :imageId
            """)
    Optional<UserImage> findByImageId(Long imageId);

    @Query("""
                SELECT ui FROM UserImage ui
                LEFT JOIN FETCH ui.image i
                WHERE ui.user.id = :userId AND i.type = :type
            """)
    List<UserImage> findAllByUserIdWithType(ImageType type, Long userId);
}
