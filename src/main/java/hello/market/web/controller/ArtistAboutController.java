package hello.market.web.controller;

import hello.market.dto.*;
import hello.market.service.artist.ArtistService;
import hello.market.service.artist.artistAlbum.ArtistAlbumService;
import hello.market.service.artist.artistImg.ArtistImgService;
import hello.market.service.artist.artistMember.ArtistMemberService;
import hello.market.service.artist.artistMv.ArtistMvService;
import hello.market.service.artist.artistSns.ArtistSnsService;
import hello.market.web.session.LoginSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/about")
public class ArtistAboutController {

    private final ArtistService artistService;
    private final ArtistSnsService artistSnsService;
    private final ArtistMvService artistMvService;
    private final ArtistMemberService artistMemberService;
    private final ArtistImgService artistImgService;
    private final ArtistAlbumService artistAlbumService;

    @GetMapping("/{artistId}")
    private String moveAbout(@PathVariable int artistId, Model model) {
        List<Artist_mv> artistMvs = artistMvService.mvSelect(artistId,0);
        List<Artist_album> artistAlbums = artistAlbumService.albumSelect(artistId, 0);
        List<Artist_img> artistImgs = artistImgService.artistImgSelect(artistId, 0);
        List<Artist_member> artistMembers = artistMemberService.memberSelect(artistId);
        List<Artist_sns> artistSns = artistSnsService.snsSelect(artistId);
        Artist artist = artistService.artistSelect(artistId);

        model.addAttribute("artistMvs", artistMvs);
        model.addAttribute("artistAlbums", artistAlbums);
        model.addAttribute("artistImgs", artistImgs);
        model.addAttribute("artistMembers", artistMembers);
        model.addAttribute("artistSns", artistSns);
        model.addAttribute("artist_dto", artist);
        model.addAttribute("artistId", artistId);
        return "/about/about";
    }
}
