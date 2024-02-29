package hello.market.repository.mybatis.admin;

import hello.market.dto.Admin;
import hello.market.dto.LoginCheck;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MybatisAdminRepository implements AdminRepository{
    private final AdminMapper adminMapper;

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
