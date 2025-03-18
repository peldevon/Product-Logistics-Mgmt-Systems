"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample orders data
const orders = [
  {
    id: 1,
    orderId: "ORD-1001",
    customer: "Customer A",
    items: [
      { product: "Cassava Flour", quantity: 500, unitPrice: 5 },
      { product: "Cassava Starch", quantity: 200, unitPrice: 7 },
    ],
    totalAmount: 3900,
    orderDate: "2023-11-01",
    deliveryDate: "2023-11-08",
    status: "Processing",
  },
  {
    id: 2,
    orderId: "ORD-1002",
    customer: "Customer B",
    items: [{ product: "Cassava Chips", quantity: 1000, unitPrice: 3 }],
    totalAmount: 3000,
    orderDate: "2023-10-28",
    deliveryDate: "2023-11-05",
    status: "Shipped",
  },
  {
    id: 3,
    orderId: "ORD-1003",
    customer: "Customer C",
    items: [
      { product: "Cassava Flour", quantity: 300, unitPrice: 5 },
      { product: "Cassava Starch", quantity: 100, unitPrice: 7 },
    ],
    totalAmount: 2200,
    orderDate: "2023-10-25",
    deliveryDate: "2023-11-02",
    status: "Delivered",
  },
  {
    id: 4,
    orderId: "ORD-1004",
    customer: "Customer D",
    items: [{ product: "Cassava Starch", quantity: 600, unitPrice: 7 }],
    totalAmount: 4200,
    orderDate: "2023-10-20",
    deliveryDate: "2023-10-28",
    status: "Delivered",
  },
  {
    id: 5,
    orderId: "ORD-1005",
    customer: "Customer A",
    items: [{ product: "Cassava Flour", quantity: 800, unitPrice: 5 }],
    totalAmount: 4000,
    orderDate: "2023-11-03",
    deliveryDate: "2023-11-10",
    status: "Pending",
  },
]

// Filter orders by status
const pendingOrders = orders.filter((o) => o.status === "Pending")
const processingOrders = orders.filter((o) => o.status === "Processing")
const shippedOrders = orders.filter((o) => o.status === "Shipped")
const deliveredOrders = orders.filter((o) => o.status === "Delivered")
const activeOrders = [...pendingOrders, ...processingOrders, ...shippedOrders]
const completedOrders = [...deliveredOrders]

// Monthly order data
const orderTrendsData = [
  { month: "Jun", orders: 42, amount: 25000 },
  { month: "Jul", orders: 48, amount: 28000 },
  { month: "Aug", orders: 45, amount: 27000 },
  { month: "Sep", orders: 52, amount: 31000 },
  { month: "Oct", orders: 58, amount: 35000 },
  { month: "Nov", orders: 61, amount: 38000 },
]

// Product sales data
const productSalesData = [
  { product: "Cassava Flour", sales: 12500 },
  { product: "Cassava Starch", sales: 18500 },
  { product: "Cassava Chips", sales: 8000 },
]

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [customerFilter, setCustomerFilter] = useState("All")

  // Filter orders based on search term, status, and customer
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || order.status === statusFilter
    const matchesCustomer = customerFilter === "All" || order.customer === customerFilter
    return matchesSearch && matchesStatus && matchesCustomer
  })

  // Calculate totals
  const totalOrders = orders.length
  const totalPending = pendingOrders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders Management</h1>
      <p className="text-muted-foreground">Monitor and manage customer orders across the system</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeOrders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Trends</CardTitle>
            <CardDescription>Monthly order volume and revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={orderTrendsData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#8884d8" name="Orders" />
                  <Line yAxisId="right" type="monotone" dataKey="amount" stroke="#82ca9d" name="Revenue ($)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Product Sales</CardTitle>
            <CardDescription>Sales breakdown by product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={productSalesData}
                  layout="vertical"
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="product" type="category" />
                  <Tooltip formatter={(value) => [`$${value}`, "Sales"]} />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" name="Sales ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4 my-4">
          <div className="flex-1">
            <Input
              placeholder="Search by order ID or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
            <Select value={customerFilter} onValueChange={setCustomerFilter}>
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Customers</SelectItem>
                <SelectItem value="Customer A">Customer A</SelectItem>
                <SelectItem value="Customer B">Customer B</SelectItem>
                <SelectItem value="Customer C">Customer C</SelectItem>
                <SelectItem value="Customer D">Customer D</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all">
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderId}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>
                        {order.items.map((item, index) => (
                          <div key={index} className="text-xs">
                            {item.product}: {item.quantity} units
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>${order.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.deliveryDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "Processing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-purple-100 text-purple-800"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Update
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderId}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>
                        {order.items.map((item, index) => (
                          <div key={index} className="text-xs">
                            {item.product}: {item.quantity} units
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>${order.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.deliveryDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-purple-100 text-purple-800">{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Process
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing">
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processingOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderId}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>
                        {order.items.map((item, index) => (
                          <div key={index} className="text-xs">
                            {item.product}: {item.quantity} units
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>${order.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.deliveryDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-100 text-yellow-800">{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Ship
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipped">
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shippedOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderId}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>
                        {order.items.map((item, index) => (
                          <div key={index} className="text-xs">
                            {item.product}: {item.quantity} units
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>${order.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.deliveryDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800">{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Mark Delivered
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivered">
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderId}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>
                        {order.items.map((item, index) => (
                          <div key={index} className="text-xs">
                            {item.product}: {item.quantity} units
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>${order.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>{order.orderDate}</TableCell>
                      <TableCell>{order.deliveryDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

