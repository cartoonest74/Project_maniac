package hello.market.domain;

import jakarta.persistence.*;
import lombok.*;
import org.apache.ibatis.type.Alias;

import static jakarta.persistence.GenerationType.IDENTITY;

@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Data
@Alias("AnswerQnaEntity")
@Table(name = "answer_qna")
public class AnswerQna {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Integer id;

    @Column(name = "qna_id")
    private Integer qnaId;

    @Embedded
    private FieldContent fieldContent;

    @ManyToOne
    @JoinColumn(name = "shop_qna_id")
    private ShopQna shopQna;
}
