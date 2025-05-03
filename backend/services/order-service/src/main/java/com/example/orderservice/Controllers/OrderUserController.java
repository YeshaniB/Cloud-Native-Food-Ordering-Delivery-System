package com.example.orderservice.Controllers;
import com.example.orderservice.DTO.MenuItemDTO;
import com.example.orderservice.DTO.UserDTO;
import com.example.orderservice.Interfaces.StatusCountProjection;
import com.example.orderservice.Model.OrderDetails;
import com.example.orderservice.Model.PayOrders;
import com.example.orderservice.Repository.OrderDetailsRepo;
import com.example.orderservice.DTO.OrderSummaryResponse;
import com.example.orderservice.Repository.PayOrderDetailsRepo;
import com.example.orderservice.Services.RestaurantClient;
import com.example.orderservice.Services.UserClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.bson.types.Binary;


import java.util.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
//@RequestMapping("/api/order")
public class OrderUserController {

    @Autowired
    private OrderDetailsRepo orderDetailsRepo;

    @Autowired
    private RestaurantClient restaurantClient;
    // <-- Make sure you have this @Autowired

    @Autowired
    private PayOrderDetailsRepo payOrderDetailsRepo;

    @Autowired
    private UserClient userClient;

    @GetMapping("/api/menu")
    public List<MenuItemDTO> getRestaurants() {
        return restaurantClient.getResData();  // <-- Call properly
    }

    @GetMapping("api/menu/restaurant/{restaurantId}")
    public List<MenuItemDTO> getRestaurantsById(@PathVariable String restaurantId) {
        return restaurantClient.ResById(restaurantId);
    }


    @PostMapping("/addOrderDetails")
    public ResponseEntity<String> addOrder(
//            @RequestParam("customerId") String customerId,
            @RequestParam("orderDate") String orderDate,
            @RequestParam("customerName") String customerName,
            @RequestParam("customerAddress") String customerAddress,
            @RequestParam("contactNo") Integer contactNo,
            @RequestParam("orderName") String[] orderNames,
            @RequestParam("quantity") String[] quantities,
            @RequestParam("price") String[] prices,
            @RequestParam("totalPrice") String totalPrice,
            @RequestParam("image") MultipartFile imageFile
    ) throws Exception {

        OrderDetails order = new OrderDetails();
        String nextOrderId = generateNextOrderId();
        order.setOrderId(nextOrderId);
//        order.setCustomerId(customerId);
        order.setOrderDate(orderDate);
        order.setCustomerName(customerName);
        order.setCustomerAddress(customerAddress);
        order.setContactNo(contactNo);
        order.setOrderName(Arrays.asList(orderNames));
        order.setQuantity(Arrays.asList(quantities));
        order.setPrice(Arrays.asList(prices));
        order.setTotalPrice(totalPrice);

        // Save image as Binary
        order.setImage(new Binary(imageFile.getBytes()));

        orderDetailsRepo.save(order);

        return ResponseEntity.ok("Order with image saved successfully!");
    }






//-------------Set Data to Payment Function----------------
    @PostMapping("/payingOrders")
    public ResponseEntity<String> PaymentOrder(
//            @RequestParam("customerId") String customerId,
            @RequestParam("orderDate") String orderDate,
            @RequestParam("customerName") String customerName,
            @RequestParam("customerAddress") String customerAddress,
            @RequestParam("contactNo") Integer contactNo,
            @RequestParam("orderName") String[] orderNames,
            @RequestParam("quantity") String[] quantities,
            @RequestParam("price") String[] prices,
            @RequestParam("totalPrice") String totalPrice,
            @RequestParam("image") MultipartFile imageFile
    ) throws Exception {

        PayOrders pay = new PayOrders();
        String nextOrderId = generateNextOrderId();
        pay.setOrderId(nextOrderId);
//        pay.setCustomerId(customerId);
        pay.setOrderDate(orderDate);
        pay.setCustomerName(customerName);
        pay.setCustomerAddress(customerAddress);
        pay.setContactNo(contactNo);
        pay.setOrderName(Arrays.asList(orderNames));
        pay.setQuantity(Arrays.asList(quantities));
        pay.setPrice(Arrays.asList(prices));
        pay.setTotalPrice(totalPrice);

        // Save image as Binary
        pay.setImage(new Binary(imageFile.getBytes()));

        payOrderDetailsRepo.save(pay);

        return ResponseEntity.ok("Order with image saved successfully!");
    }

    @GetMapping("/getPaymentOrders")
    public List<PayOrders> getPayOrders() {
        return payOrderDetailsRepo.findAll();
    }

    @GetMapping("/getPayOrderById/{id}")
    public PayOrders getPayOrderById(@PathVariable String id) {
        return payOrderDetailsRepo.findById(id).orElse(null);
    }

    //------------------------------------------------------








    @GetMapping("/getOrderDetails/{id}")
    public OrderDetails getStudent(@PathVariable String id) {
        return orderDetailsRepo.findById(id).orElse(null);
    }


    @GetMapping("/getOrderDetails")
    public List<OrderDetails> getOrderDetails() {
        return orderDetailsRepo.findAll();
    }


    @GetMapping("/getPrepared")
    public ResponseEntity<List<OrderDetails>> getOrdersByStatus() {
        List<OrderDetails> preparedOrders = orderDetailsRepo.findByStatus("prepared");
        return ResponseEntity.ok(preparedOrders);
    }


    @GetMapping("/getTotalPrice")
    public OrderSummaryResponse getTotalPriceAndCount() {

        List<OrderDetails> orders = orderDetailsRepo.findAll(); // Retrieve all orders
        double total = 0;
        double decreasedTotal = 0;

        for (OrderDetails order : orders) {
            try {
                double orderTotal = Double.parseDouble(order.getTotalPrice());
                total += orderTotal;
                decreasedTotal += orderTotal * 0.8; // Decrease price by 20%
            } catch (NumberFormatException e) {
                System.err.println("Invalid total price for order " + order.getOrderId());
            }
        }

        int orderCount = orders.size();

        return new OrderSummaryResponse(total, orderCount, decreasedTotal);
    }



    @GetMapping("/status-count")
    public Map<String, Integer> getOrderStatusCounts() {
        List<StatusCountProjection> statusCounts = orderDetailsRepo.countOrdersByStatus();

        List<String> allStatuses = Arrays.asList("Order Pending", "Preparing", "Prepared", "On the way", "Delivered");
        Map<String, Integer> result = new LinkedHashMap<>();
        allStatuses.forEach(status -> result.put(status, 0));

        // Fill in real counts
        for (StatusCountProjection s : statusCounts) {
            result.put(s.getStatus(), s.getCount());
        }

        return result;
    }


    @GetMapping("/pendingOrders")
    public List<OrderDetails> getPendingOrders() {
        return orderDetailsRepo.findByStatus("Order Pending");
    }


    @PatchMapping("/updateDetails/{orderId}")
    public ResponseEntity<?> updateCustomerDetails(
            @PathVariable String orderId,
            @RequestBody OrderDetails updatedOrderDetails) {

        Optional<OrderDetails> optionalOrder = orderDetailsRepo.findById(orderId);

        if (optionalOrder.isPresent()) {
            OrderDetails existingOrder = optionalOrder.get();

            // Only update fields that are present in the request
            if (updatedOrderDetails.getCustomerName() != null && !updatedOrderDetails.getCustomerName().isEmpty()) {
                existingOrder.setCustomerName(updatedOrderDetails.getCustomerName());
            }

            if (updatedOrderDetails.getCustomerAddress() != null && !updatedOrderDetails.getCustomerAddress().isEmpty()) {
                existingOrder.setCustomerAddress(updatedOrderDetails.getCustomerAddress());
            }

            // Save the updated order
            OrderDetails savedOrder = orderDetailsRepo.save(existingOrder);

            return ResponseEntity.ok(savedOrder);
        } else {
            return ResponseEntity.notFound().build();
        }
    }







    @DeleteMapping("/orderDelete/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable String orderId) {
        Optional<OrderDetails> order = orderDetailsRepo.findById(orderId);
        if (order.isPresent()) {
            orderDetailsRepo.deleteById(orderId);
            return ResponseEntity.ok("Order with ID " + orderId + " deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }




    private String generateNextOrderId() {
        List<OrderDetails> allOrders = orderDetailsRepo.findAll();

        int max = 0;
        for (OrderDetails o : allOrders) {
            String id = o.getOrderId(); // example: ORD00042
            if (id != null && id.startsWith("ORD")) {
                try {
                    int number = Integer.parseInt(id.substring(3)); // get number part
                    if (number > max) max = number;
                } catch (NumberFormatException e) {
                    // ignore non-numeric suffixes
                }
            }
        }

        int next = max + 1;
        return String.format("ORD%05d", next);
    }

    @GetMapping("/api/restaurants")
    public List<UserDTO> getAllRestaurants() {
        return userClient.getRestaurantData();
    }


}

