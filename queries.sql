-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT p.productname, c.categoryname
FROM Product as p
JOIN Category as c on p.categoryid = c.id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT o.id, s.companyname
FROM `Order` as o
LEFT JOIN Shipper as s on s.id = o.shipvia
WHERE o.OrderDate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT p.productname, od.quantity
FROM `Order` as o
LEFT JOIN OrderDetail as od on o.id = od.orderid
LEFT JOIN Product as p on p.id = od.productid
Where o.id = 10251;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

SELECT DISTINCT od.orderID, c.companyname, e.LastName
FROM OrderDetail as od
LEFT JOIN `Order` as o on o.id = od.orderid
LEFT JOIN Customer as c on c.id =  o.customerid
LEFT JOIN Employee as e on e.id = o.employeeid;