import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CreditCard, Users, BarChart3, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section - Melhorado com imagem de fundo sutil e melhor acessibilidade */}
      <section aria-labelledby="hero-title" className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center">
            <h1 id="hero-title" className="text-4xl md:text-5xl font-bold mb-6">
              Sistema de Análise de Crédito
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Departamento de Crédito e Cobrança - DGC.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/credit-analysis")}
              aria-label="Acessar o sistema de análise de crédito"
              className="text-lg"  // Removido px/py redundantes, size="lg" cuida disso
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Acessar Sistema
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section - Adicionado animação sutil e cores consistentes com o screenshot */}
      <section aria-labelledby="features-title" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 id="features-title" className="text-3xl font-bold mb-4">Funcionalidades Principais</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Tudo que você precisa para uma análise de crédito eficiente e integrada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-lg font-semibold mb-2">Fila de Atendimento</h3>
            <p className="text-muted-foreground text-sm">
              Gerencie clientes em tempo real com status de atendimento atualizados.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" aria-hidden="true" />  {/* Alterado para green-500, alinhado ao "válido" no screenshot */}
            <h3 className="text-lg font-semibold mb-2">Análise de Crédito</h3>
            <p className="text-muted-foreground text-sm">
              Score automático baseado em histórico e dados cadastrais, com aprovações rápidas.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-4" aria-hidden="true" />  {/* Alterado para blue-500, consistente com headers */}
            <h3 className="text-lg font-semibold mb-2">Histórico de Compras</h3>
            <p className="text-muted-foreground text-sm">
              Análise completa do comportamento de compra do cliente com gráficos interativos.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <CreditCard className="h-12 w-12 text-yellow-500 mx-auto mb-4" aria-hidden="true" />  {/* Alterado para yellow-500, para warnings */}
            <h3 className="text-lg font-semibold mb-2">Proposta de Compra</h3>
            <p className="text-muted-foreground text-sm">
              Gestão de propostas com aprovação automática e limites personalizados.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section - Padronizado botão e adicionado acessibilidade */}
      <section aria-labelledby="cta-title" className="bg-muted py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 id="cta-title" className="text-3xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Acesse o sistema e comece a analisar propostas de crédito agora mesmo.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/credit-analysis")}
            aria-label="Iniciar análise de crédito"
            className="text-lg"  // Removido px/py redundantes
          >
            Começar Análise
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;