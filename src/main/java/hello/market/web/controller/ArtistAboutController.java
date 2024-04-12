package hello.market.web.controller;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
                                       @RequestParam(value="page",required = false,defaultValue = "1") int page,
                                       Model model){
//        log.info("page_var = {}", page);
//        page = page < 1 ? 1 : page;
//        int limit = (page - 1) * 10;
//
//        List<Artist_album> artistAlbums = artistAlbumService.albumSelect(artistId, limit);
//        Integer total = artistAlbumService.albumTotal(artistId);
//        model.addAttribute("total", total);
//        model.addAttribute("artistAlbums", artistAlbums);
        return "/about/discography";
    }
    @ResponseBody
    @PostMapping("/discography")
    private String post_discographyPage(@PathVariable int artistId,
                                        @RequestParam Integer limit) throws JsonProcessingException {
        List<Artist_album> artistAlbums = artistAlbumService.albumSelect(artistId, limit);
        ObjectMapper objectMapper = new ObjectMapper();
        JSONObject jsonObject = new JSONObject();
        JSONArray jsonArray = new JSONArray();

        for (Artist_album artistAlbum : artistAlbums) {
            String writeValueAsString = objectMapper.writeValueAsString(artistAlbum);
            jsonArray.put(writeValueAsString);
        }

        Integer total = artistAlbumService.albumTotal(artistId);

        jsonObject.put("allCount", total);
        jsonObject.put("about_menu", "discography");
        jsonObject.put("modelObject", jsonArray);

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
                                   @RequestParam(value="page",required = false,defaultValue = "1") int page,
                                   Model model) {
//        page = page < 1 ? 1 : page;
//        int limit = (page - 1) * 10;
//
//        List<Artist_img> artistImgs = artistImgService.artistImgSelect(artistId, limit);
//        Integer total = artistImgService.artistImgTotal(artistId);
//        model.addAttribute("artistImgs", artistImgs);
//        model.addAttribute("total", total);
        return "/about/gallery";
    }

    @ResponseBody
    @PostMapping("/gallery")
    private String post_galleryPage(@PathVariable int artistId,
                                    @RequestParam Integer limit) throws JsonProcessingException {
        List<Artist_img> artistImgs = artistImgService.artistImgSelect(artistId, limit);

        ObjectMapper objectMapper = new ObjectMapper();
        JSONArray jsonArray = new JSONArray();
        JSONObject jsonObject = new JSONObject();

        for (Artist_img artistImg : artistImgs) {
            String writeValueAsString = objectMapper.writeValueAsString(artistImg);
            jsonArray.put(writeValueAsString);
        }

        Integer total = artistImgService.artistImgTotal(artistId);

        jsonObject.put("allCount", total);
        jsonObject.put("about_menu", "gallery");
        jsonObject.put("modelObject", jsonArray);
        return jsonObject.toString();
    }

}
