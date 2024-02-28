package hello.market.service.Mail;

import hello.market.dto.EmailConst;
import hello.market.repository.mybatis.auth.AuthRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Random;

import static hello.market.dto.EmailConst.*;


@Slf4j
@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    private final JavaMailSender mailSender;
    private final AuthRepository repository;

    public boolean mailSend(String userEmail, String type){
        boolean is_mailSend = false;
        switch(type) {
            case "pwd" -> is_mailSend = type_mailSend(TEMP_PWD_TITLE, userEmail, type);
            case "email" -> is_mailSend = type_mailSend(EMAILAUTH_CODE_TITLE, userEmail, type);
            default -> is_mailSend=false;
        }
        return is_mailSend;
    }

    private boolean type_mailSend(String mailTitle,String userEmail, String type) {
        String authNum = createCode();

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try{
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(userEmail);
            mimeMessageHelper.setSubject(mailTitle);
            mimeMessageHelper.setText(createMailContentForm(authNum, type), true);
            mailSender.send(mimeMessage);
        }catch(MessagingException e){
            return false;
        }
        repository.add(type, authNum);
        return true;
    }

    private String createMailContentForm(String authNum, String type) {
        String mailContentForm = "";
        switch (type) {
            case "pwd" -> {
                mailContentForm = new StringBuilder()
                        .append("<div style='margin:100px; font-weight:600; font-size:15px; text-align:center;'>")
                        .append("<p style='font-size:inherit;'>임시 비밀번호</p>")
                        .append("<p>")
                        .append("<span style='border:2px solid rgba(0,0,0,0.5); padding:5px 10px; font-size:2em;'>"+authNum+"</span>")
                        .append("</p>")
                        .append("</div>")
                        .toString();
            }
            case "email" -> {
                mailContentForm = new StringBuilder()
                        .append("<div style='margin:100px; font-weight:600; font-size:15px; text-align:center;'>")
                        .append("<p style='font-size:inherit;'>이메일 인증번호 입니다</p>")
                        .append("<p>")
                        .append("<span style='border:2px solid rgba(0,0,0,0.5); padding:5px 10px; font-size:2em;'>" + authNum + "</span>")
                        .append("</p>")
                        .append("</div>")
                        .toString();
            }
            default -> mailContentForm = "";
        }
        return mailContentForm;
    }

    public String createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for(int i = 0; i<8; i++){
            int index = random.nextInt(4);
            if(i==0){
                key.append((char) ((int) random.nextInt(4) + 35));
            }
            switch(index){
                // 대문자
                case 0 -> key.append((char) ((int) random.nextInt(26) + 97));
                // 소문자
                case 1 -> key.append((char) ((int) random.nextInt(26) + 65));
                default -> key.append(random.nextInt(9));
            }
        }
        return key.toString();
    }
}
