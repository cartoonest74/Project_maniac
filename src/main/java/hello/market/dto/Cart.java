package hello.market.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Cart {
    private int product_no;
    private String title;
    private String singleMultiple;
    private String price;
    private String mainImg;
    private String optionTitle;
    private String cartKey;
    private int maxQuantity;
    private int quantity;
    private int restQuantity;
}
