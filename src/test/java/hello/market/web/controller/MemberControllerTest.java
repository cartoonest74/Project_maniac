package hello.market.web.controller;

import hello.market.dto.Member;
import hello.market.service.member.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.StringUtils;


import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
    @Test
    void arrayTest(){
        String test = " z";
        Member member = null;
        log.info("member={}",member == null);
        log.info("member={}", Objects.isNull(member));
        log.info("test={}", test != null && test.equals(""));
        log.info("test={}", StringUtils.hasText(test));

    }
}