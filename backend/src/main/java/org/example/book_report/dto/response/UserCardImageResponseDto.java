package org.example.book_report.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.example.book_report.entity.ImageType;

import java.util.List;

@Getter
@Builder
public class UserCardImageResponseDto {

    private final ImageType type;
    private final UserImageResponseDto images;

    public static UserCardImageResponseDto from(ImageType type, List<ImageResponseDto> images) {
        return UserCardImageResponseDto.builder()
                .type(type)
                .images(UserImageResponseDto.from(images))
                .build();
    }

    @Getter
    @Builder
    private static class UserImageResponseDto {

        private int size;
        private List<ImageResponseDto> items;

        private static UserImageResponseDto from(List<ImageResponseDto> images) {
            return UserImageResponseDto.builder()
                    .size(images.size())
                    .items(images)
                    .build();
        }
    }

}
