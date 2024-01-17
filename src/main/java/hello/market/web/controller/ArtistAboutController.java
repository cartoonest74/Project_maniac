package hello.market.web.controller;

import com.fasterxml.jackson.core.JsonParser;
import hello.market.dto.*;
import hello.market.service.artist.ArtistService;
import hello.market.service.artist.artistAlbum.ArtistAlbumService;
import hello.market.service.artist.artistImg.ArtistImgService;
import hello.market.service.artist.artistMember.ArtistMemberService;
import hello.market.service.artist.artistMv.ArtistMvService;
import hello.market.service.artist.artistSns.ArtistSnsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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

    private final StringBuilder aboutSub_menuTag = new StringBuilder();

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
        page = page < 1 ? 1 : page;
        int limit = (page - 1) * 10;

        List<Artist_album> artistAlbums = artistAlbumService.albumSelect(artistId, limit);
        Integer total = artistAlbumService.albumTotal(artistId);
        model.addAttribute("total", total);
        model.addAttribute("artistAlbums", artistAlbums);
        return "/about/discography";
    }
    @ResponseBody
    @PostMapping("/discography")
    private String post_discographyPage(@PathVariable int artistId,
                                        @RequestParam Integer limit){
        aboutSub_menuTag.setLength(0);
        List<Artist_album> artistAlbums = artistAlbumService.albumSelect(artistId, limit);
        for (Artist_album artistAlbum : artistAlbums) {
            create_discographyMenuTag(artistAlbum, artistId);
        }

        String sub_menuTagString = aboutSub_menuTag.toString();
        Integer total = artistAlbumService.albumTotal(artistId);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("allCount", total);
        jsonObject.put("content", sub_menuTagString);
        return jsonObject.toString();
    }

    @GetMapping("/discography/{rowNum}")
    private String get_discographyInfo(@PathVariable int artistId,
                                       @PathVariable int rowNum,
                                       Model model){
        Artist_album artistAlbum = artistAlbumService.albumSelect_one(artistId, rowNum);
        String trackList = artistAlbum.getTrackList();
        JSONArray jsonArray = new JSONArray(trackList);

        model.addAttribute("artistAlbum", artistAlbum);
        model.addAttribute("jsonArray", jsonArray);
        return "/about/discography_info";
    }
    @GetMapping("/gallery")
    private String get_galleryPage(@PathVariable int artistId,
                                   @RequestParam(value = "page", required = false, defaultValue = "1") int page,
                                   Model model) {
        page = page < 1 ? 1 : page;
        int limit = (page - 1) * 10;

        List<Artist_img> artistImgs = artistImgService.artistImgSelect(artistId, limit);
        Integer total = artistImgService.artistImgTotal(artistId);
        model.addAttribute("artistImgs", artistImgs);
        model.addAttribute("total", total);
        return "/about/gallery";
    }

    @ResponseBody
    @PostMapping("/gallery")
    private String post_galleryPage(@PathVariable int artistId,
                                    @RequestParam Integer limit) {
        aboutSub_menuTag.setLength(0);
        List<Artist_img> artistImgs = artistImgService.artistImgSelect(artistId, limit);
        int index = 0;
        for (Artist_img artistImg : artistImgs) {
            create_galleryMenuTag(artistImg, index);
            index++;
        }

        String sub_menuTagString = aboutSub_menuTag.toString();
        Integer total = artistImgService.artistImgTotal(artistId);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("allCount", total);
        jsonObject.put("content", sub_menuTagString);
        return jsonObject.toString();
    }

    private void create_galleryMenuTag(Artist_img artistImg, int index){
        int artistImg_num = artistImg.getRowNum();
        String artistImg_src = artistImg.getArtistSrc();
        aboutSub_menuTag.append("<div class=\"discography_content\">\n")
                            .append("<button data-swiper-num=\""+index+"\" class=\"discography_img\" type=\"button\">\n")
                            .   append("<img data-swiper-num=\""+index+"\" src=\""+artistImg_src+"\" alt=\""+artistImg_num+"\">\n")
                            .append("</button>\n")
                        .append("</div>");
    }
    private void create_discographyMenuTag(Artist_album artistAlbum,int artistId){
        int rowNum = artistAlbum.getRowNum();
        String album_href = "/about/" + artistId + "/discography/" + rowNum;
        String albumSrc = artistAlbum.getAlbumSrc();
        String albumDate = artistAlbum.getAlbumDate();
        String albumName = artistAlbum.getAlbumName();
        aboutSub_menuTag.append("<div class=\"discography_content\">\n")
                            .append("<a class=\"discography_img\" href=\""+album_href+"\">\n")
                                .append("<img src=\""+albumSrc+"\" alt=\""+albumName+"\">\n")
                            .append("</a>\n")
                            .append("<nav>\n")
                                .append("<p class=\"content_name\">"+albumName+"</p>\n")
                                .append("<p class=\"content_date\">"+albumDate+"</p>\n")
                            .append("</nav>")
                        .append("</div>");
    }

}
