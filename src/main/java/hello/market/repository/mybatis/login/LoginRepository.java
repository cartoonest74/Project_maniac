package hello.market.repository.mybatis.login;

import hello.market.dto.LoginCheck;
import hello.market.dto.Member;

import java.util.Optional;

public interface LoginRepository {
    void update_tempPwd(int userNo,String tempPwd);
    Member select_forgotPwd(Member member);
    Member select_forgotId(Member member);
    Member inspect(String userId, String pwd);

    Optional<LoginCheck> select(String uuid);

    void insert(int userNo, String uuid);

    void delete(int userNo);
}
