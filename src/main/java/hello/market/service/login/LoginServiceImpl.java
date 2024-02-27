package hello.market.service.login;

import hello.market.dto.LoginCheck;
import hello.market.dto.Member;
import hello.market.repository.mybatis.login.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

	private final LoginRepository mybatisLoginRepository;

	@Override
	public Member inspect_forgotPwd(Member member) {
		Member member1 = mybatisLoginRepository.select_forgotPwd(member);
		return member1;
	}

	@Override
	public Member inspect_forgotId(Member member) {
		Member member1 = mybatisLoginRepository.select_forgotId(member);
		return member1;
	}

	@Override
	public Member loginAction(String userId, String pwd) {
		Member member = mybatisLoginRepository.inspect(userId, pwd);
		return member;
	}

	@Override
	public Optional<LoginCheck> loginInCheck(String uuid) {
		Optional<LoginCheck> loginCheck = mybatisLoginRepository.select(uuid);
		return loginCheck;
	}

	@Override
	public void insert(int userNo, String uuid) {
		mybatisLoginRepository.delete(userNo);
		mybatisLoginRepository.insert(userNo, uuid);
	}

	@Override
	public void logOutAction(int userNo) {
		mybatisLoginRepository.delete(userNo);
	}
}
