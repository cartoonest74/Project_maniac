package hello.market.web.file;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.*;

@NoArgsConstructor(access = PUBLIC)
@AllArgsConstructor(access = PUBLIC)
@Data
public class UploadFile {
    private String originalFileName;
    private String saveFileName;
    private String savePath;
}
