package hello.market.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class SmartEditor {
    private MultipartFile filedate;
    private String callback;
    private String callback_fn;
}
