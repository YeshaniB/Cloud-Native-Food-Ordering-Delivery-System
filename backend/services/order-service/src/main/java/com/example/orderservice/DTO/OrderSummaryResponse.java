package com.example.orderservice.DTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OrderSummaryResponse {

    private double totalPrice;
    private int orderCount;
    private double decreasedTotal;

    public OrderSummaryResponse(double totalPrice, int orderCount, double decreasedTotal) {
        this.totalPrice = totalPrice;
        this.orderCount = orderCount;
        this.decreasedTotal = decreasedTotal;
    }

}
