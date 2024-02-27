package hello.market.service.login;


import hello.market.dto.LoginCheck;
import hello.market.dto.Member;

import java.util.Optional;

public interface LoginService {
	Member inspect_forgotPwd(Member member);
	Member inspect_forgotId(Member member);
	Member loginAction(String userId, String pwd);
	Optional<LoginCheck> loginInCheck(String uuid);

	void insert(int userNo, String uuid);
	void logOutAction(int userNo);
}
