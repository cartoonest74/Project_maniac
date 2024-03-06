package hello.market.service.member;


import hello.market.dto.Member;

import java.util.List;

public interface MemberService {
	void memberAdd(Member member);
	void memberDelete(int id);
	Member phone_dupleCheck(String phone);
	Member memberSelect(String userId);
	Member memberSelect(int id);
	List<Member> memberSelectAll();
}
