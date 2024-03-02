package hello.market.repository.mybatis.admin;

import hello.market.dto.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface AdminMapper {
    // review & qna
    List<Artist> select_adminSearchQna();
    List<Artist> select_adminSearchReview();
    Integer select_qnaLength(@Param("artist_id") int artist_id, @Param("answerCheck_start") int answerCheck_start, @Param("answerCheck_end") int answerCheck_end);
    Integer select_reviewLength(@Param("artist_id") int artist_id);
    List<ShopReview> select_adminReview(@Param("artist_id") int artist_id, @Param("page_limit") int page_limit);
    List<ShopQna> select_adminQna(@Param("artist_id") int artist_id, @Param("page_limit") int page_limit,@Param("answerCheck_start") int answerCheck_start, @Param("answerCheck_end") int answerCheck_end);

    Optional<LoginCheck> select_adminLoginCheck(String uuid);
    void update_startLogin(@Param("adminId") int adminId, @Param("uuid") String uuid);
    void update_endLogin(@Param("adminId") int adminId);

    void insert_qna(@Param("qnaId") int qnaId,@Param("content") String content,@Param("adminId") int adminId);
    Admin select_inspectAdminInfo(@Param("Admin") Admin admin);

    Admin select_adminInfo(int adminId);
}
