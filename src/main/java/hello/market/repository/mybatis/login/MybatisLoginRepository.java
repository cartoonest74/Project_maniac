package hello.market.repository.mybatis.login;

import hello.market.dto.LoginCheck;
import hello.market.dto.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MybatisLoginRepository implements LoginRepository {

    private final LoginMapper loginMapper;

    @Override
    public Member select_forgotPwd(Member member) {
        Member member1 = loginMapper.select_forgotPwd(member);
        return member1;
    }

    @Override
    public Member select_forgotId(Member member) {
        Member member1 = loginMapper.select_forgotId(member);
        return member1;
    }

    @Override
    public Member inspect(String userId, String pwd) {
        Member member = loginMapper.inspect(userId, pwd);
        return member;
    }

    @Override
    public Optional<LoginCheck> select(String uuid) {
        Optional<LoginCheck> loginCheck = loginMapper.select(uuid);
        return loginCheck;
    }

    @Override
    public void insert(int userNo, String uuid) {
        loginMapper.insert(userNo, uuid);
    }

    @Override
    public void delete(int userNo) {
        loginMapper.delete(userNo);
    }
}
