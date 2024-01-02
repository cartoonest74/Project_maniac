package hello.market.repository.mybatis.order;

public interface OrderCheckRepositoryImpl {
    String get_orderUUID(int user_id);

    void save_orderUUID(int user_id);

    void remove_orderUUID(int user_id);

}
