package hello.market.service.admin;

import hello.market.dto.Admin;
import hello.market.dto.LoginCheck;
import hello.market.repository.mybatis.admin.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final AdminRepository adminRepository;

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
