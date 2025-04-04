package com.example.orderservice.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Builder
@Document
@Data
@NoArgsConstructor
@AllArgsConstructor

public class OrderDetails {

    @Id
    private String orderId;
    private String customerId;
    private String orderDate;
    private String customerName;
    private String customerAddress;
    private List<String> orderName;
    private List<String> Quantity;
    private List<String> price;

    @Builder.Default
    private String status = "Order Pending";

}
