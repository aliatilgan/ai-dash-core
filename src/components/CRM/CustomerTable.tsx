import { useState } from "react";
import { MoreVertical, Mail, Phone, TrendingUp, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "active" | "inactive" | "pending";
  value: string;
  lastContact: string;
}

const customers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Inc.",
    status: "active",
    value: "$125,000",
    lastContact: "2 days ago",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@innovate.io",
    phone: "+1 (555) 234-5678",
    company: "Innovate Solutions",
    status: "active",
    value: "$89,500",
    lastContact: "1 week ago",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@startup.co",
    phone: "+1 (555) 345-6789",
    company: "Startup Co.",
    status: "pending",
    value: "$45,000",
    lastContact: "3 days ago",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@enterprise.com",
    phone: "+1 (555) 456-7890",
    company: "Enterprise Ltd.",
    status: "active",
    value: "$210,000",
    lastContact: "Yesterday",
  },
  {
    id: "5",
    name: "Tom Brown",
    email: "tom@legacy.com",
    phone: "+1 (555) 567-8901",
    company: "Legacy Systems",
    status: "inactive",
    value: "$12,000",
    lastContact: "2 months ago",
  },
];

export const CustomerTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Customer["status"]) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      pending: "outline",
    } as const;

    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    );
  };

  return (
    <div className="rounded-lg border bg-card animate-fade-in">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Customer Directory</h3>
            <p className="text-sm text-muted-foreground">
              Manage and track your customer relationships
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            Add Customer
          </Button>
        </div>
        <input
          type="search"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-4 text-sm font-medium">Customer</th>
              <th className="text-left p-4 text-sm font-medium">Contact</th>
              <th className="text-left p-4 text-sm font-medium">Company</th>
              <th className="text-left p-4 text-sm font-medium">Status</th>
              <th className="text-left p-4 text-sm font-medium">Value</th>
              <th className="text-left p-4 text-sm font-medium">Last Contact</th>
              <th className="text-right p-4 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b last:border-0 hover:bg-muted/50 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">{customer.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm">{customer.company}</span>
                </td>
                <td className="p-4">{getStatusBadge(customer.status)}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="font-semibold">{customer.value}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">
                    {customer.lastContact}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCustomers.length === 0 && (
        <div className="p-8 text-center text-muted-foreground">
          No customers found matching your search.
        </div>
      )}
    </div>
  );
};
