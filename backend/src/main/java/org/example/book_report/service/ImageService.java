package org.example.book_report.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
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

            Image image = Image.builder()
                    .type(type)
                    .imageUrl(imageUrl)
                    .build();

            Image savedImage = imageRepository.save(image);

            UserImage userImage = UserImage.builder()
                    .originalFileName(originalFileName)
                    .s3Key(s3Key)
                    .image(image)
                    .build();

            userImageRepository.save(userImage);

            return ImageResponseDto.from(savedImage);
        }).toList();

        return ImageUploadResponseDto.from(type, imageResponseDtos);
    }

    @Transactional
    public void deleteImage(Long imageId) {
        UserImage userImage = userImageRepository.findByImageId(imageId)
                .orElseThrow(() -> new IllegalArgumentException("Image not found with id: " + imageId));

        s3Service.deleteImage(userImage.getS3Key());

        userImageRepository.delete(userImage);
        imageRepository.delete(userImage.getImage());
    }

}
