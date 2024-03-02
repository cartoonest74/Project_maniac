package hello.market.repository.mybatis.admin;

import hello.market.dto.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

public interface AdminRepository {
    // review & qna
    List<Artist> select_adminSearchQna();
    List<Artist> select_adminSearchReview();
    Integer select_qnaLength(int artist_id, int answerCheck_start, int answerCheck_end);
    Integer select_reviewLength(int artist_id);
    List<ShopReview> select_adminReview(int artist_id, int page_limit);
    List<ShopQna> select_adminQna(int artist_id, int page_limit, int answerCheck_start, int answerCheck_end);

    Optional<LoginCheck> select_adminLoginCheck(String uuid);
    void update_startLogin(int adminId, String uuid);
    void update_endLogin(int adminId);
    void insert_qna(int qnaId, String content, int adminId);

    Admin select_inspectAdminInfo(Admin admin);

    Admin select_adminInfo(int adminId);
}
