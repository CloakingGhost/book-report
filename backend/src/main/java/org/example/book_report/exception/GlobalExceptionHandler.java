package org.example.book_report.exception;

import org.example.book_report.common.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

//    @ExceptionHandler(커스텀_예외처리_클래스_이름.class)
//    public ResponseEntity<ApiResponse<Void>> handleGeneralException(Exception ex) {
//        return ResponseEntity
//                .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                //예시 1
//                .body(ApiResponse.error("서버 내부 오류가 발생했습니다.", "INTERNAL_SERVER_ERROR"));
//                //예시 2
//                .body(ApiResponse.error(ex.getMessage(), "INTERNAL_SERVER_ERROR"));
//    }

}