package hello.market.repository.mybatis.notice;

import hello.market.dto.Notice;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface NoticeMapper {
    List<Notice> selectAll(@Param("artistId") int artistId, @Param("limit") int limit);

    Notice select(@Param("noticeId") int noticeId);
    Integer selectLength(@Param("artistId") int artistId);
}
