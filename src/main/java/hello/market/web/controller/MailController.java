package hello.market.web.controller;

import hello.market.repository.mybatis.auth.AuthRepository;
import hello.market.service.Mail.MailService;
import hello.market.service.Mail.MailServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/mail")
public class MailController {
    private final MailService mailService;
    private final AuthRepository authRepository;

    @ResponseBody
    @PostMapping("/get-code")
    public String execMail(@RequestParam("userEmail") String userEmail, @RequestParam("type") String type) {
        boolean mail_send = mailService.mailSend(userEmail, type);
        if(mail_send){
            return "ok";
        }
        return "no";
    }

    @ResponseBody
    @PostMapping("/auth-code")
    public String authMailCode(@RequestParam("userCode") String userCode, @RequestParam("type") String type) {
        String authCode = authRepository.getAuthCode(type);
        if(! authCode.equals(userCode)){
            return "mismatch";
        }
        return "match";
    }
}
