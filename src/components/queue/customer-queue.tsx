import React, { useState, useEffect } from 'react';
import { FileText } from "lucide-react";

// Ícone de usuários (restaurado para a versão original)
const Users = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

// Interfaces para os dados do cliente e da fila
interface Customer {
  id: string;
  code: string;
  name: string;
  status: 'active' | 'pending' | 'completed';
  score?: number;
  isUrgent?: boolean;
  queuedSince: number;
}

interface CustomerQueueProps {
  customers: Customer[];
  selectedCustomerId: string;
  onSelectCustomer: (id: string) => void;
}

// Interface para os logs de alteração
interface LogEntry {
  id: string;
  customerId: string;
  customerName: string;
  timestamp: number;
  description: string;
}

const formatWaitingTime = (timestamp: number) => {
  const now = Date.now();
  const diffInSeconds = Math.floor((now - timestamp) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays} dia${diffInDays > 1 ? 's' : ''}`;
  }
  if (diffInHours > 0) {
    const remainingMinutes = diffInMinutes % 60;
    return `${diffInHours}h ${remainingMinutes}min`;
  }
  return `${diffInMinutes} min`;
};

// Dados fictícios para o log de alterações (AJUSTADOS)
const mockLogs: LogEntry[] = [
  // Múltiplos logs para o mesmo cliente (Elisvalda)
  { id: "log1", customerId: "1", customerName: "ELISVALDA RODRIGUES", timestamp: Date.now() - 50000, description: "Telefone validado." },
  { id: "log2", customerId: "1", customerName: "ELISVALDA RODRIGUES", timestamp: Date.now() - 45000, description: "Renda atualizada para R$ 5.500,00." },
  { id: "log3", customerId: "1", customerName: "ELISVALDA RODRIGUES", timestamp: Date.now() - 40000, description: "Alteração salarial registrada." },
  
  // Múltiplos logs para o mesmo cliente (João)
  { id: "log4", customerId: "2", customerName: "JOÃO SILVA PEREIRA", timestamp: Date.now() - 30000, description: "Proposta de compra aprovada." },
  { id: "log5", customerId: "2", customerName: "JOÃO SILVA PEREIRA", timestamp: Date.now() - 25000, description: "Documento de identidade verificado." },

  // Logs para outros clientes
  { id: "log6", customerId: "3", customerName: "MARIA OLIVEIRA SANTOS", timestamp: Date.now() - 15000, description: "Análise de crédito concluída com 'Reprovado'." },
  { id: "log7", customerId: "4", customerName: "PEDRO BARBOSA", timestamp: Date.now() - 10000, description: "E-mail de verificação enviado." },
];

// Componente para exibir os logs de alterações
const CustomerLogs = ({ logs }: { logs: LogEntry[] }) => {
  const formatLogTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-3 mt-4">
      {/* CABEÇALHO DO LOG */}
      <div className="bg-gray-700 text-white flex items-center gap-4 px-5 py-5 shadow">
        <FileText className="h-6 w-6 text-white" aria-hidden="true" />
        <span className="font-semibold text-base md:text-lg">HISTÓRICO DE ALTERAÇÕES</span>
      </div>

      {/* Container de Logs com Scroll */}
      <div className="space-y-3 p-3 bg-white rounded-lg shadow-md overflow-y-auto max-h-[300px] border border-gray-200">
        {logs.length > 0 ? (
          logs.map(log => (
            <div key={log.id} className="p-3 bg-gray-50 rounded-md border border-gray-200 text-sm">
              <div className="flex justify-between items-center text-gray-500">
                <span className="font-medium text-xs">
                  {new Date(log.timestamp).toLocaleDateString('pt-BR')}
                </span>
                <span className="font-medium text-xs">
                  {formatLogTime(log.timestamp)}
                </span>
              </div>
              <div className="mt-1 font-semibold text-gray-800">
                Cliente: <span className="font-bold text-blue-600">{log.customerName}</span>
              </div>
              <p className="text-gray-600 mt-1">{log.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Nenhuma alteração registrada.</p>
        )}
      </div>
    </div>
  );
};

export const CustomerQueue = ({
  customers,
  selectedCustomerId,
  onSelectCustomer,
}: CustomerQueueProps) => {
  const [waitingTimes, setWaitingTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: Record<string, string> = {};
      customers.forEach(customer => {
        newTimes[customer.id] = formatWaitingTime(customer.queuedSince);
      });
      setWaitingTimes(newTimes);
    };

    updateTimes();
    const intervalId = setInterval(updateTimes, 60000);

    return () => clearInterval(intervalId);
  }, [customers]);

  const getStatusLabel = (status: 'active' | 'pending' | 'completed') => {
    switch (status) {
      case 'active':
        return 'Atribuído';
      case 'pending':
        return 'Aguardando';
      case 'completed':
        return 'Concluído';
      default:
        return '';
    }
  };

  const getStatusColor = (status: 'active' | 'pending' | 'completed') => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreTextColor = (score: number | undefined) => {
    if (!score) return '';

    if (score > 700) {
      return 'text-green-500';
    } else if (score > 500) {
      return 'text-yellow-500';
    } else {
      return 'text-red-500';
    }
  };

  return (
    <div className="space-y-3">
      {/* CABEÇALHO DA FILA */}
      <div className="bg-[#2a3749] text-white flex items-center gap-4 px-5 py-5 shadow">
        <Users className="h-6 w-6 text-white" aria-hidden="true" />
        <span className="font-semibold text-base md:text-lg">FILA DE ATENDIMENTO</span>
      </div>

      {/* Container da fila de clientes com scroll */}
      <div className="space-y-3 overflow-y-auto max-h-[500px]">
        {customers.map((customer) => (
          <button
            key={customer.id}
            onClick={() => onSelectCustomer(customer.id)}
            className={`
              w-full text-left p-4 rounded-xl shadow-sm
              transition-colors duration-200
              ${customer.id === selectedCustomerId ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}
              flex items-center justify-between
              border border-gray-200
            `}
          >
            <div className="flex-1 min-w-0 pr-4">
              <div className={`font-bold text-lg leading-tight truncate ${customer.id === selectedCustomerId ? 'text-white' : 'text-gray-800'}`}>
                {customer.name}
              </div>

              <div className={`text-sm mt-1 ${customer.id === selectedCustomerId ? 'text-gray-200' : 'text-gray-500'}`}>
                <span className="font-medium mr-2">{customer.code}</span>
                <span className="font-light">
                  Tempo de Espera:
                </span>
                <span className={`ml-1 font-semibold ${customer.id === selectedCustomerId ? 'text-white' : 'text-blue-600'}`}>
                  {waitingTimes[customer.id] || 'Calculando...'}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end flex-shrink-0 ml-4 space-y-1">
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(customer.status)}`}>
                {getStatusLabel(customer.status)}
              </span>
              {customer.score && (
                <div
                  className={`text-sm font-bold ${getScoreTextColor(customer.score)}`}
                >
                  Score: {customer.score}
                </div>
              )}
              {customer.isUrgent && (
                <div className="text-xs font-semibold text-red-500 mt-1">
                  Atendimento Urgente
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Ambiente para os logs de alteração */}
      <CustomerLogs logs={mockLogs} />

    </div>
  );
};