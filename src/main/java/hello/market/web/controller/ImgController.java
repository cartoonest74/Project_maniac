package hello.market.web.controller;

import hello.market.web.file.FileStore;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.net.MalformedURLException;

import static hello.market.dto.UploadDirName.*;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/img")
public class ImgController {

    private final FileStore fileStore;

    @ResponseBody
    @GetMapping("/shopimg/review/{fileName}")
    private Resource shopImg_mapping(@PathVariable String fileName) throws MalformedURLException {
        String fullPath = fileStore.getFullPath(REVIEW_SHOP_IMG_DIR, fileName);
        log.info("fullPath = {}", fullPath);
        return new UrlResource("file:" + fullPath);
    }

    @ResponseBody
    @GetMapping("/icon/{fileName}")
    private Resource icon_mapping(@PathVariable String fileName) throws MalformedURLException {
        String fullPath = fileStore.getFullPath(iCON_IMG_DIR, fileName);
        log.info("fullPath = {}", fullPath);
        return new UrlResource("file:" + fullPath);
    }

    @ResponseBody
    @GetMapping("/web_logo/{fileName}")
    private Resource maniac_mapping(@PathVariable String fileName) throws MalformedURLException {
        String fullPath = fileStore.getFullPath(WebLogo_IMG_DIR, fileName);
        log.info("fullPath = {}", fullPath);
        return new UrlResource("file:" + fullPath);
    }

    @ResponseBody
    @GetMapping("/main_bg/{fileName}")
    private Resource mainBg_mapping(@PathVariable String fileName) throws MalformedURLException {
        String fullPath = fileStore.getFullPath(MainBg_IMG_DIR, fileName);
        log.info("fullPath = {}", fullPath);
        return new UrlResource("file:" + fullPath);
    }

    @ResponseBody
    @GetMapping("/artist/notice/{artistFolder}/{fileName}")
    private Resource artistNotice_mapping(@PathVariable String artistFolder, @PathVariable String fileName) throws MalformedURLException {
        String artist_directory = new StringBuilder()
                .append(Artist_Notice_IMG_DIR)
                .append("/")
                .append(artistFolder)
                .append("/")
                .toString();
        String fullPath = fileStore.getFullPath(artist_directory, fileName);
        log.info("fullPath = {}", fullPath);
        return new UrlResource("file:" + fullPath);
    }

    @ResponseBody
    @GetMapping("/paymentMethod/{fileName}")
    private Resource paymentMethod_mapping(@PathVariable String fileName) throws MalformedURLException {
        String fullPath = fileStore.getFullPath(PaymentMethod_IMG_DIR, fileName);
        log.info("fullPath = {}", fullPath);
        return new UrlResource("file:" + fullPath);
    }

}
