import { useState, useEffect, useRef } from "react";
import { CustomerQueue } from "@/components/queue/customer-queue";
import { CustomerInfo } from "@/components/customer/customer-info";
import { PurchaseHistory } from "@/components/purchase/purchase-history";
import { PurchaseProposal } from "@/components/proposal/purchase-proposal";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import React from 'react';
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

// Mocks de componentes e ícones utilizados
const Card = ({ children, className }) => {
  return (
    <div className={`rounded-xl shadow-md bg-white ${className}`}>
      {children}
    </div>
  );
};

const KeyValue = ({ label, value, isZero = false, tooltip }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-muted-foreground uppercase text-xs font-medium" title={tooltip}>{label}</span>
    <span className={`font-bold text-xl ${isZero ? 'text-muted-foreground' : 'text-foreground'}`}>
      {value}
      {isZero && <Info className="h-4 w-4 ml-1 inline text-muted-foreground" aria-hidden="true" title="Sem dados disponíveis" />}
    </span>
  </div>
);

const CreditCard = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>);
const Info = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>);
const Calculator = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M8 6h8"/><path d="M8 10h8"/><path d="M8 14h8"/><path d="M8 18h8"/></svg>);

interface CreditLimitsData {
  availableCredit: number;
  availableCash: number;
  historyLimit: number;
  incomeLimit: number;
}

interface CreditLimitsProps {
  data: CreditLimitsData;
}

const CreditLimits = ({ data }: CreditLimitsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  }; 
  
};

const mockCustomers = [
  {
    id: "1",
    code: "220.642 CPF:080.333.043-09",
    name: "ELISVALDA RODRIGUES",
    status: "active" as const,
    score: 850,
    isUrgent: true,
    queuedSince: Date.now() - 3600000 // 1h atrás
  },
  {
    id: "2",
    code: "330.743 CPF:090.444.054-10",
    name: "JOÃO SILVA PEREIRA",
    status: "pending" as const,
    score: 420,
    queuedSince: Date.now() - 300000 // 5min atrás
  },
  {
    id: "3",
    code: "440.854 CPF:101.555.065-11",
    name: "MARIA OLIVEIRA SANTOS",
    status: "completed" as const,
    score: 910,
    queuedSince: Date.now() - 7200000 // 2h atrás
  },
  {
    id: "4",
    code: "440.854 CPF:101.555.065-11",
    name: "PEDRO BARBOSA",
    status: "pending" as const,
    score: 780,
    queuedSince: Date.now() - 1200000 // 20min atrás
  },
  {
    id: "5",
    code: "440.854 CPF:101.555.065-11",
    name: "JOÃO DA CONCEIÇÃO",
    status: "active" as const,
    score: 550,
    isUrgent: true,
    queuedSince: Date.now() - 172800000 // 2 dias atrás
  },
  {
    id: "6",
    code: "440.854 CPF:101.555.065-11",
    name: "ANA LÚCIA SOUZA",
    status: "completed" as const,
    score: 630,
    queuedSince: Date.now() - 259200000 // 3 dias atrás
  }
];

const calculateAge = (birthDate: string): number => {
  const [day, month, year] = birthDate.split('/').map(Number);
  const birth = new Date(year, month - 1, day);
  const today = new Date(2025, 7, 17);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const mockCustomerData = {
  id: "1",
  name: "ELISVALDA RODRIGUES RABELO",
  document: "9/428803",
  birthDate: "06/06/1982",
  age: 0,
  address: "RUA: CORTESIA Nr: 219",
  city: "COELHO NETO",
  state: "MA",
  category: "CLT",
  profession: "TEC SEG. TRABALHO",
  income: 1250,
  otherIncome: 250,
  totalIncome: 1350,
  documentValidated: true,
  phoneValidated: true,
  incomeUpdated: true,
  addressUpdated: false
};

const mockPurchaseHistory = {
  cashPurchases: {
    quantity: 18,
    averageTicket: 3500
  },
  creditPurchases: {
    quantity: 8,
    averageTicket: 800,
    averageInstallmentValue: 455,
    maxInstallmentValue: 255,
    historyLimit: 1200,
    incomeLimit: 10500
  },
  cardLimits: {
    availableCredit: 6900,
    availableCash: 2400
  }
};

const mockProposal = {
  products: [
    {
      id: "1",
      name: "TV LG LED 32LM627BPSB HD SMT",
      code: "192283",
      description: "TV LG LED 32LM627BPSB HD SMT",
      quantity: 1,
      unitPrice: 1450,
      totalPrice: 1450
    },
    {
      id: "2",
      name: "TV SEMP LED 32LM627BPSB HD SMT",
      code: "192283",
      description: "TV LG LED 32LM627BPSB HD SMT",
      quantity: 1,
      unitPrice: 1750,
      totalPrice: 1750
    },
    {
      id: "3",
      name: "TV SONY LED 32LM627BPSB HD S",
      code: "192282",
      description: "TV SONY LED 32LM627BPSB HD S",
      quantity: 1,
      unitPrice: 1350,
      totalPrice: 1350
    }
  ],
  subtotal: 2800,
  extendedWarranty: 220,
  total: 3020,
  paymentPlan: {
    installments: 10,
    installmentValue: 400,
    dueDate: "28/08/2025"
  },
  maxInstallmentLimit: 120,
  score: 260
};

const sampleScoreData = {
  spc: {
    negativations: [
      { id: 'n1', company: "Magazine ABC", value: 900.00, date: "15/06/2025" },
    ],
    consultations: 5,
  },
  serasa: {
    negativations: [
      { id: 'n2', company: "Financeira XYZ", value: 1200.00, date: "22/05/2025" },
      { id: 'n3', company: "Loja de Eletrodomésticos", value: 550.00, date: "10/07/2025" },
    ],
    consultations: 8,
  },
  mainScore: 785,
  riskStatus: 'BOM',
};

// Componente ScoreDisplay centralizado
const ScoreDisplay = ({ score, status }) => {
  const getColors = (score) => {
    if (score >= 700) return { bg: "bg-green-500", text: "text-white" };
    if (score >= 500) return { bg: "bg-yellow-500", text: "text-gray-900" };
    return { bg: "bg-red-500", text: "text-white" };
  };

  const { bg, text } = getColors(score);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`w-48 h-48 rounded-full flex items-center justify-center font-bold text-6xl ${bg} ${text}`}>
        {score}
      </div>
      <span className="mt-2 text-foreground font-semibold uppercase">{status}</span>
    </div>
  );
};

// Componente Footer - Ajustado para ser fixo
const currentYear = new Date().getFullYear();
const buildVersion = "v1.2.3";
const buildDate = "20250818";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#0A192F] text-[#F0F4F8] py-4 md:py-3 shadow-lg">
      <div className="max-w-[1920px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left text-xs md:text-sm space-y-2 md:space-y-0">
        
        {/* Informações de Copyright e Autoria */}
        <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4">
          <p className="font-semibold text-gray-300">
            &copy; {currentYear} DGC. Todos os direitos reservados.
          </p>
          <span className="hidden md:inline text-gray-500">|</span>
          <p className="font-normal text-gray-400">
            Desenvolvido por <span className="font-bold text-white">DGC</span>
          </p>
          <span className="hidden md:inline text-gray-500">|</span>
          <p className="font-normal text-gray-400">
            Design & Code por <span className="font-bold text-white">Hudson Hallen</span>
          </p>
        </div>

        {/* Informações da Versão e Build */}
        <div className="text-right text-gray-500 space-x-2">
          <span className="font-medium">Versão: {buildVersion}</span>
          <span>|</span>
          <span className="font-medium">Build: {buildDate}</span>
        </div>

      </div>
    </footer>
  );
};

export default function CreditAnalysis() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("1");
  const [isLoading, setIsLoading] = useState(false);
  const [customerData, setCustomerData] = useState(mockCustomerData);
  const [showFloatingName, setShowFloatingName] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Referências para os elementos
  const customerInfoRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Efeito para calcular a altura do cabeçalho uma vez que ele é montado
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [headerRef.current]);

  useEffect(() => {
    setCustomerData(prev => ({ ...prev, age: calculateAge(prev.birthDate) }));
  }, []);

  // Lógica para mostrar o nome do cliente quando o CustomerInfo sair da tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloatingName(!entry.isIntersecting);
      },
      {
        root: null, // Observa em relação ao viewport
        threshold: 0.05, // O nome aparece assim que 5% do elemento sai da tela, tornando o efeito mais suave
      }
    );

    if (customerInfoRef.current) {
      observer.observe(customerInfoRef.current);
    }

    // Limpeza: desconecta o observer quando o componente é desmontado
    return () => {
      if (customerInfoRef.current) {
        observer.unobserve(customerInfoRef.current);
      }
    };
  }, [customerInfoRef]);

  const getCustomerName = (id: string) => {
    const customer = mockCustomers.find(c => c.id === id);
    return customer ? customer.name : '';
  };

  const handleSubmitAnalysis = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Análise Submetida",
      description: "A proposta foi enviada para análise do sistema de crédito.",
    });
    setIsLoading(false);
  };

  const handleApprove = () => {
    toast({
      title: "Proposta Aprovada",
      description: "Proposta aprovada com sucesso!",
    });
  };

  const handleManualReview = () => {
    toast({
      title: "Análise Manual Solicitada",
      description: "Proposta encaminhada para revisão manual.",
    });
  };

  const handleDeny = () => {
      toast({
      title: "Proposta Negada",
      description: "Proposta negada.",
    });
  };

  if (!selectedCustomerId) {
    return <div className="min-h-screen bg-background p-3 text-center">Selecione um cliente para analisar.</div>;
  }

  const selectedCustomer = mockCustomers.find(c => c.id === selectedCustomerId);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ paddingTop: `${headerHeight}px` }}>
      <Header ref={headerRef} />
      {showFloatingName && selectedCustomer && (
        <div
          className="fixed left-0 right-0 bg-blue-100 border-b border-blue-200 shadow-md p-2 z-40 text-center transition-opacity duration-300"
          style={{ top: `${headerHeight}px` }}
        >
          <span className="text-sm font-bold text-gray-700">PDV - DGC: </span>
          <span className="text-sm font-extrabold text-blue-700">{selectedCustomer.name}</span>
        </div>
      )}
      <div className="max-w-[1920px] mx-auto space-y-3 pb-20">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
          <aside className="xl:col-span-1" role="complementary">
            <CustomerQueue
              customers={mockCustomers}
              selectedCustomerId={selectedCustomerId}
              onSelectCustomer={setSelectedCustomerId}
            />
          </aside>

          <main className="xl:col-span-4 space-y-4" role="main">
            <div ref={customerInfoRef}>
              <CustomerInfo
                customer={customerData}
                validationColors={{ valid: "text-green-500", invalid: "text-red-500" }}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-4">
                <PurchaseHistory data={mockPurchaseHistory} />
              </div>
              <div className="space-y-4 flex flex-col items-center justify-center mx-auto w-full">
                <PurchaseProposal
                  data={mockProposal}
                  onSubmitAnalysis={handleSubmitAnalysis}
                  isLoading={isLoading}
                >
                  {isLoading && <Loader2 className="animate-spin ml-2" />}
                </PurchaseProposal>
              </div>
            </div>
            <CreditLimits data={mockPurchaseHistory.creditPurchases.historyLimit === 0 && mockPurchaseHistory.creditPurchases.incomeLimit === 0 && mockPurchaseHistory.cardLimits.availableCredit === 0 && mockPurchaseHistory.cardLimits.availableCash === 0 ? { availableCredit: 0, availableCash: 0, historyLimit: 0, incomeLimit: 0 } : { availableCredit: mockPurchaseHistory.cardLimits.availableCredit, availableCash: mockPurchaseHistory.cardLimits.availableCash, historyLimit: mockPurchaseHistory.creditPurchases.historyLimit, incomeLimit: mockPurchaseHistory.creditPurchases.incomeLimit }} />

            <div className="bg-secondary p-5 rounded-xl shadow-md space-y-5">
            <div className="flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-bold text-primary text-center">
              Análise de Crédito
            </h2>
            <div className="bg-primary text-primary-foreground font-bold px-5 py-4 mt-2 rounded-xl shadow text-center">
             LIMITE MÁXIMO X NOVA PRESTAÇÃO: <span className="font-bold text-white ml-2">87.91%</span>
            </div>
            </div>          
              {/* INÍCIO DA CORREÇÃO: Grid para alinhar os três cards na mesma linha */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card do SPC */}
                <Card className="flex flex-col p-6 space-y-4">
                  <h3 className="text-xl font-bold text-center">SPC</h3>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg w-full">
                      <span className="text-4xl font-bold text-red-500">{sampleScoreData.spc.negativations.length}</span>
                      <span className="text-sm text-gray-700 font-medium text-center">Negativações ativas</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg w-full">
                      <span className="text-4xl font-bold text-gray-700">{sampleScoreData.spc.consultations}</span>
                      <span className="text-sm text-gray-700 font-medium text-center">Consultas (90 dias)</span>
                    </div>
                  </div>
                  {sampleScoreData.spc.negativations.length > 0 && (
                    <div className="text-center mt-2 space-y-1">
                      <p className="font-semibold text-lg text-red-500">Detalhes das Negativações:</p>
                      <ul className="list-none text-sm space-y-1">
                        {sampleScoreData.spc.negativations.map((n) => (
                          <li key={n.id} className="flex flex-col">
                            <span className="font-medium">{n.company}</span>
                            <span className="text-xs text-gray-500">Valor: R$ {n.value.toFixed(2)} - Data: {n.date}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>        

                {/* Card do SERASA */}
                <Card className="flex flex-col p-6 space-y-4">
                  <h3 className="text-xl font-bold text-center">SERASA</h3>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg w-full">
                      <span className="text-4xl font-bold text-red-500">{sampleScoreData.serasa.negativations.length}</span>
                      <span className="text-sm text-gray-700 font-medium text-center">Negativações ativas</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg w-full">
                      <span className="text-4xl font-bold text-gray-700">{sampleScoreData.serasa.consultations}</span>
                      <span className="text-sm text-gray-700 font-medium text-center">Consultas (90 dias)</span>
                    </div>
                  </div>
                  {sampleScoreData.serasa.negativations.length > 0 && (
                    <div className="text-center mt-2 space-y-1">
                      <p className="font-semibold text-lg text-red-500">Detalhes das Negativações:</p>
                      <ul className="list-none text-sm space-y-1">
                        {sampleScoreData.serasa.negativations.map((n) => (
                          <li key={n.id} className="flex flex-col">
                            <span className="font-medium">{n.company}</span>
                            <span className="text-xs text-gray-500">Valor: R$ {n.value.toFixed(2)} - Data: {n.date}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
                {/* Card do Score Geral */}
                <Card className="flex flex-col items-center justify-center p-6 space-y-4 text-center">
                  <h3 className="text-xl font-bold">Score Geral</h3>
                  <ScoreDisplay score={sampleScoreData.mainScore} status={sampleScoreData.riskStatus} />
                </Card>

              </div>
              {/* FIM DA CORREÇÃO */}
              
              <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
                <button onClick={handleApprove} className="flex-1 bg-green-500 text-white font-bold p-4 rounded-lg shadow hover:bg-green-600 transition-colors">
                  Aprovar
                </button>
                <button onClick={handleManualReview} className="flex-1 bg-yellow-500 text-gray-900 font-bold p-4 rounded-lg shadow hover:bg-yellow-600 transition-colors">
                  Envio Para Análise
                </button>
                <button onClick={handleDeny} className="flex-1 bg-blue-500 text-white font-bold p-4 rounded-lg shadow hover:bg-blue-600 transition-colors">
                  DGC
                </button>
                <button onClick={handleDeny} className="flex-1 bg-red-500 text-white font-bold p-4 rounded-lg shadow hover:bg-red-600 transition-colors">
                  Financeiras
                </button>
                
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}