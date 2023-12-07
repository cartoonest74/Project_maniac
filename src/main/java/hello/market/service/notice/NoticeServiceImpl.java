package hello.market.service.notice;

import hello.market.dto.Notice;
import hello.market.repository.mybatis.notice.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository mybatisNoticeRepository;

    @Override
    public List<Notice> noticeMenuAllView(int artistId, int limit) {
        List<Notice> notices = mybatisNoticeRepository.selectAll(artistId, limit);
        return notices;
    }

    @Override
    public Notice noticeView(int noticeId) {
        Notice notice = mybatisNoticeRepository.select(noticeId);
        return notice;
    }

    @Override
    public Integer noticeAllLength(int artist_id) {
        Integer noticeLength = mybatisNoticeRepository.selectLength(artist_id);
        return noticeLength;
    }
}
