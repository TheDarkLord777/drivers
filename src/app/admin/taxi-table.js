'use client'

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// This is a mock data, replace it with actual data fetching logic
const mockTaxis = [
  { id: 1, driver: "John Doe", carModel: "Toyota Camry", licensePlate: "ABC123", status: "Available" },
  { id: 2, driver: "Jane Smith", carModel: "Honda Civic", licensePlate: "XYZ789", status: "On Trip" },
  { id: 3, driver: "Bob Johnson", carModel: "Ford Focus", licensePlate: "DEF456", status: "Offline" },
]

export function TaxiTable() {
  const [taxis, setTaxis] = useState(mockTaxis)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTaxis = taxis.filter(taxi =>
    taxi.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
    taxi.carModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    taxi.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search taxis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button>Add New Taxi</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Driver</TableHead>
            <TableHead>Car Model</TableHead>
            <TableHead>License Plate</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTaxis.map((taxi) => (
            <TableRow key={taxi.id}>
              <TableCell>{taxi.driver}</TableCell>
              <TableCell>{taxi.carModel}</TableCell>
              <TableCell>{taxi.licensePlate}</TableCell>
              <TableCell>{taxi.status}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2">Edit</Button>
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}