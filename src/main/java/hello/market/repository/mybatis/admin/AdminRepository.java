package hello.market.repository.mybatis.admin;

import hello.market.dto.Admin;
import hello.market.dto.LoginCheck;
import org.apache.ibatis.annotations.Param;

import java.util.Optional;

public interface AdminRepository {
    Optional<LoginCheck> select_adminLoginCheck(String uuid);
    void update_startLogin(int adminId, String uuid);
    void update_endLogin(int adminId);
    void insert_qna(int qnaId, String content, int adminId);

    Admin select_inspectAdminInfo(Admin admin);

    Admin select_adminInfo(int adminId);
}
