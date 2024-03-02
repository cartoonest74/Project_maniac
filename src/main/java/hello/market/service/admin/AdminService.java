package hello.market.service.admin;

import hello.market.dto.*;

import java.util.List;
import java.util.Optional;

public interface AdminService {
    // review & qna
    List<Artist> get_adminSearchQna();
    List<Artist> get_adminSearchReview();
    Integer get_qnaLength(int artist_id, int answerCheck_start, int answerCheck_end);
    Integer get_reviewLength(int artist_id);
    List<ShopReview> get_adminReview(int artist_id, int page_limit);
    List<ShopQna> get_adminQna(int artist_id, int page_limit,int answerCheck_start, int answerCheck_end);

    Optional<LoginCheck> adminLoginCheck(String uuid);
    void put_startLogin(int adminId, String uuid);
    void put_endLogin(int adminId);
    void put_answerQna(int qnaId, String content, int adminId);
    Admin get_inspectAdminInfo(Admin admin);

    Admin get_adminInfo(int adminId);
}
