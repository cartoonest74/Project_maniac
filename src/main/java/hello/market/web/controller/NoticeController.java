package hello.market.web.controller;

import hello.market.dto.Notice;
import hello.market.service.notice.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    private final StringBuilder notice_menuTag = new StringBuilder();

    @ResponseBody
    @PostMapping("")
    private String post_noticeMenu(@RequestParam int page,@PathVariable Integer artist_id, @RequestParam Integer limit) {
        notice_menuTag.setLength(0);
        List<Notice> notices = noticeService.noticeMenuAllView(artist_id, limit);
        for (Notice notice : notices) {
            create_noticeMenuTag(notice);
        }
        String str_notice_menuTag = notice_menuTag.toString();
        Integer noticeLength = noticeService.noticeAllLength(artist_id);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("allCount", noticeLength);
        jsonObject.put("content", str_notice_menuTag);
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

    private void create_noticeMenuTag(Notice notice){
        int notice_artistId = notice.getArtistId();
        int notice_id = notice.getId();
        String notice_title = notice.getTitle();
        String notice_category = notice.getCategory();
        String notice_date = notice.getDate();
        notice_menuTag.append("<li class=\"notice_menu\">\n")
                            .append("<a href=\"/main/"+notice_artistId+"/notice/view?noticeId="+notice_id+"\">\n")
                                .append("<nav>"+notice_category+"</nav>\n")
                                .append("<nav>"+notice_title+"</nav>\n")
                                .append("<nav>"+notice_date+"</nav>\n")
                            .append("</a>\n")
                    .append("</li>\n");
    }
}
