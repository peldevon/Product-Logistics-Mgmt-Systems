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

// Sample shipments data
const shipments = [
  {
    id: 1,
    shipmentId: "SHP-1001",
    from: "Farm A",
    to: "Processor B",
    quantity: 1500,
    transporter: "Transporter X",
    dispatchDate: "2023-11-05",
    deliveryDate: "2023-11-07",
    status: "In Transit",
  },
  {
    id: 2,
    shipmentId: "SHP-1002",
    from: "Farm C",
    to: "Processor A",
    quantity: 2000,
    transporter: "Transporter Y",
    dispatchDate: "2023-11-06",
    deliveryDate: "2023-11-08",
    status: "Scheduled",
  },
  {
    id: 3,
    shipmentId: "SHP-1003",
    from: "Farm B",
    to: "Processor C",
    quantity: 1200,
    transporter: "Transporter Z",
    dispatchDate: "2023-11-04",
    deliveryDate: "2023-11-06",
    status: "Delivered",
  },
  {
    id: 4,
    shipmentId: "SHP-1004",
    from: "Farm D",
    to: "Processor B",
    quantity: 800,
    transporter: "Transporter X",
    dispatchDate: "2023-11-03",
    deliveryDate: "2023-11-05",
    status: "Delivered",
  },
  {
    id: 5,
    shipmentId: "SHP-1005",
    from: "Farm A",
    to: "Processor C",
    quantity: 1000,
    transporter: "Transporter Y",
    dispatchDate: "2023-11-07",
    deliveryDate: "2023-11-09",
    status: "Scheduled",
  },
]

// Filtered shipments
const activeShipments = shipments.filter((s) => s.status === "In Transit" || s.status === "Scheduled")
const completedShipments = shipments.filter((s) => s.status === "Delivered")

// Sample performance data
const performanceData = [
  { month: "Jun", "On-Time Delivery": 92, Delayed: 8 },
  { month: "Jul", "On-Time Delivery": 95, Delayed: 5 },
  { month: "Aug", "On-Time Delivery": 90, Delayed: 10 },
  { month: "Sep", "On-Time Delivery": 88, Delayed: 12 },
  { month: "Oct", "On-Time Delivery": 94, Delayed: 6 },
  { month: "Nov", "On-Time Delivery": 96, Delayed: 4 },
]

// Sample volume data
const volumeData = [
  { month: "Jun", "Volume (kg)": 15000 },
  { month: "Jul", "Volume (kg)": 17500 },
  { month: "Aug", "Volume (kg)": 16000 },
  { month: "Sep", "Volume (kg)": 18500 },
  { month: "Oct", "Volume (kg)": 21000 },
  { month: "Nov", "Volume (kg)": 22500 },
]

export default function AdminTransportationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [transporterFilter, setTransporterFilter] = useState("All")

  // Filter shipments based on search term, status, and transporter
  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.shipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.to.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || shipment.status === statusFilter
    const matchesTransporter = transporterFilter === "All" || shipment.transporter === transporterFilter
    return matchesSearch && matchesStatus && matchesTransporter
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Transportation Management</h1>
      <p className="text-muted-foreground">Monitor and manage transportation operations across the supply chain</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shipments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shipments.filter((s) => s.status === "In Transit").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shipments.filter((s) => s.status === "Scheduled").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shipments.filter((s) => s.status === "Delivered").length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Performance</CardTitle>
            <CardDescription>On-time delivery performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="On-Time Delivery" fill="#10b981" />
                  <Bar dataKey="Delayed" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Transportation Volume</CardTitle>
            <CardDescription>Monthly transportation volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={volumeData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Volume (kg)" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transportation Map</CardTitle>
          <CardDescription>Current shipments and routes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-gray-100 rounded-md flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-medium text-gray-500">Interactive Transportation Map</p>
              <p className="text-sm text-gray-400">Showing active shipments and transportation routes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="all">All Shipments</TabsTrigger>
          <TabsTrigger value="active">Active Shipments</TabsTrigger>
          <TabsTrigger value="completed">Completed Shipments</TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4 my-4">
          <div className="flex-1">
            <Input
              placeholder="Search by ID, origin, or destination..."
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
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
            <Select value={transporterFilter} onValueChange={setTransporterFilter}>
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Transporter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Transporters</SelectItem>
                <SelectItem value="Transporter X">Transporter X</SelectItem>
                <SelectItem value="Transporter Y">Transporter Y</SelectItem>
                <SelectItem value="Transporter Z">Transporter Z</SelectItem>
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
                    <TableHead>Shipment ID</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Quantity (kg)</TableHead>
                    <TableHead>Transporter</TableHead>
                    <TableHead>Dispatch Date</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.shipmentId}</TableCell>
                      <TableCell>{shipment.from}</TableCell>
                      <TableCell>{shipment.to}</TableCell>
                      <TableCell>{shipment.quantity}</TableCell>
                      <TableCell>{shipment.transporter}</TableCell>
                      <TableCell>{shipment.dispatchDate}</TableCell>
                      <TableCell>{shipment.deliveryDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            shipment.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : shipment.status === "In Transit"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {shipment.status}
                        </Badge>
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

        <TabsContent value="active">
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shipment ID</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Quantity (kg)</TableHead>
                    <TableHead>Transporter</TableHead>
                    <TableHead>Dispatch Date</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeShipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.shipmentId}</TableCell>
                      <TableCell>{shipment.from}</TableCell>
                      <TableCell>{shipment.to}</TableCell>
                      <TableCell>{shipment.quantity}</TableCell>
                      <TableCell>{shipment.transporter}</TableCell>
                      <TableCell>{shipment.dispatchDate}</TableCell>
                      <TableCell>{shipment.deliveryDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            shipment.status === "In Transit"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }
                        >
                          {shipment.status}
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

        <TabsContent value="completed">
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shipment ID</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Quantity (kg)</TableHead>
                    <TableHead>Transporter</TableHead>
                    <TableHead>Dispatch Date</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedShipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.shipmentId}</TableCell>
                      <TableCell>{shipment.from}</TableCell>
                      <TableCell>{shipment.to}</TableCell>
                      <TableCell>{shipment.quantity}</TableCell>
                      <TableCell>{shipment.transporter}</TableCell>
                      <TableCell>{shipment.dispatchDate}</TableCell>
                      <TableCell>{shipment.deliveryDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">{shipment.status}</Badge>
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

