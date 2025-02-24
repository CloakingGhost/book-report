package org.example.book_report.exception;

public class ResourceExistException extends RuntimeException{
    public ResourceExistException(String message) {
        super(message);
    }

    public ResourceExistException() {

        super("이미 존재하는 username.");
    }
}
