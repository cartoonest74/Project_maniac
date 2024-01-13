package hello.market.web.controller;

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

        return "/about/about";
    }
}
