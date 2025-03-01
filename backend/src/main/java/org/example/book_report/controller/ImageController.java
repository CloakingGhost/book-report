package org.example.book_report.controller;

import lombok.RequiredArgsConstructor;
import org.example.book_report.common.ApiResponse;
import org.example.book_report.dto.request.ImageUploadRequestDto;
import org.example.book_report.dto.response.ImageUploadResponseDto;
import org.example.book_report.entity.User;
import org.example.book_report.service.ImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/images")
public class ImageController {

    private final ImageService imageService;

    @PostMapping
    public ResponseEntity<ApiResponse<ImageUploadResponseDto>> uploadImage(
            @RequestPart("data") ImageUploadRequestDto imageUploadRequestDto,
            @RequestPart("images") List<MultipartFile> images,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(ApiResponse.ok(
                "이미지가 정상적으로 업로드 되었습니다.",
                "CREATED",
                imageService.uploadImage(imageUploadRequestDto, images, user)
        ));
    }

    @DeleteMapping("/{imageId}")
    public ResponseEntity<ApiResponse<Void>> deleteImage(@PathVariable Long imageId) {
        imageService.deleteImage(imageId);
        return ResponseEntity.ok(ApiResponse.ok(
                "이미지가 정상적으로 삭제 되었습니다.",
                "DELETED",
                null
        ));
    }
}
