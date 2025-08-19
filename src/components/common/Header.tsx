import React, { forwardRef } from 'react';
import { User, CheckCircle, Clock, XCircle } from 'lucide-react';

const mockUser = {
  name: "Hudson Hallen"
};

const mockDemandStats = {
  approved: 5,
  pending: 2,
  rejected: 1
};

interface StatProps {
  label: string;
  count: number;
  icon: React.ElementType;
  color: string;
}

const StatCard = ({ label, count, icon: Icon, color }: StatProps) => (
  <div className="flex items-center space-x-2 p-2 rounded-lg">
    <Icon className={`h-5 w-5 ${color}`} aria-hidden="true" />
    <span className={`text-sm font-medium ${color}`}>{label}</span>
    <span className={`text-lg font-bold ${color}`}>{count}</span>
  </div>
);

// Usamos forwardRef para permitir que o componente pai passe uma ref para o elemento <header>
export const Header = forwardRef<HTMLElement>((props, ref) => {
  return (
    <header ref={ref} className="fixed top-0 inset-x-0 bg-[#0A192F] shadow-lg z-50 text-[#F0F4F8]">
      <div className="max-w-[1920px] mx-auto px-4 py-1 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            BY S/A
          </h1>
        </div>

        <div className="flex items-center space-x-4 md:space-x-8 text-gray-300">
          <StatCard
            label="Aprovadas"
            count={mockDemandStats.approved}
            icon={CheckCircle}
            color="text-green-400"
          />
          <StatCard
            label="Pendentes"
            count={mockDemandStats.pending}
            icon={Clock}
            color="text-yellow-400"
          />
          <StatCard
            label="Rejeitadas"
            count={mockDemandStats.rejected}
            icon={XCircle}
            color="text-red-400"
          />
        </div>

        <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg transition-colors duration-200 hover:bg-white/10">
          <User className="h-6 w-6 text-gray-400" aria-hidden="true" />
          <span className="text-sm md:text-base font-semibold text-gray-200">
            {mockUser.name}
          </span>
        </div>
      </div>
    </header>
  );
});