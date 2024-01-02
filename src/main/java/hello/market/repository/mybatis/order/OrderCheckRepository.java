package hello.market.repository.mybatis.order;

import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class OrderCheckRepository implements OrderCheckRepositoryImpl {
    private final Map<Integer, String> orderCheck_map = new ConcurrentHashMap<>();

    @Override
    public String get_orderUUID(int user_id) {
        String uuid = orderCheck_map.get(user_id);
        return uuid;
    }

    @Override
    public void save_orderUUID(int user_id) {
        String uuid = UUID.randomUUID().toString();
        orderCheck_map.put(user_id, uuid);
    }

    @Override
    public void remove_orderUUID(int user_id) {
        orderCheck_map.remove(user_id);
    }
}
