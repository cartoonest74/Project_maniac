package hello.market.service.admin;

import hello.market.dto.Admin;
import hello.market.dto.LoginCheck;
import hello.market.dto.ShopQna;

import java.util.List;
import java.util.Optional;

public interface AdminService {
    Optional<LoginCheck> adminLoginCheck(String uuid);
    void put_startLogin(int adminId, String uuid);
    void put_endLogin(int adminId);
    void put_answerQna(int qnaId, String content, int adminId);
    Admin get_inspectAdminInfo(Admin admin);

    Admin get_adminInfo(int adminId);
}
