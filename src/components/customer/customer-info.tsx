import React from 'react';

// Mocks para os componentes e ícones externos
// Em um ambiente de projeto real, esses seriam importados de suas respectivas bibliotecas.

// Mock do componente Card (assumindo shadcn/ui Card ou similar)
const Card = ({ children, className }) => {
  return (
    <div className={`shadow-sm bg-white ${className}`}>
      {children}
    </div>
  );
};

// Mock do componente Button (assumindo shadcn/ui Button ou similar)
const Button = ({ children, className, variant, size, onClick, disabled }) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors duration-200";
  let variantClasses = "bg-blue-500 text-white hover:bg-blue-600"; // Default primary
  if (variant === "outline") {
    variantClasses = "border border-gray-300 text-gray-700 hover:bg-gray-100";
  } else if (variant === "destructive") {
    variantClasses = "bg-red-500 text-white hover:bg-red-600";
  } else if (variant === "success") { // Added for "Aprovar" button
    variantClasses = "bg-green-600 text-white hover:bg-green-700";
  }

  const sizeClasses = size === "sm" ? "text-sm" : "text-base";

  return (
    <button disabled={disabled} className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={onClick}>
      {children}
    </button>
  );
};

// Mock para os ícones Lucide React
const User = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const FileText = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v6h6"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>);
const DollarSign = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>);
const MapPin = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="10" r="3"/></svg>);
const CheckCircle = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>);
const XCircle = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>);
const Phone = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const Briefcase = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>);
const Calendar = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>);
const Tag = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" x2="7" y1="7" y2="7"/></svg>);
const Info = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>);

// Mock do componente StatusBadge (se não for shadcn/ui, simula o comportamento)
const StatusBadge = ({ children, className, variant }) => {
  let variantClasses = ""; // Clear default to ensure specific variants take precedence
  if (variant === "approved") {
    variantClasses = "bg-success text-success-foreground"; // Solid green background, white text
  } else if (variant === "rejected") {
    variantClasses = "bg-danger text-danger-foreground"; // Solid red background, white text
  } else if (variant === "pending") {
    variantClasses = "bg-warning text-warning-foreground"; // Solid orange background, white text (or dark text if foreground is dark)
  }
  return (
    // Adjusted padding, font, and flex properties for internal alignment
    // The image clearly shows `inline-flex` with `items-center` for vertical alignment
    // and `gap-2` for space between icon and text.
    <span className={`inline-flex items-center px-4 py-2.5 rounded-lg text-base font-bold ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};

// Componente reutilizável para pares chave-valor (padronizado)
// Modificado para alinhar com o design da imagem
const KeyValue = ({ label, value, isZero = false, tooltip }) => (
  <div className="flex flex-col flex-1">
    <span className="text-muted-foreground font-medium text-sm uppercase" title={tooltip}>{label}</span>
    <span className={`text-2xl font-bold ${isZero ? 'text-muted-foreground' : 'text-foreground'}`}>
      {value}
      {isZero && <Info className="h-4 w-4 ml-1 inline text-muted-foreground" aria-hidden="true" title="Sem dados disponíveis" />}
    </span>
  </div>
);

// --------- Interfaces de Dados ---------

interface CustomerData {
  id: string;
  name: string;
  document: string;
  birthDate: string;
  age: number;
  address: string;
  city: string;
  state: string;
  category: string;
  profession: string;
  income: number;
  otherIncome: number;
  totalIncome: number;
  documentValidated: boolean;
  phoneValidated: boolean;
  incomeUpdated: boolean;
  addressUpdated: boolean;
  score: number; // Adicionado para a pontuação do cliente
  analysisStatus: 'APROVADO' | 'REPROVADO' | 'EM ANÁLISE'; // Adicionado para o status da análise
}

interface CustomerInfoProps {
  customer: CustomerData;
  onSubmitAnalysis: () => void; // Adicionado para lidar com a submissão
  isAnalysisSubmitted: boolean; // Adicionado para controlar o estado do botão
}

// Função para calcular idade (padronizada)
const calculateAge = (birthDate: string): number => {
  const [day, month, year] = birthDate.split('/').map(Number);
  const birth = new Date(year, month - 1, day);
  const today = new Date(2025, 7, 17); // Data atual: Agosto 17, 2025
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

// --------- Componentes de Nicho ---------

// Componente CustomerInfo (Detalhes e Ações do Cliente)
export function CustomerInfo({ customer, onSubmitAnalysis, isAnalysisSubmitted }: CustomerInfoProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);

  const formatDocument = (doc: string) => doc; // Ajustado para formato do screenshot "9/428803", sem regex CPF

  const InfoItem = ({
    label,
    icon,
    children,
  }: {
    label: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <div>
      <div className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1 mb-1">
        {icon}
        {label}
      </div>
      <div className="font-medium">{children}</div>
    </div>
  );

  // Funções para estilizar o Score e Status de Análise (movidas para cá)
  const getScoreDisplay = (score: number) => {
    if (score >= 700) return { status: "Alto", scoreBg: "bg-success-light", textColor: "text-success", text: "APROVADO" };
    if (score >= 400) return { status: "Médio", scoreBg: "bg-warning-light", textColor: "text-warning", text: "EM ANÁLISE" };
    return { status: "Baixo", scoreBg: "bg-danger-light", textColor: "text-danger", text: "REPROVADO" };
  };

  const getAnalysisStatusBgColor = (statusText: string) => {
    switch (statusText) {
      case "APROVADO": return "bg-success";
      case "EM ANÁLISE": return "bg-warning";
      case "REPROVADO": return "bg-danger";
      default: return "bg-muted-foreground"; // Cor padrão caso não haja match
    }
  };

  const scoreDisplay = getScoreDisplay(customer.score); // Usando customer.score

  return (
    <Card className="w-full overflow-hidden p-0 shadow-md">
      {/* Cabeçalho */}
      <div className="flex items-center gap-4 bg-primary text-primary-foreground px-5 py-5 shadow">
        <User className="h-5 w-4" aria-hidden="true" />
        <h2 id="customer-title" className="font-semibold text-base md:text-lg">
          ANÁLISE DE CLIENTE: {customer.name}
        </h2>
      </div>

      {/* Seção 1: Dados Pessoais - Compactada e acima das outras seções */}
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
        <div className="flex flex-col items-center justify-center">
          <div className="w-28 h-28 bg-muted rounded-full flex items-center justify-center shadow-inner mb-4">
            <User className="h-14 w-14 text-muted-foreground" aria-hidden="true" /> {/* Placeholder SVG */}
          </div>
        </div>

        <div className="space-y-3">
          <InfoItem label="Nome do Cliente">
            <div className="text-lg font-bold">{customer.name}</div>
          </InfoItem>
          <InfoItem label="Data de Nascimento" icon={<Calendar className="h-4 w-4" aria-hidden="true" />}>
            {customer.birthDate} ({calculateAge(customer.birthDate)} anos)
          </InfoItem>
          <InfoItem label="Profissão" icon={<Briefcase className="h-4 w-4" aria-hidden="true" />}>
            {customer.profession}
          </InfoItem>
        </div>
        <div className="space-y-4">
          <InfoItem label="Documento">
            <span className="font-mono text-sm">{formatDocument(customer.document)}</span>
          </InfoItem>
          <InfoItem label="Endereço Completo" icon={<MapPin className="h-4 w-4" aria-hidden="true" />}>
            {customer.address}, {customer.city} - {customer.state}
          </InfoItem>
          <InfoItem label="Categoria" icon={<Tag className="h-4 w-4" aria-hidden="true" />}>
            {customer.category}
          </InfoItem>
        </div>
      </div>

      {/* Seção 2: Validação e Financeiro - Em linha, abaixo dos dados pessoais */}
      <div className="bg-muted p-6 rounded-2xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Card className="p-5 bg-card rounded-xl shadow-sm" role="region" aria-labelledby="validation-title">
            <h3 id="validation-title" className="text-sm font-semibold text-muted-foreground uppercase mb-4">
              Status de Validação
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Documento", status: customer.documentValidated },
                { label: "Telefone", status: customer.phoneValidated },
                { label: "Renda", status: customer.incomeUpdated },
                { label: "Endereço", status: customer.addressUpdated },
              ].map((item, index) => (
                <StatusBadge
                  key={index}
                  variant={item.status ? "approved" : "rejected"}
                >
                  {item.status ? (
                    <CheckCircle className="h-5 w-5 mr-2" aria-hidden="true" />
                  ) : (
                    <XCircle className="h-5 w-5 mr-2" aria-hidden="true" />
                  )}
                  <span className="flex-1 text-left">{item.label} : <span className="font-bold">{item.status ? "Validado" : "Pendente"}</span></span>
                </StatusBadge>
              ))}
            </div>
          </Card>

          {/* Seção Financeira Refatorada para o novo layout com as cores da imagem */}
          <Card className="p-5 bg-card rounded-xl shadow-inner" role="region" aria-labelledby="financial-title">
            <h3 id="financial-title" className="text-sm font-semibold text-muted-foreground uppercase mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-success" aria-hidden="true" />
              Resumo Financeiro
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-6 w-full"> {/* flex-col para mobile, flex-row para sm+ */}
              <div className="flex-1 grid grid-cols-1 gap-4 sm:grid-cols-2"> {/* Grid para os dois primeiros itens */}
                <KeyValue
                  label="Renda Principal"
                  value={formatCurrency(customer.income)}
                  isZero={customer.income === 0}
                  tooltip="Renda principal declarada"
                />
                <KeyValue
                  label="Outras Rendas"
                  value={formatCurrency(customer.otherIncome)}
                  isZero={customer.otherIncome === 0}
                  tooltip="Outras rendas adicionais"
                />
              </div>
              {/* O Total Líquido agora ocupa sua própria seção com destaque */}
              <div className="bg-success-light rounded-lg p-5 shadow flex flex-col items-center justify-center gap-1 min-w-[180px]"> {/* min-w para garantir tamanho fixo em telas maiores */}
                <span className="text-sm font-semibold text-success uppercase">Total Líquido</span>
                <span className="text-3xl font-bold text-success">
                  {formatCurrency(customer.totalIncome)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
}

// Componente principal da aplicação (para demonstração)
export default function App() {
  // Dados de exemplo para o CustomerInfo
  const sampleCustomerData = {
    id: "123",
    name: "Elisvalda Rodrigues Rabelo",
    document: "9/428803", // Corrigido para formato do screenshot
    birthDate: "06/06/1982",
    age: calculateAge("06/06/1982"), // Calculado dinamicamente
    address: "Rua: Cortesia Nº: 219",
    city: "Coelho Neto",
    state: "MA",
    category: "TEC SEG. TRABALHO",
    profession: "Técnico de Segurança do Trabalho",
    income: 1250,
    otherIncome: 250,
    totalIncome: 1500,
    documentValidated: true,
    phoneValidated: false,
    incomeUpdated: true,
    addressUpdated: false,
    score: 260, // Adicionado score para demonstração
    analysisStatus: 'REPROVADO', // Adicionado status para demonstração
  };

  const handleSubmitAnalysis = () => {
    console.log('Análise submetida!');
    // Aqui você pode adicionar a lógica para atualizar o estado,
    // por exemplo, setar isAnalysisSubmitted para true.
  };

  const [isAnalysisSubmitted, setIsAnalysisSubmitted] = React.useState(false);

  return (
    <div className="p-4 bg-background min-h-screen">
      <CustomerInfo
        customer={sampleCustomerData}
        onSubmitAnalysis={() => {
          handleSubmitAnalysis();
          setIsAnalysisSubmitted(true); // Atualiza o estado para mostrar o botão de análise submetida
        }}
        isAnalysisSubmitted={isAnalysisSubmitted}
      />
    </div>
  );
}