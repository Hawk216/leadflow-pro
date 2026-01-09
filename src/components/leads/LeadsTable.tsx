import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowLeftRight, 
  MoreHorizontal,
  ChevronDown,
  Eye,
  Mail,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Users
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
  { id: '9', firstName: 'Amanda', lastName: 'White', email: 'awhite@media.com', phone: '+1 555-0109', company: 'MediaPro', industry: 'Media', campaign: 'Digital Ads', status: 'new', createdAt: new Date('2026-01-06') },
  { id: '10', firstName: 'Kevin', lastName: 'Lee', email: 'klee@logistics.net', phone: '+1 555-0110', company: 'FastTrack Logistics', industry: 'Logistics', campaign: 'Supply Chain', status: 'delivered', createdAt: new Date('2026-01-03'), deliveredAt: new Date('2026-01-04') },
  { id: '11', firstName: 'Rachel', lastName: 'Green', email: 'rgreen@fashion.co', phone: '+1 555-0111', company: 'Style House', industry: 'Fashion', campaign: 'Spring Collection', status: 'new', createdAt: new Date('2026-01-06') },
  { id: '12', firstName: 'Tom', lastName: 'Harris', email: 'tharris@construction.com', phone: '+1 555-0112', company: 'BuildRight', industry: 'Construction', campaign: 'Commercial Projects', status: 'exchanged', createdAt: new Date('2026-01-02'), exchangedAt: new Date('2026-01-03') },
];

const statusStyles = {
  new: 'status-new',
  delivered: 'status-delivered',
  exchanged: 'status-exchanged',
};

const ITEMS_PER_PAGE = 5;

export function LeadsTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const industries = [...new Set(mockLeads.map(lead => lead.industry))];
  
  const filteredLeads = useMemo(() => {
    return mockLeads.filter(lead => {
      const matchesSearch = 
        lead.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesIndustry = industryFilter === 'all' || lead.industry === industryFilter;
      
      return matchesSearch && matchesStatus && matchesIndustry;
    });
  }, [searchQuery, statusFilter, industryFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedLeads = filteredLeads.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = (setter: (val: string) => void) => (value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleSelectAll = () => {
    if (selectedLeads.length === paginatedLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(paginatedLeads.map(lead => lead.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedLeads(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header with gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 p-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/30">
              <Users className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                Leads
                <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage and track all your leads • {filteredLeads.length} total
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
            <Button className="gap-2 shadow-lg shadow-primary/30">
              <ArrowLeftRight className="h-4 w-4" />
              Bulk Exchange
            </Button>
          </div>
        </div>
      </div>

      {/* Filters with enhanced styling */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, company..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-9 border-border/60 focus:border-primary/50 bg-card/50"
          />
        </div>
        <Select value={statusFilter} onValueChange={handleFilterChange(setStatusFilter)}>
          <SelectTrigger className="w-[160px] border-border/60 bg-card/50">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="exchanged">Exchanged</SelectItem>
          </SelectContent>
        </Select>
        <Select value={industryFilter} onValueChange={handleFilterChange(setIndustryFilter)}>
          <SelectTrigger className="w-[180px] border-border/60 bg-card/50">
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
        <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-success/10 border border-primary/20 animate-fade-in backdrop-blur-sm">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">{selectedLeads.length}</span>
          </div>
          <span className="text-sm font-medium">leads selected</span>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="exchange" size="sm" className="gap-1 shadow-md">
              <ArrowLeftRight className="h-3 w-3" />
              Exchange Selected
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedLeads([])}>
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Table with enhanced styling */}
      <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden shadow-xl shadow-black/5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/60 bg-gradient-to-r from-muted/80 to-muted/40">
                <th className="w-12 p-4">
                  <Checkbox 
                    checked={selectedLeads.length === paginatedLeads.length && paginatedLeads.length > 0}
                    onCheckedChange={toggleSelectAll}
                    className="border-primary/40"
                  />
                </th>
                <th className="text-left p-4 text-sm font-semibold text-foreground/80">Name</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground/80">Contact</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground/80 hidden lg:table-cell">Company</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground/80 hidden md:table-cell">Industry</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground/80">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground/80 hidden sm:table-cell">Date</th>
                <th className="w-12 p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {paginatedLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center">
                        <Search className="h-8 w-8 text-muted-foreground/50" />
                      </div>
                      <p className="text-muted-foreground font-medium">No leads found</p>
                      <p className="text-sm text-muted-foreground/60">Try adjusting your filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedLeads.map((lead, index) => (
                  <tr 
                    key={lead.id} 
                    className="group hover:bg-primary/5 transition-colors duration-200 animate-fade-in"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <td className="p-4">
                      <Checkbox 
                        checked={selectedLeads.includes(lead.id)}
                        onCheckedChange={() => toggleSelect(lead.id)}
                        className="border-primary/40"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 border border-primary/20 group-hover:border-primary/40 transition-colors">
                          <span className="text-xs font-bold text-primary">
                            {lead.firstName[0]}{lead.lastName[0]}
                          </span>
                        </div>
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{lead.firstName} {lead.lastName}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm font-medium">{lead.email}</p>
                        <p className="text-xs text-muted-foreground">{lead.phone}</p>
                      </div>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className="text-sm text-foreground/80">{lead.company}</span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-xs px-2 py-1 rounded-md bg-muted/50 text-muted-foreground font-medium">{lead.industry}</span>
                    </td>
                    <td className="p-4">
                      <span className={cn("status-badge capitalize", statusStyles[lead.status])}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="text-sm text-muted-foreground">
                        {lead.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Eye className="h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Mail className="h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          {lead.status === 'new' && (
                            <DropdownMenuItem className="gap-2 text-success cursor-pointer">
                              <ArrowLeftRight className="h-4 w-4" />
                              Exchange Lead
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-destructive cursor-pointer">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Enhanced Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-border/60 bg-gradient-to-r from-muted/30 to-transparent gap-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{startIndex + 1}</span> to <span className="font-semibold text-foreground">{Math.min(endIndex, filteredLeads.length)}</span> of <span className="font-semibold text-foreground">{filteredLeads.length}</span> leads
          </p>
          
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="gap-1 border-border/60 hover:bg-primary/10 hover:border-primary/40"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
              
              <div className="flex items-center gap-1 mx-2">
                {getPageNumbers().map((page, index) => (
                  typeof page === 'number' ? (
                    <Button
                      key={index}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(page)}
                      className={cn(
                        "w-9 h-9 p-0 font-semibold",
                        currentPage === page 
                          ? "shadow-md shadow-primary/30" 
                          : "border-border/60 hover:bg-primary/10 hover:border-primary/40"
                      )}
                    >
                      {page}
                    </Button>
                  ) : (
                    <span key={index} className="px-2 text-muted-foreground">...</span>
                  )
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="gap-1 border-border/60 hover:bg-primary/10 hover:border-primary/40"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
