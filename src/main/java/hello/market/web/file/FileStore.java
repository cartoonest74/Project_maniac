package hello.market.web.file;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static hello.market.dto.UploadDirName.REVIEW_SHOP_IMG_DIR;

@Slf4j
@Component
public class FileStore {

    @Value("${file.dir}")
    private String fileDir;

    public String getFullPath(String dirName, String fileName) {
        String fileUrl = new StringBuilder()
                .append(fileDir)
                .append(dirName)
                .toString();

        File currentDirPath = new File(fileUrl);
        if (!currentDirPath.exists()) {
            currentDirPath.mkdir();
        }

        String fullPath = fileUrl.concat(fileName);

        return fullPath;
    }

    public List<UploadFile> storeFiles(String reviewShopDirName, List<MultipartFile> multipartFiles) throws IOException {
        List<UploadFile> resultUpload = new ArrayList<>();
        for (MultipartFile multipartFile : multipartFiles) {
            if(! multipartFile.isEmpty()){
                resultUpload.add(storeFile(reviewShopDirName, multipartFile));
            }
        }
        return resultUpload;
    }

    public UploadFile storeFile(String reviewShopDirName,MultipartFile multipartFile) throws IOException {
        if(multipartFile.isEmpty()){
            return null;
        }
        String originalFilename = multipartFile.getOriginalFilename();
        String saveFileName = createFileName(originalFilename);
        String fullPath = getFullPath(reviewShopDirName, saveFileName);

        int savePath_index = fullPath.indexOf(REVIEW_SHOP_IMG_DIR);
        String savePath = fullPath.substring(savePath_index - 4); // /img 4
        log.info("savePath = {}", savePath);

        multipartFile.transferTo(new File(fullPath));

        return new UploadFile(originalFilename, saveFileName, savePath);
    }

    private String createFileName(String originalFilename) {
        String ext = extractFileName(originalFilename);
        String uuid = UUID.randomUUID().toString();
        String createFn = new StringBuilder()
                .append(uuid)
                .append(".")
                .append(ext)
                .toString();

        return createFn;
    }

    private String extractFileName(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        String extFilename = originalFilename.substring(pos +1);
        return extFilename;
    }

}
