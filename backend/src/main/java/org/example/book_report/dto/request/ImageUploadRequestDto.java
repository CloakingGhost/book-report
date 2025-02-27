package org.example.book_report.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.example.book_report.entity.ImageType;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageUploadRequestDto {

    private ImageType type;

}
