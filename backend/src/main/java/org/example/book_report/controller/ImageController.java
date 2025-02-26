package org.example.book_report.controller;

import lombok.RequiredArgsConstructor;
import org.example.book_report.common.ApiResponse;
import org.example.book_report.dto.request.ImageUploadRequestDto;
import org.example.book_report.dto.response.ImageUploadResponseDto;
import org.example.book_report.service.ImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/images")
public class ImageController {

    private final ImageService imageService;

    @PostMapping
    public ResponseEntity<ApiResponse<ImageUploadResponseDto>> uploadImage(@RequestPart ImageUploadRequestDto imageUploadRequestDto){
        return ResponseEntity.ok(ApiResponse.ok(
                "이미지가 정상적으로 업로드 되었습니다.",
                "CREATED",
                imageService.uploadImage(imageUploadRequestDto)
        ));
    }
}
