"use client"

import type React from "react"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { transportData } from "@/lib/chart-data"

// Sample transportation requests
const transportRequests = [
  {
    id: 1,
    requestDate: "2023-11-01",
    pickupDate: "2023-11-05",
    quantity: 500,
    destination: "Processor A",
    status: "Pending",
  },
  {
    id: 2,
    requestDate: "2023-10-28",
    pickupDate: "2023-11-02",
    quantity: 750,
    destination: "Processor B",
    status: "Approved",
  },
  {
    id: 3,
    requestDate: "2023-10-25",
    pickupDate: "2023-10-30",
    quantity: 300,
    destination: "Processor A",
    status: "In Transit",
  },
  {
    id: 4,
    requestDate: "2023-10-20",
    pickupDate: "2023-10-25",
    quantity: 900,
    destination: "Processor C",
    status: "Delivered",
  },
]

export default function FarmerTransportationPage() {
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [newRequest, setNewRequest] = useState({
    pickupDate: "",
    quantity: "",
    destination: "",
    notes: "",
  })

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send data to an API
    setShowRequestForm(false)
    // Reset form
    setNewRequest({
      pickupDate: "",
      quantity: "",
      destination: "",
      notes: "",
    })
    // Show success message
    alert("Transportation request submitted successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transportation Management</h1>
        <Button onClick={() => setShowRequestForm(!showRequestForm)}>
          {showRequestForm ? "Cancel" : "Request Transportation"}
        </Button>
      </div>

      {showRequestForm && (
        <Card>
          <CardHeader>
            <CardTitle>Request Transportation</CardTitle>
            <CardDescription>Fill in the details to request transportation for your cassava</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupDate">Pickup Date</Label>
                  <Input
                    id="pickupDate"
                    type="date"
                    value={newRequest.pickupDate}
                    onChange={(e) => setNewRequest({ ...newRequest, pickupDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (kg)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newRequest.quantity}
                    onChange={(e) => setNewRequest({ ...newRequest, quantity: e.target.value })}
                    placeholder="e.g., 500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Select
                    value={newRequest.destination}
                    onValueChange={(value) => setNewRequest({ ...newRequest, destination: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select processor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Processor A">Processor A</SelectItem>
                      <SelectItem value="Processor B">Processor B</SelectItem>
                      <SelectItem value="Processor C">Processor C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={newRequest.notes}
                    onChange={(e) => setNewRequest({ ...newRequest, notes: e.target.value })}
                    placeholder="Any special instructions or requirements"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Transportation Overview</CardTitle>
            <CardDescription>Weekly transportation activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={transportData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
                  <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Transportation Summary</CardTitle>
            <CardDescription>Status of your transportation requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Requests:</span>
                <span className="text-lg font-bold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Pending:</span>
                <span className="text-lg font-bold">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Approved:</span>
                <span className="text-lg font-bold">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">In Transit:</span>
                <span className="text-lg font-bold">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Delivered:</span>
                <span className="text-lg font-bold">6</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transportation Requests</CardTitle>
          <CardDescription>All your transportation requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request Date</TableHead>
                <TableHead>Pickup Date</TableHead>
                <TableHead>Quantity (kg)</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transportRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>{request.pickupDate}</TableCell>
                  <TableCell>{request.quantity}</TableCell>
                  <TableCell>{request.destination}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        request.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "Approved"
                            ? "bg-blue-100 text-blue-800"
                            : request.status === "In Transit"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-green-100 text-green-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      {request.status === "Pending" && (
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                          Cancel
                        </Button>
                      )}
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

