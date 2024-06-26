package hello.market.web.controller;

import hello.market.dto.*;
import hello.market.repository.mybatis.artist.ArtistSearchResetRepositoryImpl;
import hello.market.service.artist.ArtistService;
import hello.market.service.artist.artistAlbum.ArtistAlbumService;
import hello.market.service.artist.artistImg.ArtistImgService;
import hello.market.service.artist.artistMember.ArtistMemberService;
import hello.market.service.artist.artistMv.ArtistMvService;
import hello.market.service.artist.artistSns.ArtistSnsService;
import hello.market.service.like.LikeService;
import hello.market.service.member.MemberService;
import hello.market.service.product.ProductService;
import hello.market.web.session.LoginSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class MainController {

    private final ProductService productService;
    private final ArtistService artistService;
    private final ArtistSnsService artistSnsService;
    private final ArtistMemberService artistMemberService;
    private final ArtistSearchResetRepositoryImpl artistSearchResetRepository;
    private final LoginSessionManager loginSessionManager;
    private final LikeService likeService;

    @GetMapping("/")
    private String get_index(Model model){
        int limit = 10;
        List<Artist> artistsList = artistService.artistSearchMaxShow(limit);
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        String today = now.format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        boolean containDateKey = artistSearchResetRepository.contain_dateKey(today);
        log.info("containDateKey={}", containDateKey);
        if(! containDateKey){
            today = now.minusDays(1).format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
        }
        model.addAttribute("artistsList",artistsList);
        model.addAttribute("resetDate",today);
        return "/main/index";
    }

    @GetMapping("/main/{artist_id}")
    private String movePageMain(@PathVariable int artist_id,
                                Model model,
                                HttpServletRequest request) {
        Integer user_id = loginSessionManager.sessionUUIDcheck(request);
        JSONArray like_jsonArray = new JSONArray();

        if(user_id != 0){
            List<Integer> likes = likeService.my_likeList(user_id);
            for (Integer like : likes) {
                like_jsonArray.put(like);
            }
        }

        List<Artist_sns> artistSns = artistSnsService.snsSelect(artist_id);
        Artist artist = artistService.artistSelect(artist_id);
        log.info("artist.getMain_img()= {}", artist.getMainImg());
        List<Artist_member> artistMembers = artistMemberService.memberSelect(artist_id);
        List<Product> products = productService.findProducts(artist_id, "album", 0);
        List<Product> goodsList = productService.findProducts(artist_id, "goods", 0);
        List<Product> product_limit3 = new ArrayList<>();
        List<Product> goods_limit3 = new ArrayList<>();
        // view에 보여질 product data의 개수 index_limit 까지만 선별해 ArrayList에 따로 담기 
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
        model.addAttribute("likeList", like_jsonArray);
        return "/main/main";
    }
}