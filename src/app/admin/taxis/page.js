import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TaxiTable } from "../taxi-table"

export default function TaxiPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Taxi Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Taxi Data</CardTitle>
          <CardDescription>View and manage all taxi information</CardDescription>
        </CardHeader>
        <CardContent>
          <TaxiTable />
        </CardContent>
      </Card>
    </div>
  )
}