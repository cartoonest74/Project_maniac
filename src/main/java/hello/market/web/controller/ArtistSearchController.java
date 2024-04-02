package hello.market.web.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hello.market.dto.Artist;
import hello.market.repository.mybatis.artist.ArtistSearchResetRepositoryImpl;
import hello.market.service.artist.ArtistService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ArtistSearchController {

    private final ArtistService artistService;
    private final ArtistSearchResetRepositoryImpl artistSearchResetRepository;

    @ResponseBody
    @PutMapping("/search-reset")
    private String put_searchCount(@RequestParam("today_date") String today_date) {
        Integer size = artistSearchResetRepository.get_size();
        if(size > 1){
            artistSearchResetRepository.clear_dateKey();
        }

        boolean containDateKey = artistSearchResetRepository.contain_dateKey(today_date);
        if (containDateKey) {
            return today_date;
        }
        artistSearchResetRepository.save_dateKey(today_date);
        artistService.put_resetSearchCount();
        return today_date;
    }

    @ResponseBody
    @PutMapping("/search-count")
    private String post_searchCount(@RequestParam("artist_id") int artist_id) {

        // 해당 아티스트 검색 count
        artistService.put_searchCount(artist_id);
        return "/main/" + artist_id;
    }

    @ResponseBody
    @PostMapping("/artist-search")
    private String artistSearch(@RequestParam String search_text) throws JsonProcessingException {
        JSONObject jsonObject = new JSONObject();
        ObjectMapper objectMapper = new ObjectMapper();
        JSONArray jsonArray = new JSONArray();

        List<Artist> artistSearch_list = artistService.artistSearchSelect(search_text);
        for (Artist artist : artistSearch_list) {
            String artistSearchString = objectMapper.writeValueAsString(artist);
            jsonArray.put(artistSearchString);
        }
        jsonObject.put("artistSearch_array", jsonArray);
//        String jsonToString = artistList_to_Json(artistSearch_list);
        return jsonObject.toString();
    }

//    private String artistList_to_Json(List<Artist> artistList) {
//        String artistId = "";
//        String artistImg = "";
//        String artistName = "";
//        JSONObject jsonObject = new JSONObject();
//        StringBuilder builder = new StringBuilder();
//
//        for (Artist artist : artistList) {
//            artistId = String.valueOf(artist.getId());
//            artistImg = String.valueOf(artist.getMainImg());
//            artistName = String.valueOf(artist.getName());
//            String builder_toString = builder.append(artistId)
//                    .append(",")
//                    .append(artistImg)
//                    .append(",")
//                    .append(artistName)
//                    .toString();
//            jsonObject.put(artistId, builder_toString);
//            log.info("bulider = {}",builder_toString);
//
//            builder.setLength(0);
//        }
//        log.info("jstonToString ==== {}",jsonObject.toString());
//        String jsonToString = jsonObject.toString();
//        return jsonToString;
//    }

    @ResponseBody
    @PostMapping("/artist-search-max")
    private String artistSearchMax() throws JsonProcessingException {
        JSONObject jsonObject = new JSONObject();
        ObjectMapper objectMapper = new ObjectMapper();
        JSONArray jsonArray = new JSONArray();

        int limit = 3;
        List<Artist> artistSearchMax = artistService.artistSearchMaxShow(limit);
        for (Artist searchMax : artistSearchMax) {
            String writeValueAsString = objectMapper.writeValueAsString(searchMax);
            jsonArray.put(writeValueAsString);
        }
//        String jsonToString = artistList_to_Json(artistSearchMax);
        jsonObject.put("artistSearchMax_array", jsonArray);
        return jsonObject.toString();
    }

    @ResponseBody
    @PostMapping("/artist/{artistId}")
    private String artistName_mapping(@PathVariable int artistId) {
        Artist artist = artistService.artistSelect(artistId);
        log.info("artist.getName() {}", artist.getName());
        return artist.getName();
    }
}
