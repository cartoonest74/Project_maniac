package hello.market.web.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import hello.market.dto.Notice;
import hello.market.service.notice.NoticeService;
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
@RequestMapping("/main/{artist_id}/notice")
public class NoticeController {

    private final NoticeService noticeService;

    @ResponseBody
    @PostMapping("")
    private String post_noticeMenu(@RequestParam int page,@PathVariable Integer artist_id, @RequestParam Integer limit) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        JSONArray jsonArray = new JSONArray();

        List<Notice> notices = noticeService.noticeMenuAllView(artist_id, limit);
        for (Notice notice : notices) {
            String writeValueAsString = objectMapper.writeValueAsString(notice);
            jsonArray.put(writeValueAsString);
        }
        Integer noticeLength = noticeService.noticeAllLength(artist_id);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("allCount", noticeLength);
        jsonObject.put("notice_list", jsonArray);
        return jsonObject.toString();
    }

    @GetMapping("")
    private String get_noticeMenu(@RequestParam int page, @PathVariable Integer artist_id, Model model) {
        page = page < 1 ? 1 : page;
        int limit = (page - 1) * 10;
        List<Notice> notices = noticeService.noticeMenuAllView(artist_id, limit);
        model.addAttribute("noticeMenuList", notices);
        model.addAttribute("artistId", artist_id);
        return "/notice/notice_menu";
    }

    @GetMapping("/view")
    private String noticeView(@PathVariable Integer artist_id, @RequestParam Integer noticeId, Model model){
        log.info("noticeId = {}", noticeId);
        Notice notice = noticeService.noticeView(noticeId);
        model.addAttribute("notice", notice);
        model.addAttribute("artistId", artist_id);
        return "/notice/notice_view";
    }
}
