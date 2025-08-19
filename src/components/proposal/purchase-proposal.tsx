import React from 'react';
import { ShoppingCart, Calculator, CheckCircle, XCircle, Info, FileText } from "lucide-react";

// Interfaces para os dados da Proposta de Compra
interface PurchaseProposalData {
  products: {
    id: string;
    name: string;
    code: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  subtotal: number;
  extendedWarranty: number;
  total: number;
  paymentPlan: {
    installments: number;
    installmentValue: number;
    dueDate: string;
  };
  maxInstallmentLimit: number;
  score: number;
  analysisStatus: string;
}

interface PurchaseProposalProps {
  data: PurchaseProposalData;
  onSubmitAnalysis: () => void;
  isAnalysisSubmitted: boolean;
}

// Mocks para os componentes e ícones externos
const Card = ({ children, className }) => {
  return (
    <div className={`rounded-lg shadow-sm bg-card ${className}`}>
      {children}
    </div>
  );
};

const Button = ({ children, className, variant, size, onClick, disabled }) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors duration-200";
  let variantClasses = "bg-primary text-primary-foreground hover:bg-primary/90";
  if (variant === "outline") {
    variantClasses = "border border-border text-foreground hover:bg-accent";
  } else if (variant === "destructive") {
    variantClasses = "bg-destructive text-destructive-foreground hover:bg-destructive/90";
  } else if (variant === "success") {
    variantClasses = "bg-success text-success-foreground hover:bg-success/90";
  }

  const sizeClasses = size === "sm" ? "text-sm" : "text-base";

  return (
    <button disabled={disabled} className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={onClick}>
      {children}
    </button>
  );
};

const StatusBadge = ({ children, className, variant }) => {
  let variantClasses = "";
  if (variant === "approved") {
    variantClasses = "bg-success text-success-foreground";
  } else if (variant === "rejected") {
    variantClasses = "bg-danger text-danger-foreground";
  } else if (variant === "pending") {
    variantClasses = "bg-warning text-warning-foreground";
  }
  return (
    <span className={`inline-flex items-center px-4 py-2.5 rounded-lg text-base font-bold ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};

const KeyValue = ({ label, value, isZero = false, tooltip }) => (
  <div className="flex flex-col">
    <span className="text-muted-foreground font-medium text-xs uppercase" title={tooltip}>{label}</span>
    <span className={`text-xl md:text-2xl font-bold ${isZero ? 'text-muted-foreground' : ''}`}>
      {value}
      {isZero && <Info className="h-4 w-4 ml-1 inline text-muted-foreground" aria-hidden="true" title="Sem dados disponíveis" />}
    </span>
  </div>
);

export function PurchaseProposal({ data, onSubmitAnalysis, isAnalysisSubmitted }: PurchaseProposalProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getScoreDisplay = (score: number) => {
    if (score >= 700) return { status: "Alto", scoreBg: "bg-success/50", textColor: "text-success-foreground", text: "APROVADO" };
    if (score >= 400) return { status: "Médio", scoreBg: "bg-warning/50", textColor: "text-warning-foreground", text: "EM ANÁLISE" };
    return { status: "Baixo", scoreBg: "bg-danger/50", textColor: "text-danger-foreground", text: "REPROVADO" };
  };

  const scoreDisplay = getScoreDisplay(data.score);

  const getAnalysisStatusBgColor = (statusText: string) => {
    switch (statusText) {
      case "APROVADO": return "bg-success";
      case "EM ANÁLISE": return "bg-warning";
      case "REPROVADO": return "bg-destructive";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="w-full overflow-hidden rounded-xl shadow-md -mt-16">
      {/* Título Principal Padronizado com Ícone */}
      <section role="region" aria-labelledby="purchase-proposal-title">
        <h2 id="purchase-proposal-title" className="flex items-center gap-4 bg-primary text-primary-foreground px-5 py-4 shadow">
          <ShoppingCart className="h-5 w-5 mr-2" aria-hidden="true" />
          DADOS DA PROPOSTA DE COMPRA
        </h2>
      </section>

      {/* Seção Mercadorias (agora mais próxima do título) */}
      <div className="flex flex-col space-y-6">
        <div className="border border-border rounded-lg p-3 flex flex-col">
          <div className="bg-secondary text-secondary-foreground font-bold text-center py-1 rounded text-sm md:text-base mb-2">
            MERCADORIAS
          </div>

          <div className="overflow-x-auto"> {/* Removido 'flex-grow' */}
            <table className="w-full text-sm min-w-max"> {/* Adicionado 'min-w-max' */}
              <thead>
                <tr className="bg-muted text-muted-foreground font-semibold">
                  <th className="p-2 text-center">ITEM</th>
                  <th className="p-2 text-center">CÓDIGO</th>
                  <th className="p-2 text-left">DESCRIÇÃO</th>
                  <th className="p-2 text-center">QT.</th>
                  <th className="p-2 text-right">VL. UNI.</th>
                  <th className="p-2 text-right">VL. TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product, index) => (
                  <tr key={product.id} className="border-b border-border">
                    <td className="p-2 text-center">{index + 1}</td>
                    <td className="p-2 text-center">{product.code}</td>
                    <td className="p-2">{product.description}</td>
                    <td className="p-2 text-center">{product.quantity}</td>
                    <td className="p-2 text-right">{formatCurrency(product.unitPrice)}</td>
                    <td className="p-2 text-right font-semibold">{formatCurrency(product.totalPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 border-t border-border pt-4">
            <div className="flex justify-between items-center text-sm md:text-base">
              <span className="font-semibold text-muted-foreground">SUBTOTAL</span>
              <span className="font-bold">{formatCurrency(data.subtotal)}</span>
            </div>
            <div className="flex justify-between items-center text-sm md:text-base mt-2">
              <span className="font-semibold text-muted-foreground">GARANTIA ESTENDIDA</span>
              <span className="font-bold">{formatCurrency(data.extendedWarranty)}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg md:text-xl border-t-2 border-border pt-2 mt-2">
              <span>TOTAL</span>
              <span>{formatCurrency(data.total)}</span>
            </div>
          </div>
        </div>

        {/* Seção Plano de Pagamento */}
        <div className="border border-border rounded-lg p-3">
          <div className="bg-secondary text-secondary-foreground font-bold text-center py-1 rounded text-sm md:text-base mb-2 flex justify-center items-center">
            <Calculator className="h-4 w-4 mr-2" />
            PLANO DE PAGAMENTO
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center text-sm">
            <div>
              <div className="text-muted-foreground font-medium">ENTRADA</div>
              <div className="font-bold text-base md:text-lg">{formatCurrency(data.paymentPlan.installmentValue)}</div>
            </div>
            <div>
              <div className="text-muted-foreground font-medium">ENTRADA PRÉ</div>
              <div className="font-bold text-base md:text-lg">{formatCurrency(0)}</div>
            </div>
            <div>
              <div className="text-muted-foreground font-medium">QTDE.</div>
              <div className="font-bold text-base md:text-lg">{data.paymentPlan.installments}</div>
            </div>
            <div>
              <div className="text-muted-foreground font-medium">PRESTAÇÃO</div>
              <div className="font-bold text-base md:text-lg">{formatCurrency(data.paymentPlan.installmentValue)}</div>
            </div>
            <div>
              <div className="text-muted-foreground font-medium">1º VENCIMENTO</div>
              <div className="font-bold text-base md:text-lg">{data.paymentPlan.dueDate}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}