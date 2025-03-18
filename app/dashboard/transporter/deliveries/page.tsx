"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Sample deliveries data
const deliveries = [
  {
    id: 1,
    deliveryId: "DEL-1001",
    pickupLocation: "Farm A",
    destination: "Processor B",
    quantity: 500,
    pickupDate: "2023-11-05",
    deliveryDate: "2023-11-05",
    status: "In Transit",
  },
  {
    id: 2,
    deliveryId: "DEL-1002",
    pickupLocation: "Farm C",
    destination: "Processor A",
    quantity: 750,
    pickupDate: "2023-11-06",
    deliveryDate: "2023-11-06",
    status: "Loading",
  },
  {
    id: 3,
    deliveryId: "DEL-1003",
    pickupLocation: "Farm B",
    destination: "Processor C",
    quantity: 1000,
    pickupDate: "2023-11-07",
    deliveryDate: "2023-11-07",
    status: "Scheduled",
  },
  {
    id: 4,
    deliveryId: "DEL-1004",
    pickupLocation: "Farm D",
    destination: "Processor B",
    quantity: 600,
    pickupDate: "2023-11-04",
    deliveryDate: "2023-11-04",
    status: "In Transit",
  },
  {
    id: 5,
    deliveryId: "DEL-1005",
    pickupLocation: "Farm A",
    destination: "Processor C",
    quantity: 450,
    pickupDate: "2023-11-08",
    deliveryDate: "2023-11-08",
    status: "Scheduled",
  },
  {
    id: 6,
    deliveryId: "DEL-0995",
    pickupLocation: "Farm B",
    destination: "Processor A",
    quantity: 800,
    pickupDate: "2023-11-01",
    deliveryDate: "2023-11-01",
    status: "Delivered",
  },
  {
    id: 7,
    deliveryId: "DEL-0996",
    pickupLocation: "Farm C",
    destination: "Processor B",
    quantity: 550,
    pickupDate: "2023-11-02",
    deliveryDate: "2023-11-02",
    status: "Delivered",
  },
]

// Filter deliveries by status
const activeDeliveries = deliveries.filter((d) => ["In Transit", "Loading", "Scheduled"].includes(d.status))
const completedDeliveries = deliveries.filter((d) => d.status === "Delivered")

export default function TransporterDeliveriesPage() {
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null)

  const handleViewDetails = (delivery: any) => {
    setSelectedDelivery(delivery)
  }

  const handleUpdateStatus = (delivery: any, newStatus: string) => {
    // In a real app, this would update the status via an API call
    alert(`Updated delivery ${delivery.deliveryId} status to ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Deliveries Management</h1>
      <p className="text-muted-foreground">Manage and track all your cassava deliveries</p>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Deliveries</TabsTrigger>
          <TabsTrigger value="completed">Completed Deliveries</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Deliveries</CardTitle>
              <CardDescription>Deliveries that are scheduled, loading, or in transit</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Delivery ID</TableHead>
                    <TableHead>Pickup</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Quantity (kg)</TableHead>
                    <TableHead>Pickup Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeDeliveries.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell className="font-medium">{delivery.deliveryId}</TableCell>
                      <TableCell>{delivery.pickupLocation}</TableCell>
                      <TableCell>{delivery.destination}</TableCell>
                      <TableCell>{delivery.quantity}</TableCell>
                      <TableCell>{delivery.pickupDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            delivery.status === "In Transit"
                              ? "bg-yellow-500"
                              : delivery.status === "Loading"
                                ? "bg-green-500"
                                : "bg-blue-500"
                          }
                        >
                          {delivery.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(delivery)}>
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(
                                delivery,
                                delivery.status === "Scheduled"
                                  ? "Loading"
                                  : delivery.status === "Loading"
                                    ? "In Transit"
                                    : "Delivered",
                              )
                            }
                          >
                            Update Status
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
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Deliveries</CardTitle>
              <CardDescription>Deliveries that have been successfully completed</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Delivery ID</TableHead>
                    <TableHead>Pickup</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Quantity (kg)</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedDeliveries.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell className="font-medium">{delivery.deliveryId}</TableCell>
                      <TableCell>{delivery.pickupLocation}</TableCell>
                      <TableCell>{delivery.destination}</TableCell>
                      <TableCell>{delivery.quantity}</TableCell>
                      <TableCell>{delivery.deliveryDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">{delivery.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(delivery)}>
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

      {selectedDelivery && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Delivery Details: {selectedDelivery.deliveryId}</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setSelectedDelivery(null)}>
                Close
              </Button>
            </div>
            <CardDescription>Detailed information about this delivery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Pickup Information</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Location:</span>
                    <span className="text-sm font-medium">{selectedDelivery.pickupLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Date:</span>
                    <span className="text-sm font-medium">{selectedDelivery.pickupDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Contact:</span>
                    <span className="text-sm font-medium">John Doe (Farm Manager)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Phone:</span>
                    <span className="text-sm font-medium">+1234567890</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Delivery Information</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Destination:</span>
                    <span className="text-sm font-medium">{selectedDelivery.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Expected Date:</span>
                    <span className="text-sm font-medium">{selectedDelivery.deliveryDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Contact:</span>
                    <span className="text-sm font-medium">Jane Smith (Processor Manager)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Phone:</span>
                    <span className="text-sm font-medium">+0987654321</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-muted-foreground">Cargo Information</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Quantity:</span>
                  <span className="text-sm font-medium">{selectedDelivery.quantity} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Quality Grade:</span>
                  <span className="text-sm font-medium">Grade A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Special Instructions:</span>
                  <span className="text-sm font-medium">Handle with care. Keep dry.</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground">Delivery Route</h3>
              <div className="mt-2 h-[200px] bg-gray-100 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Interactive Map</p>
                  <p className="text-xs text-gray-400">
                    Showing route from {selectedDelivery.pickupLocation} to {selectedDelivery.destination}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

