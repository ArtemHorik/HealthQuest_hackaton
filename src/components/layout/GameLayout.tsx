import React from 'react';
import { Layout, Menu } from './Navigation';
import { Header } from './Header';
import { Character } from '../../types/game';

interface GameLayoutProps {
  character?: Character;
  children: React.ReactNode;
}

export function GameLayout({ character, children }: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-custom via-green-900 to-green-950 text-white">
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-4 flex-1">
          <Layout>
            <Menu character={character} />
            <main className="flex-1">
              {children}
            </main>
          </Layout>
        </div>
      </div>
    </div>
  );
}