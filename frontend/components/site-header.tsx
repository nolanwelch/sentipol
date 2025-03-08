'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Activity } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <Link href="/" className="text-xl font-bold">
            Sentipol
          </Link>
        </div>
        <nav className="hidden md:flex md:gap-6">
          <Link href="/politicians" className="text-sm font-medium hover:text-primary">
            Politicians
          </Link>
          <Link href="/media" className="text-sm font-medium hover:text-primary">
            Media
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Dashboard
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            Log In
          </Button>
          <Button size="sm">Sign Up</Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}