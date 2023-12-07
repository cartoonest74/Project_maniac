package hello.market.web.controller;

import hello.market.dto.Member;
import hello.market.service.member.MemberService;
import hello.market.service.member.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@SpringBootTest
class MemberControllerTest {

    @Autowired
    MemberService memberService;

    @Test
    void memberTest(){
        Member member = memberService.memberSelect(1);
        assertThat(member.getUserId()).isEqualTo("gdragon");
    }
}