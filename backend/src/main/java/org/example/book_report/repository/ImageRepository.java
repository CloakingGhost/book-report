package org.example.book_report.repository;

import org.example.book_report.entity.Image;
import org.example.book_report.entity.ImageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    @Query("""
                SELECT i FROM Image i
                WHERE i.type = :type AND i.id = :imageId
            """)
    Optional<Image> findByImageType(ImageType type, Long imageId);
}
