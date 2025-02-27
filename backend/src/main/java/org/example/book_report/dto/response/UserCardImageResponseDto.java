package org.example.book_report.dto.response;

import lombok.Builder;
import lombok.Getter;
import org.example.book_report.entity.ImageType;
import java.util.List;

@Getter
@Builder
public class UserCardImageResponseDto {

    private final int size;
    private final List<ImageResponseDto> images;

    public static UserCardImageResponseDto from(List<ImageResponseDto> images){
        return UserCardImageResponseDto.builder()
                .size(images.size())
                .images(images)
                .build();
    }
}
