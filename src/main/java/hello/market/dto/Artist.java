package hello.market.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Artist {
    private int id;
    private String name;
    private String korean_name;
    private String debut;

    private String sns_name;
    private String sns_url;

    private String member_name;
    private String member_en_name;
    private String member_ko_name;
    private String member_date;
    private String member_country;

    private String mv_date;
    private String mv_name;
    private String mv_url;

    private String image;
}
