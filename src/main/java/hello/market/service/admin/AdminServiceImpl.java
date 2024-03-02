package hello.market.service.admin;

import hello.market.dto.*;
import hello.market.repository.mybatis.admin.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final AdminRepository adminRepository;

    @Override
    public List<Artist> get_adminSearchQna() {
        List<Artist> artists = adminRepository.select_adminSearchQna();
        return artists;
    }

    @Override
    public List<Artist> get_adminSearchReview() {
        List<Artist> artists = adminRepository.select_adminSearchReview();
        return artists;
    }

    @Override
    public Integer get_qnaLength(int artist_id, int answerCheck_start, int answerCheck_end) {
        Integer qnaLength = adminRepository.select_qnaLength(artist_id, answerCheck_start, answerCheck_end);
        return qnaLength;
    }

    @Override
    public Integer get_reviewLength(int artist_id) {
        Integer reviewLength = adminRepository.select_reviewLength(artist_id);
        return reviewLength;
    }

    @Override
    public List<ShopReview> get_adminReview(int artist_id, int page_limit) {
        List<ShopReview> shopReviews = adminRepository.select_adminReview(artist_id, page_limit);
        return shopReviews;
    }

    @Override
    public List<ShopQna> get_adminQna(int artist_id, int page_limit, int answerCheck_start, int answerCheck_end) {
        List<ShopQna> shopQnas = adminRepository.select_adminQna(artist_id, page_limit,answerCheck_start,answerCheck_end);
        return shopQnas;
    }

    @Override
    public Optional<LoginCheck> adminLoginCheck(String uuid) {
        Optional<LoginCheck> loginCheck = adminRepository.select_adminLoginCheck(uuid);
        return loginCheck;
    }

    @Override
    public void put_startLogin(int adminId, String uuid) {
        adminRepository.update_startLogin(adminId,uuid);
    }

    @Override
    public void put_endLogin(int adminId) {
        adminRepository.update_endLogin(adminId);
    }

    @Override
    public void put_answerQna(int qnaId, String content, int adminId) {
        adminRepository.insert_qna(qnaId, content, adminId);
    }

    @Override
    public Admin get_inspectAdminInfo(Admin admin) {
        Admin adminData = adminRepository.select_inspectAdminInfo(admin);
        return adminData;
    }

    @Override
    public Admin get_adminInfo(int adminNo) {
        Admin admin = adminRepository.select_adminInfo(adminNo);
        return admin;
    }
}
