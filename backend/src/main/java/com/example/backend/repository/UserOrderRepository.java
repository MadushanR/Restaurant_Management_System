package com.example.backend.repository;

import com.example.backend.model.UserOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserOrderRepository extends JpaRepository<UserOrder, Long> {
    List<UserOrder> findByUserName(String userName);
}
