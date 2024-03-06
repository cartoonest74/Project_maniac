package hello.market.service.member;

import hello.market.dto.Member;
import hello.market.repository.mybatis.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	
	private final MemberRepository mybatisMemberRepository;
	
	@Override
	public void memberAdd(Member member) {
		mybatisMemberRepository.insert(member);
	}

	@Override
	public void memberDelete(int id) {
		mybatisMemberRepository.delete(id);
	}

	@Override
	public Member phone_dupleCheck(String phone) {
		Member member = mybatisMemberRepository.select_phone(phone);
		return member;
	}

	@Override
	public Member memberSelect(String userId) {
		String str = "string";
		Member user = mybatisMemberRepository.select(str,userId);
		return user;
	}
	
	@Override
	public Member memberSelect(int id) {
		Member user = mybatisMemberRepository.select(id);
		return user;
	}

	@Override
	public List<Member> memberSelectAll() {
		List<Member> members = mybatisMemberRepository.selectAll();
		return members;
	}

	
}
