package hello.market.web.controller;

import hello.market.dto.Member;
import hello.market.service.member.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.util.ArrayList;
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
    @Test
    void arrayTest(){
        ArrayList<Integer> testa = new ArrayList<>(4);
        testa.add(1);
        testa.add(2);
        testa.add(3);
        testa.add(4);
        log.info("testa={}",testa.size());
        testa.add(5);
        testa.add(6);
        testa.add(7);
        log.info("testa={}",testa.size());
        log.info("testa={}",testa);
    }
}