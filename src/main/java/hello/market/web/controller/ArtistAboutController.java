package hello.market.web.controller;

import hello.market.dto.*;
import hello.market.service.artist.ArtistService;
import hello.market.service.artist.artistAlbum.ArtistAlbumService;
import hello.market.service.artist.artistImg.ArtistImgService;
import hello.market.service.artist.artistMember.ArtistMemberService;
import hello.market.service.artist.artistMv.ArtistMvService;
import hello.market.service.artist.artistSns.ArtistSnsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/about/{artistId}")
public class ArtistAboutController {

    private final ArtistService artistService;
    private final ArtistSnsService artistSnsService;
    private final ArtistMvService artistMvService;
    private final ArtistMemberService artistMemberService;
    private final ArtistImgService artistImgService;
    private final ArtistAlbumService artistAlbumService;

    @GetMapping("")
    private String moveAbout(@PathVariable int artistId, Model model) {
        List<Artist_member> artistMembers = artistMemberService.memberSelect(artistId);
        List<Artist_sns> artistSns = artistSnsService.snsSelect(artistId);
        Artist artist = artistService.artistSelect(artistId);

        model.addAttribute("artistMembers", artistMembers);
        model.addAttribute("artistSns", artistSns);
        model.addAttribute("artist_dto", artist);
        model.addAttribute("artistId", artistId);
        return "/about/about";
    }

    @GetMapping("/mv")
    private String get_mvPage(@PathVariable int artistId,Model model) {
        List<Artist_mv> mvList = artistMvService.mvSelect(artistId,0);
        model.addAttribute("mvList", mvList);
        return "/about/mv";
    }
    @GetMapping("/discography")
    private String get_discographyPage(@PathVariable int artistId,
                                       @RequestParam(value="page",required = false,defaultValue = "1")int page,
                                       Model model){
        List<Artist_album> artistAlbums = artistAlbumService.albumSelect(artistId, page);
        Integer total = artistAlbumService.albumTotal(artistId);
        model.addAttribute("total", total);
        model.addAttribute("artistAlbums", artistAlbums);
        return "/about/discography";
    }

    @GetMapping("/discography/{rowNum}")
    private String get_discographyInfo(@PathVariable int artistId,
                                       @PathVariable int rowNum,
                                       Model model){
        Artist_album artistAlbum = artistAlbumService.albumSelect_one(artistId, rowNum);
        String trackList = artistAlbum.getTrackList();
        for (String s : trackList) {
            log.info("trackList_name={}", s);
        }
        model.addAttribute("artistAlbum", artistAlbum);
        return "/about/discography_info";
    }
    @GetMapping("/gallery")
    private String get_galleryPage(@PathVariable int artistId,
                                   @RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                   Model model) {

        List<Artist_img> artistImgs = artistImgService.artistImgSelect(artistId, page-1);
        Integer total = artistImgService.artistImgTotal(artistId);
        model.addAttribute("artistImgs", artistImgs);
        model.addAttribute("total", total);
        return "/about/gallery";
    }
}
