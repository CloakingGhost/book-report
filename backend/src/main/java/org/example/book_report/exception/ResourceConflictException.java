package org.example.book_report.exception;

public class ResourceConflictException extends RuntimeException{
    public ResourceConflictException(String message) {
        super(message);
    }

    public ResourceConflictException() {

        super("이미 존재하는 username.");
    }
}
