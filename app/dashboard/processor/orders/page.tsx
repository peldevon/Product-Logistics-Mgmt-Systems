"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Sample orders data
const orders = [
  {
    id: 1,
    orderId: "ORD-2001",
    customer: "Customer A",
    product: "Cassava Flour",
    quantity: 500,
    orderDate: "2023-11-01",
    deliveryDate: "2023-11-10",
    status: "Processing",
  },
  {
    id: 2,
    orderId: "ORD-2002",
    customer: "Customer B",
    product: "Cassava Starch",
    quantity: 750,
    orderDate: "2023-10-28",
    deliveryDate: "2023-11-08",
    status: "Ready for Shipment",
  },
  {
    id: 3,
    orderId: "ORD-2003",
    customer: "Customer C",
    product: "Cassava Chips",
    quantity: 300,
    orderDate: "2023-10-25",
    deliveryDate: "2023-11-05",
    status: "Shipped",
  },
  {
    id: 4,
    orderId: "ORD-2004",
    customer: "Customer A",
    product: "Cassava Flour",
    quantity: 800,
    orderDate: "2023-10-20",
    deliveryDate: "2023-10-30",
    status: "Delivered",
  },
  {
    id: 5,
    orderId: "ORD-2005",
    customer: "Customer D",
    product: "Cassava Starch",
    quantity: 600,
    orderDate: "2023-10-18",
    deliveryDate: "2023-10-28",
    status: "Delivered",
  },
]

// Filter orders by status
const activeOrders = orders.filter((order) => ["Processing", "Ready for Shipment", "Shipped"].includes(order.status))
const completedOrders = orders.filter((order) => order.status === "Delivered")

export default function ProcessorOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
  }

  const handleUpdateStatus = (order: any, newStatus: string) => {
    // In a real app, this would update the status via an API call
    alert(`Updated order ${order.orderId} status to ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders Management</h1>
      <p className="text-muted-foreground">Manage and track customer orders for processed cassava products</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <CardDescription>All orders in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <CardDescription>Orders currently being processed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeOrders.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
            <CardDescription>Orders that have been delivered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <CardDescription>Orders awaiting processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="completed">Completed Orders</TabsTrigger>
          <TabsTrigger value="all">All Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>{order.deliveryDate}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                        View
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(order, "Shipped")}>
                        Update to Shipped
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>{order.deliveryDate}</TableCell>
                    <TableCell>
                      <Badge variant="success">{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="all">
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>{order.deliveryDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "Delivered"
                            ? "success"
                            : order.status === "Shipped"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
              <h2 className="text-lg font-bold mb-4">Order Details</h2>
              <p>Order ID: {selectedOrder.orderId}</p>
              <p>Customer: {selectedOrder.customer}</p>
              <p>Product: {selectedOrder.product}</p>
              <p>Quantity: {selectedOrder.quantity}</p>
              <p>Order Date: {selectedOrder.orderDate}</p>
              <p>Delivery Date: {selectedOrder.deliveryDate}</p>
              <p>Status: {selectedOrder.status}</p>
              <Button className="mt-4" onClick={() => setSelectedOrder(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

