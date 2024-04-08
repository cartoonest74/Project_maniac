package hello.market.web.controller;

import hello.market.web.file.FileStore;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
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
        return new UrlResource("file:" +fullPath);
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

    @ResponseBody
    @GetMapping("/artist/info/{artistFolder}/main/{fileName}")
    private Resource artistMainImg_mapping(@PathVariable String artistFolder, @PathVariable String fileName) throws MalformedURLException {
        String artistMainImg_dir = new StringBuilder()
                .append(ArtistInfo_DIR)
                .append("/")
                .append(artistFolder)
                .append("/main/")
                .toString();
        String fullPath = fileStore.getFullPath(artistMainImg_dir, fileName);
        log.info("fullPath = {}", fullPath);
        return new UrlResource("file:" + fullPath);
    }

    @ResponseBody
    @GetMapping("/artist/info/{artistFolder}/{artistName}/{fileName}")
    private Resource memberImg_mapping(@PathVariable String artistFolder, @PathVariable String artistName, @PathVariable String fileName) throws MalformedURLException {
        String memberImg_dir = new StringBuilder()
                .append(ArtistInfo_DIR)
                .append("/")
                .append(artistFolder)
                .append("/")
                .append(artistName)
                .append("/")
                .toString();
        log.info("memberImg_dir={}", memberImg_dir);
        String fullPath = fileStore.getFullPath(memberImg_dir, fileName);
        log.info("fullPath = {}", fullPath);
        return new UrlResource("file:" + fullPath);
    }

    @ResponseBody
    @GetMapping("/artist/info/{artistFolder}/{fileName}")
    private Resource aboutGallery_mapping(@PathVariable String artistFolder, @PathVariable String fileName) throws MalformedURLException {
        String aboutGallery_dir = new StringBuilder()
                .append(ArtistInfo_DIR)
                .append("/")
                .append(artistFolder)
                .append("/")
                .toString();
        String fullPath = fileStore.getFullPath(aboutGallery_dir, fileName);
        return new UrlResource("file:" + fullPath);
    }

    @ResponseBody
    @GetMapping("/artist/info/{artistFolder}/{category}/{imgNumDir}/{fileName}")
    private Resource aboutDiscography_mapping(@PathVariable String artistFolder,@PathVariable String category, @PathVariable String imgNumDir, @PathVariable String fileName) throws MalformedURLException {
        String aboutDiscography_dir = new StringBuilder()
                .append(ArtistInfo_DIR)
                .append("/")
                .append(artistFolder)
                .append("/")
                .append(category)
                .append("/")
                .append(imgNumDir)
                .append("/")
                .toString();
        String fullPath = fileStore.getFullPath(aboutDiscography_dir, fileName);
        return new UrlResource("file:" + fullPath);
    }

    @ResponseBody
    @GetMapping("/artist/product/{artistFolder}/{category}/{fileName}")
    private Resource product_mapping(@PathVariable String artistFolder, @PathVariable String category, @PathVariable String fileName) throws MalformedURLException {
        String productImg_dir = new StringBuilder()
                .append(ArtistProduct_DIR)
                .append("/")
                .append(artistFolder)
                .append("/")
                .append(category)
                .append("/")
                .toString();
        String fullPath = fileStore.getFullPath(productImg_dir, fileName);
        return new UrlResource("file:" + fullPath);
    }
}
