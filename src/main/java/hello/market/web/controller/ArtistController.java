package hello.market.web.controller;

import hello.market.dto.Artist;
import hello.market.service.artist.ArtistService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ArtistController {
    private Map<Integer, List<Artist>> artistPack = new HashMap<>();
    private List<Artist> artists = new ArrayList<>();

    private final ArtistService artistService;

    @ResponseBody
    @PostMapping("/artist-search")
    private String artistSearch(@RequestParam String search_text){
        List<Artist> artistSearch_list = artistService.artistSearchSelect(search_text);
        String jsonToString = artistList_to_Json(artistSearch_list);
        return jsonToString;
    }

    private String artistList_to_Json(List<Artist> artistList) {
        String artistId = "";
        String artistImg = "";
        String artistName = "";
        JSONObject jsonObject = new JSONObject();
        StringBuilder builder = new StringBuilder();

        for (Artist artist : artistList) {
            artistId = String.valueOf(artist.getId());
            artistImg = String.valueOf(artist.getImage());
            artistName = String.valueOf(artist.getName());
            String builder_toString = builder.append(artistId)
                    .append(",")
                    .append(artistImg)
                    .append(",")
                    .append(artistName)
                    .toString();
            jsonObject.put(artistId, builder_toString);
            log.info("bulider = {}",builder_toString);

            builder.setLength(0);
        }
        log.info("jstonToString ==== {}",jsonObject.toString());
        String jsonToString = jsonObject.toString();
        return jsonToString;
    }

    @ResponseBody
    @PostMapping("/artist-search-max")
    private String artistSearchMax(){
        int limit = 3;
        List<Artist> artistSearchMax = artistService.artistSearchMaxShow(limit);
        String jsonToString = artistList_to_Json(artistSearchMax);
        return jsonToString;
    }

    @ResponseBody
    @PostMapping("/artist/{artistId}")
    private String artistName_mapping(@PathVariable int artistId){
        Artist artist = artistService.artistSelect(artistId);
        log.info("artist.getName() {}",artist.getName());
        return artist.getName();
    }
}
