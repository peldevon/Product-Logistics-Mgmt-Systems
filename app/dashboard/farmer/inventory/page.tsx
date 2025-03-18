"use client"

import type React from "react"

import { useState } from "react"
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { qualityData } from "@/lib/chart-data"

// Colors for the pie chart
const COLORS = ["#00C49F", "#FFBB28", "#FF8042"]

// Sample inventory data
const inventoryItems = [
  { id: 1, batch: "B-1001", quantity: 500, quality: "Grade A", harvestDate: "2023-10-15", status: "Available" },
  { id: 2, batch: "B-1002", quantity: 750, quality: "Grade B", harvestDate: "2023-10-18", status: "Available" },
  { id: 3, batch: "B-1003", quantity: 300, quality: "Grade A", harvestDate: "2023-10-20", status: "Reserved" },
  { id: 4, batch: "B-1004", quantity: 900, quality: "Grade A", harvestDate: "2023-10-25", status: "Available" },
  { id: 5, batch: "B-1005", quantity: 450, quality: "Grade C", harvestDate: "2023-10-28", status: "Available" },
]

export default function FarmerInventoryPage() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState({
    batch: "",
    quantity: "",
    quality: "",
    harvestDate: "",
  })

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to an API
    setShowAddForm(false)
    // Reset form
    setNewItem({
      batch: "",
      quantity: "",
      quality: "",
      harvestDate: "",
    })
    // Show success message or update inventory
    alert("Inventory item added successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>{showAddForm ? "Cancel" : "Add New Item"}</Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Inventory Item</CardTitle>
            <CardDescription>Enter the details of the new cassava batch</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batch">Batch Number</Label>
                  <Input
                    id="batch"
                    value={newItem.batch}
                    onChange={(e) => setNewItem({ ...newItem, batch: e.target.value })}
                    placeholder="e.g., B-1006"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (kg)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    placeholder="e.g., 500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quality">Quality Grade</Label>
                  <Select value={newItem.quality} onValueChange={(value) => setNewItem({ ...newItem, quality: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade A">Grade A</SelectItem>
                      <SelectItem value="Grade B">Grade B</SelectItem>
                      <SelectItem value="Grade C">Grade C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="harvestDate">Harvest Date</Label>
                  <Input
                    id="harvestDate"
                    type="date"
                    value={newItem.harvestDate}
                    onChange={(e) => setNewItem({ ...newItem, harvestDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Add Inventory Item
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Overview</CardTitle>
            <CardDescription>Current cassava inventory by quality grade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={qualityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
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
            <CardTitle>Inventory Summary</CardTitle>
            <CardDescription>Quick overview of your current stock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Inventory:</span>
                <span className="text-lg font-bold">2,900 kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Grade A:</span>
                <span className="text-lg font-bold">1,700 kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Grade B:</span>
                <span className="text-lg font-bold">750 kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Grade C:</span>
                <span className="text-lg font-bold">450 kg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Reserved:</span>
                <span className="text-lg font-bold">300 kg</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>Detailed list of all cassava batches</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch #</TableHead>
                <TableHead>Quantity (kg)</TableHead>
                <TableHead>Quality</TableHead>
                <TableHead>Harvest Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.batch}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.quality}</TableCell>
                  <TableCell>{item.harvestDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Reserved"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

