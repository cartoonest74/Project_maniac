package hello.market.web.controller;

import hello.market.web.file.FileStore;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@Controller
@RequiredArgsConstructor
public class FileImgController {
    private final FileStore fileStore;
    @GetMapping("{fiename}")
    public void fileImgShow(@PathVariable String filePath){
        log.info("filePath = {} ",filePath);
    }
}
