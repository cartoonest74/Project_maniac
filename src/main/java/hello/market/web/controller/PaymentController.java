package hello.market.web.controller;

import hello.market.dto.Portone;
import hello.market.service.order.OrderService;
import hello.market.web.session.LoginSessionManager;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/payments")
public class PaymentController {
    private final OrderService orderService;
    private final LoginSessionManager loginSessionManager;
    @ResponseBody
    @PutMapping("/complete")
    private String put_purchaseList(@ModelAttribute Portone portone, HttpServletRequest request) throws ParseException {
        Integer user_id = loginSessionManager.sessionUUIDcheck(request);
        String purchaseList = portone.getPurchaseList();
        JSONParser jsonParser = new JSONParser();
        Object parse = jsonParser.parse(purchaseList);
        JSONObject jsonObject = (JSONObject) parse;
        Set<String> keySet = jsonObject.keySet();
        int deliveryIndex = portone.getDeliveryIndex();
        log.info("deliveryIndex ={}",deliveryIndex);
        for (String key : keySet) {
            String[] arr_cartKey = key.split("x");
            String option_part = arr_cartKey[0];
            Integer productNo = Integer.parseInt(arr_cartKey[1]);
            Integer optionNo = Integer.parseInt(arr_cartKey[2]);
            log.info("optionNo = {}", optionNo);
            int optionQuantity =  Integer.parseInt(String.valueOf(jsonObject.get(key)));
            optionQuantity = optionQuantity * -1;
            log.info("optionQuantity = {}", optionQuantity);
            calc_productArtist(option_part, productNo, optionQuantity, optionNo);
        }
        
        orderService.add_purchaseList(user_id,portone);
        return "ok";
    }

    // 상품 수량 정리하기
    private String calc_productArtist(String option_part,int productNo,int optionQuantity,int optionNo){
        if(option_part.contains("s")){
            orderService.calc_singleQuantity(productNo,optionQuantity);
            return "";
        }
        orderService.calc_multiQuantity(productNo,optionNo,optionQuantity);
        return "";
    }
}

