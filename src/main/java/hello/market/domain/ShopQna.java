package hello.market.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.type.Alias;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Data
@Alias("ShopQnaEntity")
public class ShopQna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="shop_qna_id")
    private Integer id;

    @Column(name = "product_no")
    private Integer productNo;

    @Column(name = "user_id")
    private Integer userId;

    @Embedded
    private FieldContent fieldContent;

    @Column(name = "answer_check")
    private int answerCheck;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToMany(mappedBy = "shopQna")
    private List<AnswerQna> answerQnaList = new ArrayList<>();
}
