package hello.market.repository.mybatis.notice;

import hello.market.dto.Notice;

import java.util.List;

public interface NoticeRepository {

    List<Notice> selectAll(int artistId, int limit);

    Notice select(int noticeId);

    Integer selectLength(int artistId);
}
