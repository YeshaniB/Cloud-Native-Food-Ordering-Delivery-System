package com.example.orderservice.Model;

import lombok.*;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Builder
@Getter
@Setter
@Document(collection = "payOrders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PayOrders {
    @Id
    private String orderId;
    //    private String customerId;
    private String orderDate;
    private String customerName;
    private String customerAddress;
    private String location;
    private Integer contactNo;
    private List<String> orderName;
    private List<String> Quantity;
    private List<String> price;
    private String totalPrice;

    @Builder.Default
    private String status = "Order Pending";
    private Binary image;
}
