package hello.market.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Artist_member {
    private int rowNum;
    private String memberSrc;
    private String artistName;
    private String enName;
    private String koName;
    private String birth;
    private String country;
}
