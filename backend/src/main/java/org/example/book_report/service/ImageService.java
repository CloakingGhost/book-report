package org.example.book_report.service;

import lombok.RequiredArgsConstructor;
import org.example.book_report.dto.request.ImageUploadRequestDto;
import org.example.book_report.dto.response.ImageResponseDto;
import org.example.book_report.dto.response.ImageUploadResponseDto;
import org.example.book_report.entity.Image;
import org.example.book_report.entity.ImageType;
import org.example.book_report.entity.UserImage;
import org.example.book_report.repository.ImageRepository;
import org.example.book_report.repository.UserImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ImageService {

    private final UserImageRepository userImageRepository;
    private final ImageRepository imageRepository;
    private final S3Service s3Service;

    @Transactional
    public ImageUploadResponseDto uploadImage(ImageUploadRequestDto imageUploadRequestDto, List<MultipartFile> images) {

        ImageType type = imageUploadRequestDto.getType();
        List<Map<String, String>> uploadResults = images.stream().map(s3Service::uploadImage).toList();

        List<ImageResponseDto> imageResponseDtos = uploadResults.stream().map(uploadResult -> {
            String imageUrl = uploadResult.get("imageUrl");
            String s3Key = uploadResult.get("s3Key");
            String originalFileName = uploadResult.get("originalFileName");

            UserImage userImage = UserImage.builder()
                    .originalFileName(originalFileName)
                    .s3Key(s3Key)
                    .build();

            UserImage savedUserImage = userImageRepository.save(userImage);

            Image image = Image.builder()
                    .type(type)
                    .imageUrl(imageUrl)
                    .userImage(userImage)
                    .build();

            Image savedImage = imageRepository.save(image);

            return ImageResponseDto.from(savedImage);
        }).toList();

        return ImageUploadResponseDto.from(type, imageResponseDtos);
    }

    @Transactional
    public void deleteImage(Long imageId) {
        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new IllegalArgumentException("Image not found with id: " + imageId));

        // S3에서 이미지 파일을 삭제한다
        s3Service.deleteImage(image.getUserImage().getS3Key());

        imageRepository.delete(image);
    }

}
