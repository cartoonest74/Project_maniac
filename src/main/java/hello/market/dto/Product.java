package hello.market.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Product {
	private int id;
	private int artistId;
	private String title;
	private String category;
	private String price;
	private int totalQuantity;
	private String optionList;
	private String optionMent;

	private String mainImg;

	private String subImg;

	private String notice;
}
