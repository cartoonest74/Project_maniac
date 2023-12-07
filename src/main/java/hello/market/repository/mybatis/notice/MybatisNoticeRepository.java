package hello.market.repository.mybatis.notice;

import hello.market.dto.Notice;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MybatisNoticeRepository implements  NoticeRepository{
    private final NoticeMapper noticeMapper;

    @Override
    public List<Notice> selectAll(int artistId, int limit) {
        List<Notice> notices = noticeMapper.selectAll(artistId, limit);
        return notices;
    }

    @Override
    public Notice select(int noticeId) {
        Notice notice = noticeMapper.select(noticeId);
        return notice;
    }

    @Override
    public Integer selectLength(int artistId) {
        Integer noticeLength = noticeMapper.selectLength(artistId);
        return noticeLength;
    }
}
