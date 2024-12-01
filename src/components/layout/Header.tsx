import React from 'react';
import { Logo } from '../common/Logo';

export function Header() {
  return (
    <header className="w-full px-4">
      <div className="container mx-auto py-4 flex items-center justify-center">
        <Logo />
      </div>
    </header>
  );
}