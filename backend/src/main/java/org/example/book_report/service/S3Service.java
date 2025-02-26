package org.example.book_report.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Client s3Client;

    @Value("${BUCKET_NAME}")
    private String bucketName;

    @Value("${REGION}")
    private String region;

    private static final String FILE_PATH_PREFIX = "images/";

    private static final String IMAGE_URL_FORMAT = "https://%s.s3.%s.amazonaws.com/%s";

    // 파일을 S3에 업로드하고 URL과 객체 키 반환
    public Map<String, String> uploadImage(MultipartFile image) {

        String s3Key = FILE_PATH_PREFIX + UUID.randomUUID() + "_" + image.getOriginalFilename();

        uploadImageToS3(image, s3Key);

        String imageUrl = String.format(IMAGE_URL_FORMAT, bucketName, region, s3Key);

        return Map.of(
                "imageUrl", imageUrl,
                "s3Key", s3Key,
                "originalFileName", image.getOriginalFilename()
        );
    }

    // 파일을 s3에 업로드
    private void uploadImageToS3(MultipartFile image, String s3Key) {
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(s3Key)
                    .contentType(image.getContentType())
                    .contentLength(image.getSize())
                    .build();

            s3Client.putObject(putObjectRequest,
                    RequestBody.fromInputStream(image.getInputStream(), image.getSize()));
        } catch (IOException e) {
            throw new RuntimeException("이미지 업로드 실패: " + e.getMessage());
        }
    }

    // s3 객체 삭제
    public void deleteImage(String s3Key) {
        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(s3Key)
                    .build();
            s3Client.deleteObject(deleteObjectRequest);
        } catch (Exception e) {
            throw new RuntimeException("이미지 삭제 실패: " + e.getMessage());
        }
    }

}
