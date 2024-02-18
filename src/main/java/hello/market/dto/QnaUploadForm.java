package hello.market.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import static lombok.AccessLevel.PRIVATE;
import static lombok.AccessLevel.PUBLIC;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class QnaUploadForm {
    private int product_no;
    private String uuid;
    private String content;
    private int artistId;
}
