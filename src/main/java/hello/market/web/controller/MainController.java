package hello.market.web.controller;

import hello.market.dto.Artist;
import hello.market.dto.Member;
import hello.market.dto.Product;
import hello.market.service.artist.ArtistService;
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

    @GetMapping("/")
    private String home(Model model){
        int limit = 10;
        List<Artist> artistsList = artistService.artistSearchMaxShow(limit);
        model.addAttribute("artistsList",artistsList);
        return "/main/index";
    }

    @GetMapping("/main/{artist_id}")
    private String movePageMain(@PathVariable int artist_id, Model model) {
        List<Product> products = productService.findProducts(artist_id, "album", 0);
        model.addAttribute("productList", products);
        model.addAttribute("artistId", artist_id);
        return "/main/main";
    }
}