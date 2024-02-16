package hello.market.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DeliveryStatus_manual {
    private int dsmId;
    private String dsmName;
    private int dsmCount;
}
