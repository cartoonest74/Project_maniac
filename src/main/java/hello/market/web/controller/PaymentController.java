package hello.market.web.controller;

import hello.market.dto.Portone;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/payments")
public class PaymentController {
    @ResponseBody
    @PostMapping("/complete")
    private String callback_receive(Portone entity) {
        String txId = entity.getTxId();
        String paymentId = entity.getPaymentId();
        log.info("txId = {},paymentId ={}", txId, paymentId);
        return "ok";
    }
}
