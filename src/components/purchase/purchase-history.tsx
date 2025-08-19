import React from 'react';
// Ícones Lucide React mockados para garantir a execução sem dependências externas.
// Em um ambiente de projeto real com lucide-react instalado, você usaria:
// import { History, CreditCard, Info } from "lucide-react"; 

// Mocks dos ícones Lucide React
const History = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="16" x="4" y="4" rx="2"/><path d="M12 12v4"/><circle cx="12" cy="12" r="7"/></svg>);
const CreditCard = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>);
const Info = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>);


// Mock do componente Card
// Usamos bg-card e text-card-foreground para padronização.
const Card = ({ children, className }) => {
  return (
    <div className={`rounded-lg shadow-sm bg-card text-card-foreground ${className}`}>
      {children}
    </div>
  );
};

// Mock do componente Button (assumindo shadcn/ui Button ou similar)
// Cores e tamanhos padronizados conforme a estética moderna e minimalista.
const Button = ({ children, className, variant, size, onClick, disabled }) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors duration-200";
  let variantClasses = "bg-primary text-primary-foreground hover:bg-primary/90"; // Padrão
  if (variant === "outline") {
    variantClasses = "border border-border text-foreground hover:bg-muted"; // Ajustado para cores neutras
  } else if (variant === "destructive") {
    variantClasses = "bg-destructive text-destructive-foreground hover:bg-destructive/90";
  } else if (variant === "success") { 
    variantClasses = "bg-success text-success-foreground hover:bg-success/90";
  }

  // LINHA PARA ALTERAR O TAMANHO DA FONTE DO BOTÃO
  // sizeClasses controla se o texto do botão é 'text-sm' ou 'text-base'
  const sizeClasses = size === "sm" ? "text-sm" : "text-base";

  return (
    <button disabled={disabled} className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={onClick}>
      {children}
    </button>
  );
};

// Componente reutilizável para pares chave-valor
// Ajustamos os tamanhos de fonte para uma hierarquia clara.
const KeyValue = ({ label, value, isZero = false, tooltip }) => (
  <div className="flex justify-between items-center text-sm">
    {/* LINHA PARA ALTERAR O TAMANHO DA FONTE DO RÓTULO (ex: QTD CONT.) */}
    <span className="text-muted-foreground uppercase text-xs" title={tooltip}>{label}</span> 
    {/* LINHA PARA ALTERAR O TAMANHO DA FONTE DO VALOR (ex: R$ 3.500,00) */}
    <span className={`font-bold text-xl ${isZero ? 'text-muted-foreground' : 'text-foreground'}`}>
      {value}
      {/* Ícone Info com tamanho ajustado para alinhar com o texto */}
      {isZero && <Info className="h-4 w-4 ml-1 inline text-muted-foreground" aria-hidden="true" title="Sem dados disponíveis" />}
    </span>
  </div>
);

// Interfaces para os dados do histórico de compras (mantida)
interface PurchaseHistoryData {
  cashPurchases: {
    quantity: number;
    averageTicket: number;
  };
  creditPurchases: {
    quantity: number;
    averageTicket: number;
    averageInstallmentValue: number;
    maxInstallmentValue: number;
    historyLimit: number;
    incomeLimit: number;
  };
  cardLimits: {
    availableCredit: number;
    availableCash: number;
  };
}

interface PurchaseHistoryProps {
  data: PurchaseHistoryData;
}

// Função para calcular idade (agora com a data correta)
const calculateAge = (birthDate: string): number => {
  const [day, month, year] = birthDate.split('/').map(Number);
  const birth = new Date(year, month - 1, day);
  const today = new Date(); // Corrigido para a data atual
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

// Componente PurchaseHistory (Histórico de Compras)
export function PurchaseHistory({ data }: PurchaseHistoryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  };

  return (
    <Card className="w-full overflow-hidden p-2 rounded-xl shadow-md">
      {/* Seção Histórico de Compras - Título principal */}
      <section role="region" aria-labelledby="history-title">
        {/* CORREÇÃO AQUI: Ajuste do tamanho da fonte e do ícone para manter a consistência com a seção de Limites de Crédito. */}
        <h2 id="history-title" className="flex items-center gap-4 bg-primary text-primary-foreground px-5 py-4 rounded-xl shadow">
      <History className="h-5 w-5 mr-2" aria-hidden="true" />
      HISTÓRICO DE COMPRAS
        </h2>
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border p-4">
          {/* Compras à Vista */}
          <Card className="flex-1 p-4 space-y-4 shadow-sm rounded-lg border border-border">
            {/* LINHA PARA ALTERAR O TAMANHO DA FONTE DO SUBTÍTULO "COMPRAS À VISTA" */}
            <div className="bg-secondary text-secondary-foreground font-semibold text-center py-2 rounded text-sm uppercase">
              COMPRAS À VISTA
            </div>
            <div className="space-y-3"> {/* Espaçamento interno ajustado */}
              <KeyValue 
                label="QTD CONT." 
                value={18}
                isZero={data.cashPurchases.quantity === 0}
                tooltip="Quantidade de Contratos à Vista"
              />
              <KeyValue 
                label="TKT MÉDIO" 
                value={formatCurrency(3500)}
                isZero={data.cashPurchases.averageTicket === 0}
                tooltip="Ticket Médio das Compras à Vista"
              />
            </div>
          </Card>

          {/* Compras a Prazo */}
          <Card className="flex-1 p-4 space-y-4 shadow-sm rounded-lg border border-border md:ml-4 mt-4 md:mt-0">
            {/* LINHA PARA ALTERAR O TAMANHO DA FONTE DO SUBTÍTULO "COMPRAS A PRAZO" */}
            <div className="bg-secondary text-secondary-foreground font-semibold text-center py-2 rounded text-sm uppercase">
              COMPRAS A PRAZO
            </div>
            <div className="space-y-3">
              <KeyValue 
                label="QTD CONT. LIQ" 
                value={8}
                isZero={data.creditPurchases.quantity === 0}
                tooltip="Quantidade de Contratos Liquidados"
              />
              <KeyValue 
                label="TKT MÉDIO CONT." 
                value={formatCurrency(800)}
                isZero={data.creditPurchases.averageTicket === 0}
                tooltip="Ticket Médio dos Contratos"
              />
              <KeyValue 
                label="MÉDIA PREST." 
                value={formatCurrency(455)}
                isZero={data.creditPurchases.averageInstallmentValue === 0}
                tooltip="Média das Prestações"
              />
              <KeyValue 
                label="MAIOR PREST." 
                value={formatCurrency(255)}
                isZero={data.creditPurchases.maxInstallmentValue === 0}
                tooltip="Maior Prestação Registrada"
              />
            </div>
          </Card>
        </div>
      </section> 
      {/* Seção de Limites de Crédito - Título principal */} 
      <section role="region" aria-labelledby="limits-title" className="mt-6">        
        <h2 id="limits-title" className="flex items-center gap-4 mb-2 bg-primary text-primary-foreground px-5 py-4 rounded-xl shadow">
          <CreditCard className="h-5 w-5 mr-2" aria-hidden="true" />
          LIMITES DE CRÉDITO
        </h2>
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border p-2">
          {/* Cartão Paraíba */}
          <Card className="flex-1 p-4 space-y-4 shadow-sm rounded-lg border border-border">
            {/* LINHA PARA ALTERAR O TAMANHO DA FONTE DO SUBTÍTULO "CARTÃO PARAÍBA" */}
            <div className="bg-secondary text-secondary-foreground font-semibold text-center py-2 rounded text-sm uppercase">
              CARTÃO PARAÍBA
            </div>
            <div className="space-y-3">
              <KeyValue 
                label="LIMITE A PRAZO" 
                value={formatCurrency(6900)}
                isZero={data.cardLimits.availableCredit === 0}
                tooltip="Limite Disponível para Compras a Prazo"
              />
              <KeyValue 
                label="LIMITE À VISTA" 
                value={formatCurrency(2400)}
                isZero={data.cardLimits.availableCash === 0}
                tooltip="Limite Disponível para Compras à Vista"
              />
            </div>
          </Card>

          {/* Crediário */}
          <Card className="flex-1 p-4 space-y-4 shadow-sm rounded-lg border border-border md:ml-4 mt-4 md:mt-0">
            {/* LINHA PARA ALTERAR O TAMANHO DA FONTE DO SUBTÍTULO "CREDIÁRIO" */}
            <div className="bg-secondary text-secondary-foreground font-semibold text-center py-2 rounded text-sm uppercase">
              CREDIÁRIO
            </div>
            <div className="space-y-3">
              <KeyValue 
                label="LIMITE PREST. PELO HISTÓRICO" 
                value={formatCurrency(455)}
                isZero={data.creditPurchases.historyLimit === 0}
                tooltip="Limite Baseado no Histórico de Compras"
              />
              <KeyValue 
                label="LIMITE PREST. PELA RENDA" 
                value={formatCurrency(337.50)}
                isZero={data.creditPurchases.incomeLimit === 0}
                tooltip="Limite Baseado na Renda Declarada"
              />
            </div>
          </Card>
        </div>
      </section>
    </Card>
  );
}

// Componente principal da aplicação (para demonstração)
export default function App() {
  // Dados de exemplo para o PurchaseHistory
  const samplePurchaseHistoryData = {
    cashPurchases: {
      quantity: 18,
      averageTicket: 3500,
    },
    creditPurchases: {
      quantity: 8,
      averageTicket: 800,
      averageInstallmentValue: 455,
      maxInstallmentValue: 255,
      historyLimit: 1500, // Aumentado
      incomeLimit: 12000, // Aumentado
    },
    cardLimits: {
      availableCredit: 9500, // Aumentado
      availableCash: 3200, // Aumentado
    },
  };

  return (
    // Definimos a fonte Inter como padrão para todo o app
    // e o background como bg-background para um visual limpo.
    <div className="p-6 bg-background min-h-screen font-sans">
      {/* É importante que as cores 'primary', 'secondary', 'destructive', 'success', 'warning', 'background', 'foreground', 'muted', 'muted-foreground', 'border', 'card', 'card-foreground'
          sejam configuradas no seu `tailwind.config.js` para que as classes funcionem corretamente e reflitam as cores desejadas.
          Exemplo de configuração (simplificado):
          theme: {
            extend: {
              colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                  DEFAULT: "hsl(var(--primary))",
                  foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                  DEFAULT: "hsl(var(--secondary))",
                  foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                  DEFAULT: "hsl(var(--destructive))",
                  foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                  DEFAULT: "hsl(var(--muted))",
                  foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                  DEFAULT: "hsl(var(--accent))",
                  foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                  DEFAULT: "hsl(var(--popover))",
                  foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                  DEFAULT: "hsl(var(--card))",
                  foreground: "hsl(var(--card-foreground))",
                },
                success: { // Cor adicionada
                  DEFAULT: "hsl(var(--success))",
                  foreground: "hsl(var(--success-foreground))",
                },
                warning: { // Cor adicionada
                  DEFAULT: "hsl(var(--warning))",
                  foreground: "hsl(var(--warning-foreground))",
                },
              },
            },
          },
      */}
      <PurchaseHistory data={samplePurchaseHistoryData} />
    </div>
  );
}