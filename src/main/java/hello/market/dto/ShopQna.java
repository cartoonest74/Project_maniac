package hello.market.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor
@AllArgsConstructor
@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ShopQna {
	private int id;
	private int artist_id;
	private int productNo;
	private int writer_num;
	private String title;
	private String userId;
	private String content;
	private String date;
	private Integer answerCheck;
	
	private int rootId;
	private String rootContent;
	private String rootDate;

}
