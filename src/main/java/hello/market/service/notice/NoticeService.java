package hello.market.service.notice;

import hello.market.dto.Notice;

import java.util.List;

public interface NoticeService {
    List<Notice> noticeMenuAllView(int artistId, int limit);

    Notice noticeView(int noticeId);

    Integer noticeAllLength(int artist_id);
}
