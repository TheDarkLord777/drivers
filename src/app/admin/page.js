'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserTable } from "./user-table"
import { TaxiTable } from "./taxi-table"

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="taxis">Taxis</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage user data</CardDescription>
            </CardHeader>
            <CardContent>
              <UserTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="taxis">
          <Card>
            <CardHeader>
              <CardTitle>Taxi Management</CardTitle>
              <CardDescription>View and manage taxi data</CardDescription>
            </CardHeader>
            <CardContent>
              <TaxiTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}