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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Colors for the pie chart
const COLORS = ["#00C49F", "#FFBB28", "#FF8042"]

// Sample inventory data
const inventoryItems = [
  {
    id: 1,
    batch: "B-1001",
    supplier: "Farm A",
    quantity: 1500,
    quality: "Grade A",
    location: "Warehouse A",
    receivedDate: "2023-10-25",
    status: "Available",
  },
  {
    id: 2,
    batch: "B-1002",
    supplier: "Farm B",
    quantity: 2000,
    quality: "Grade B",
    location: "Warehouse A",
    receivedDate: "2023-10-28",
    status: "Available",
  },
  {
    id: 3,
    batch: "B-1003",
    supplier: "Farm C",
    quantity: 1200,
    quality: "Grade A",
    location: "Warehouse B",
    receivedDate: "2023-10-30",
    status: "In Processing",
  },
  {
    id: 4,
    batch: "B-1004",
    supplier: "Farm D",
    quantity: 800,
    quality: "Grade A",
    location: "Warehouse B",
    receivedDate: "2023-11-01",
    status: "Available",
  },
  {
    id: 5,
    batch: "B-1005",
    supplier: "Farm A",
    quantity: 1000,
    quality: "Grade B",
    location: "Warehouse C",
    receivedDate: "2023-11-02",
    status: "Available",
  },
  {
    id: 6,
    batch: "B-1006",
    supplier: "Farm E",
    quantity: 500,
    quality: "Grade C",
    location: "Warehouse A",
    receivedDate: "2023-11-03",
    status: "Available",
  },
]

// Quality distribution data
const qualityData = [
  { name: "Grade A", value: 3500 },
  { name: "Grade B", value: 3000 },
  { name: "Grade C", value: 500 },
]

// Inventory trends data
const inventoryTrends = [
  { month: "Jun", "Raw Materials": 5000, "Processed Products": 3000 },
  { month: "Jul", "Raw Materials": 5500, "Processed Products": 3200 },
  { month: "Aug", "Raw Materials": 6000, "Processed Products": 3500 },
  { month: "Sep", "Raw Materials": 6500, "Processed Products": 4000 },
  { month: "Oct", "Raw Materials": 7000, "Processed Products": 4500 },
  { month: "Nov", "Raw Materials": 7500, "Processed Products": 5000 },
]

export default function AdminInventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [qualityFilter, setQualityFilter] = useState("All")
  const [locationFilter, setLocationFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")

  // Filter inventory items based on search term and filters
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesQuality = qualityFilter === "All" || item.quality === qualityFilter
    const matchesLocation = locationFilter === "All" || item.location === locationFilter
    const matchesStatus = statusFilter === "All" || item.status === statusFilter
    return matchesSearch && matchesQuality && matchesLocation && matchesStatus
  })

  // Calculate total inventory
  const totalInventory = inventoryItems.reduce((sum, item) => sum + item.quantity, 0)
  const availableInventory = inventoryItems
    .filter((item) => item.status === "Available")
    .reduce((sum, item) => sum + item.quantity, 0)
  const inProcessingInventory = inventoryItems
    .filter((item) => item.status === "In Processing")
    .reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Inventory Management</h1>
      <p className="text-muted-foreground">Monitor and manage your inventory across all locations</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInventory.toLocaleString()} kg</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableInventory.toLocaleString()} kg</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProcessingInventory.toLocaleString()} kg</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Batch Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryItems.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inventory by Quality</CardTitle>
            <CardDescription>Distribution of inventory by quality grade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={qualityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${value} kg (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {qualityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inventory Trends</CardTitle>
            <CardDescription>Monthly inventory levels over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={inventoryTrends}
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
                  <Bar dataKey="Raw Materials" fill="#8884d8" />
                  <Bar dataKey="Processed Products" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>Detailed list of all inventory items</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by batch or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={qualityFilter} onValueChange={setQualityFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Qualities</SelectItem>
                  <SelectItem value="Grade A">Grade A</SelectItem>
                  <SelectItem value="Grade B">Grade B</SelectItem>
                  <SelectItem value="Grade C">Grade C</SelectItem>
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Locations</SelectItem>
                  <SelectItem value="Warehouse A">Warehouse A</SelectItem>
                  <SelectItem value="Warehouse B">Warehouse B</SelectItem>
                  <SelectItem value="Warehouse C">Warehouse C</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="In Processing">In Processing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch #</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Quantity (kg)</TableHead>
                  <TableHead>Quality</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Received Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No inventory items found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.batch}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            item.quality === "Grade A"
                              ? "bg-green-100 text-green-800"
                              : item.quality === "Grade B"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {item.quality}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{item.receivedDate}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === "Available" ? "default" : "secondary"}>{item.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Transfer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

