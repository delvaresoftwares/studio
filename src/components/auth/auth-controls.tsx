'use client';

import { useAuth } from '@/components/auth/auth-provider';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader2, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type AuthControlsProps = {
  tone?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md';
};

function initials(name: string | null, email: string): string {
  const source = name?.trim() || email.trim();
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

export function AuthControls({ tone = 'light', className, size = 'md' }: AuthControlsProps) {
  const { user, status, openAuth, signOut } = useAuth();
  const dark = tone === 'dark';

  const textColor = dark
    ? 'text-white hover:bg-white/10'
    : 'text-primary hover:bg-secondary/50';
  const rounded = size === 'sm' ? 'rounded-lg px-4 h-9' : 'rounded-lg px-6 h-10';
  const font = 'font-black text-[10px] uppercase tracking-[0.12em]';

  if (status === 'loading') {
    return (
      <Button variant="ghost" size="icon" className={textColor} disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  if (!user) {
    return (
      <Button
        variant="ghost"
        onClick={() => openAuth()}
        className={cn('gap-2', rounded, font, textColor, className)}
      >
        <User className="h-4 w-4" />
        Sign in
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'h-10 w-10 rounded-full p-0 border',
            dark ? 'border-white/20 text-white' : 'border-border text-foreground',
            className
          )}
          aria-label="Account"
        >
          <Avatar className="h-9 w-9">
            {user.picture ? <AvatarImage src={user.picture} alt="" /> : null}
            <AvatarFallback className={dark ? 'bg-white/15 text-white' : 'bg-secondary text-primary'}>
              {initials(user.name, user.email)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 rounded-xl">
        <DropdownMenuLabel className="font-black">
          {user.name || 'Delvare user'}
          <p className="mt-0.5 text-xs font-medium text-muted-foreground">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => void signOut()}>
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}