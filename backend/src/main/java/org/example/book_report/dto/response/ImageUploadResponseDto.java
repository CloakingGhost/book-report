package org.example.book_report.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.example.book_report.entity.ImageType;

import java.util.List;

@Getter
@Builder
public class ImageUploadResponseDto {

    private final ImageType type;
    private final List<ImageResponseDto> images;

    public static ImageUploadResponseDto from(ImageType type, List<ImageResponseDto> images) {
        return ImageUploadResponseDto.builder()
                .type(type)
                .images(images)
                .build();
    }
}
