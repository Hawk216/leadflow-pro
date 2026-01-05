import { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowLeftRight, 
  MoreHorizontal,
  ChevronDown,
  Eye,
  Mail,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Lead } from '@/types/lead';

const mockLeads: Lead[] = [
  { id: '1', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@techcorp.com', phone: '+1 555-0101', company: 'TechCorp Inc', industry: 'Technology', campaign: 'Q1 Tech Push', status: 'new', createdAt: new Date('2026-01-05') },
  { id: '2', firstName: 'Michael', lastName: 'Chen', email: 'mchen@finserve.io', phone: '+1 555-0102', company: 'FinServe', industry: 'Finance', campaign: 'Investment Drive', status: 'delivered', createdAt: new Date('2026-01-04'), deliveredAt: new Date('2026-01-05') },
  { id: '3', firstName: 'Emily', lastName: 'Davis', email: 'emily@healthcare.org', phone: '+1 555-0103', company: 'HealthFirst', industry: 'Healthcare', campaign: 'Medical Outreach', status: 'new', createdAt: new Date('2026-01-04') },
  { id: '4', firstName: 'James', lastName: 'Wilson', email: 'jwilson@retail.com', phone: '+1 555-0104', company: 'RetailMax', industry: 'Retail', campaign: 'Holiday Sales', status: 'exchanged', createdAt: new Date('2026-01-03'), exchangedAt: new Date('2026-01-04') },
  { id: '5', firstName: 'Lisa', lastName: 'Anderson', email: 'lisa@realestate.co', phone: '+1 555-0105', company: 'Prime Realty', industry: 'Real Estate', campaign: 'Property Showcase', status: 'delivered', createdAt: new Date('2026-01-02'), deliveredAt: new Date('2026-01-03') },
  { id: '6', firstName: 'Robert', lastName: 'Brown', email: 'rbrown@insurance.net', phone: '+1 555-0106', company: 'SafeGuard Insurance', industry: 'Insurance', campaign: 'New Year Coverage', status: 'new', createdAt: new Date('2026-01-05') },
  { id: '7', firstName: 'Jennifer', lastName: 'Martinez', email: 'jmartinez@auto.com', phone: '+1 555-0107', company: 'AutoWorld', industry: 'Automotive', campaign: 'Fleet Sales', status: 'new', createdAt: new Date('2026-01-05') },
  { id: '8', firstName: 'David', lastName: 'Taylor', email: 'dtaylor@edu.org', phone: '+1 555-0108', company: 'EduTech Solutions', industry: 'Education', campaign: 'EdTech 2026', status: 'delivered', createdAt: new Date('2026-01-01'), deliveredAt: new Date('2026-01-02') },
];

const statusStyles = {
  new: 'status-new',
  delivered: 'status-delivered',
  exchanged: 'status-exchanged',
};

export function LeadsTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const industries = [...new Set(mockLeads.map(lead => lead.industry))];
  
  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = 
      lead.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesIndustry = industryFilter === 'all' || lead.industry === industryFilter;
    
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  const toggleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(lead => lead.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedLeads(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all your leads
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </Button>
          <Button className="gap-2">
            <ArrowLeftRight className="h-4 w-4" />
            Bulk Exchange
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="exchanged">Exchanged</SelectItem>
          </SelectContent>
        </Select>
        <Select value={industryFilter} onValueChange={setIndustryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {industries.map(industry => (
              <SelectItem key={industry} value={industry}>{industry}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Selection Actions */}
      {selectedLeads.length > 0 && (
        <div className="flex items-center gap-4 p-3 rounded-lg bg-primary/5 border border-primary/20 animate-fade-in">
          <span className="text-sm font-medium">{selectedLeads.length} selected</span>
          <div className="flex items-center gap-2">
            <Button variant="exchange" size="sm" className="gap-1">
              <ArrowLeftRight className="h-3 w-3" />
              Exchange Selected
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedLeads([])}>
              Clear Selection
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="w-12 p-4">
                  <Checkbox 
                    checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Contact</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Company</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Industry</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                <th className="w-12 p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeads.map((lead, index) => (
                <tr 
                  key={lead.id} 
                  className="table-row-hover animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <td className="p-4">
                    <Checkbox 
                      checked={selectedLeads.includes(lead.id)}
                      onCheckedChange={() => toggleSelect(lead.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-primary">
                          {lead.firstName[0]}{lead.lastName[0]}
                        </span>
                      </div>
                      <span className="font-medium">{lead.firstName} {lead.lastName}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm">{lead.email}</p>
                      <p className="text-xs text-muted-foreground">{lead.phone}</p>
                    </div>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <span className="text-sm">{lead.company}</span>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{lead.industry}</span>
                  </td>
                  <td className="p-4">
                    <span className={cn("status-badge capitalize", statusStyles[lead.status])}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className="text-sm text-muted-foreground">
                      {lead.createdAt.toLocaleDateString()}
                    </span>
                  </td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Mail className="h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        {lead.status === 'new' && (
                          <DropdownMenuItem className="gap-2 text-success">
                            <ArrowLeftRight className="h-4 w-4" />
                            Exchange Lead
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Trash2 className="h-4 w-4" />
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

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {filteredLeads.length} of {mockLeads.length} leads
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
