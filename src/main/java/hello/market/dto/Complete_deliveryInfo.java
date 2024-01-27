package hello.market.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Complete_deliveryInfo {
    private String firstName;
    private String lastName;
    private String mainAddr;
    private String detailAddr;
    private String postNum;
    private String tel;
    private String purchaseAmount;
    private String deliveryMsg;
    private String deliveryMethod;
    private String deliveryStatus;
}
