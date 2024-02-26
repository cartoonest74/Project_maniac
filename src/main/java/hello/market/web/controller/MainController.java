package hello.market.web.controller;

import hello.market.dto.*;
import hello.market.service.artist.ArtistService;
import hello.market.service.artist.artistAlbum.ArtistAlbumService;
import hello.market.service.artist.artistImg.ArtistImgService;
import hello.market.service.artist.artistMember.ArtistMemberService;
import hello.market.service.artist.artistMv.ArtistMvService;
import hello.market.service.artist.artistSns.ArtistSnsService;
import hello.market.service.member.MemberService;
import hello.market.service.product.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class MainController {
    private Map<Integer, List<Product>> productPack = new HashMap<>();
    private List<Product> products = new ArrayList<>();

    private final ProductService productService;
    private final ArtistService artistService;
    private final ArtistSnsService artistSnsService;
    private final ArtistMvService artistMvService;
    private final ArtistMemberService artistMemberService;
    private final ArtistImgService artistImgService;
    private final ArtistAlbumService artistAlbumService;

    @GetMapping("/")
    private String home(Model model){
        int limit = 10;
        List<Artist> artistsList = artistService.artistSearchMaxShow(limit);
        model.addAttribute("artistsList",artistsList);
        return "/main/index";
    }

    @GetMapping("/main/{artist_id}")
    private String movePageMain(@PathVariable int artist_id, Model model) {
        // 해당 아티스트 검색 count
        artistService.put_searchCount(artist_id);

        List<Artist_sns> artistSns = artistSnsService.snsSelect(artist_id);
        Artist artist = artistService.artistSelect(artist_id);
        log.info("artist.getMain_img()= {}", artist.getMainImg());
        List<Artist_member> artistMembers = artistMemberService.memberSelect(artist_id);
        List<Product> products = productService.findProducts(artist_id, "album", 0);
        List<Product> goodsList = productService.findProducts(artist_id, "goods", 0);
        List<Product> product_limit3 = new ArrayList<>();
        List<Product> goods_limit3 = new ArrayList<>();
        int index = 1;
        int index_limit = 4;
        for (Product product : products) {
            if (product == null) break;

            product_limit3.add(product);

            if (index == index_limit) break;
            index++;
        }
        index = 1;
        for (Product goods : goodsList) {
            goods_limit3.add(goods);
            if (index == index_limit) break;
            index++;
        }

        model.addAttribute("productList", product_limit3);
        model.addAttribute("goodsList", goods_limit3);
        model.addAttribute("artist", artist);
        model.addAttribute("artistSnsList", artistSns);
        model.addAttribute("artistMemberList", artistMembers);
        model.addAttribute("artistId", artist_id);
        return "/main/main";
    }
}