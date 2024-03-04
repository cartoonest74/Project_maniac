package hello.market.repository.mybatis.admin;

import hello.market.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MybatisAdminRepository implements AdminRepository{
    private final AdminMapper adminMapper;

    @Override
    public List<Artist> select_adminSearchQna() {
        List<Artist> artists = adminMapper.select_adminSearchQna();
        return artists;
    }

    @Override
    public List<Artist> select_adminSearchReview() {
        List<Artist> artists = adminMapper.select_adminSearchReview();
        return artists;
    }

    @Override
    public Integer select_qnaLength(int artist_id, int answerCheck_start, int answerCheck_end) {
        Integer qnaLength = adminMapper.select_qnaLength(artist_id, answerCheck_start, answerCheck_end);
        return qnaLength;
    }

    @Override
    public Integer select_reviewLength(int artist_id) {
        Integer reviewLength = adminMapper.select_reviewLength(artist_id);
        return reviewLength;
    }

    @Override
    public List<ShopReview> select_adminReview(int artist_id, int page_limit) {
        List<ShopReview> shopReviews = adminMapper.select_adminReview(artist_id, page_limit);
        return shopReviews;
    }

    @Override
    public List<ShopQna> select_adminQna(int artist_id, int page_limit, int answerCheck_start, int answerCheck_end) {
        List<ShopQna> shopQnas = adminMapper.select_adminQna(artist_id, page_limit, answerCheck_start, answerCheck_end);
        return shopQnas;
    }

    @Override
    public Optional<LoginCheck> select_adminLoginCheck(String uuid) {
        Optional<LoginCheck> loginCheck = adminMapper.select_adminLoginCheck(uuid);
        return loginCheck;
    }

    @Override
    public void update_startLogin(int adminId, String uuid) {
        adminMapper.update_startLogin(adminId,uuid);
    }

    @Override
    public void update_endLogin(int adminId) {
        adminMapper.update_endLogin(adminId);
    }

    @Override
    public void insert_qna(int qnaId, String content, int adminId) {
        adminMapper.insert_qna(qnaId, content, adminId);
    }

    @Override
    public Admin select_inspectAdminInfo(Admin admin) {
        Admin adminData = adminMapper.select_inspectAdminInfo(admin);
        return adminData;
    }

    @Override
    public Admin select_adminInfo(int adminId) {
        Admin admin = adminMapper.select_adminInfo(adminId);
        return admin;
    }
}
