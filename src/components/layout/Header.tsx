import { Bell, Search, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import lemonLogo from '@/assets/lemon-agency-logo.png';
import jakubProfile from '@/assets/jakub-profile.png';

interface HeaderProps {
  sidebarCollapsed?: boolean;
}

export function Header({ sidebarCollapsed }: HeaderProps) {
  const currentMonth = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-card/95 backdrop-blur-xl supports-[backdrop-filter]:bg-card/80 px-6 shadow-lg shadow-black/5">
      {/* Logo & Branding */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <img 
            src={lemonLogo} 
            alt="Lemon Agency" 
            className="h-10 object-contain drop-shadow-lg"
          />
        </div>
        
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block" />
        
        {/* Search */}
        <div className="relative w-72 hidden lg:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search leads, clients..."
            className="pl-9 bg-background/50 border-border/50 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all duration-200"
          />
        </div>
      </div>

      {/* Current Period & Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-primary">{currentMonth}</span>
        </div>

        <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-colors duration-200">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-gradient-to-br from-destructive to-destructive/80 text-[10px] font-bold text-destructive-foreground flex items-center justify-center shadow-lg shadow-destructive/30 animate-pulse">
            3
          </span>
        </Button>

        <div className="h-8 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 hover:bg-primary/10 pr-4 transition-all duration-200">
              <div className="relative">
                <img 
                  src={jakubProfile} 
                  alt="Jakub Zwolinski" 
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/30 shadow-lg shadow-primary/20"
                />
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-card shadow-lg" />
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-foreground">Jakub Zwolinski</p>
                <p className="text-xs text-muted-foreground">jakub@lemon.agency</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 border-border/50 bg-card/95 backdrop-blur-xl">
            <DropdownMenuLabel className="text-primary">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="focus:bg-primary/10 focus:text-primary">Profile</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-primary/10 focus:text-primary">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
