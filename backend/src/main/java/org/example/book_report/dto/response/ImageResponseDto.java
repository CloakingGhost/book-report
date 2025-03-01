package org.example.book_report.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.example.book_report.entity.Image;

@Getter
@Builder
public class ImageResponseDto {

    private final Long id;
    private final String imageUrl;

    public static ImageResponseDto from(Image image){
        return ImageResponseDto.builder()
                .id(image.getId())
                .imageUrl(image.getImageUrl())
                .build();
    }

}
