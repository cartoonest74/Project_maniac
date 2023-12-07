package hello.market.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Embeddable
@Getter
public class FieldContent {

    @Column(length = 1500)
    private String content;

    @CreationTimestamp
    private LocalDateTime date;
}
