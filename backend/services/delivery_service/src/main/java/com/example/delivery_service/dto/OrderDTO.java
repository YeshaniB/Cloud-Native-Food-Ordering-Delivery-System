package com.example.delivery_service.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderDTO {
    private String orderId;
    private String customerName;
    private String orderDate;
    private String customerAddress;
    private List<String> orderName;
    private List<String> quantity;
    private List<String> price;
    private String totalPrice;
    private String status;

}