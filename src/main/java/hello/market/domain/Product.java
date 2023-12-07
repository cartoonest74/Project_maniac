package hello.market.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Data
@Alias("ProductEntity")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "product_id")
    private Integer userId;


    @Column(length = 20)
    private String price;

    private int quantity;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "longtext")
    private Map<String, Object> content;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "product")
    private List<ShopReview> shopReviewList = new ArrayList<>();

    @OneToMany(mappedBy = "product")
    private List<ShopQna> shopQnaList = new ArrayList<>();
}
