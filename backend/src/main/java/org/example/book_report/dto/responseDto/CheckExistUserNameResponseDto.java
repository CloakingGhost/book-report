package org.example.book_report.dto.responseDto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CheckExistUserNameResponseDto {

    private boolean used;

    public CheckExistUserNameResponseDto(boolean used) {
        this.used = used;
    }
}
