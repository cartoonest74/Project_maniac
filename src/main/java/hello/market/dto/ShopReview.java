package hello.market.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ShopReview {
	private int id;
	private int artist_id;
	private int productNo;
	private int userNo;
	private String title;
	private String userId;
	private String url;
	private String content;
	private String date;
}
