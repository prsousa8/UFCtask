"use client";

import { Atividade } from "@/components/Atividade";
import { Card } from "@/components/Card";
import { useEffect, useState } from "react";

export default function Home() {
  const [atividadesPendentes, setAtividadesPendentes] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAtividadesPendentes() {
      try {
        const response = await fetch("/api/cadastro");
        const data = await response.json();

        console.log("Dados da API:", data); // Debugando a resposta

        if (data.atividades) {
          const pendentes = data.atividades.filter((atividade: any) => atividade.status === "Pendente");

          console.log("Atividades pendentes:", pendentes); // Debugando as atividades pendentes

          setAtividadesPendentes(pendentes);
        }
      } catch (error) {
        console.error("Erro ao carregar as atividades pendentes:", error);
      }
    }

    fetchAtividadesPendentes();
  }, []);


  return (
    <div>
      <section
        style={{
          backgroundImage: "url('/assets/Polygon.svg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "50vh",
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}
      >
        <h1 style={{ fontSize: '25px', color: 'cornsilk' }}>
          Olá, Sejam Bem Vindos a <strong style={{ color: 'orangered' }}>UFCTask</strong>, sua plataforma de gerenciamento de atividades!
        </h1>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 -mt-4">
        <Card titulo="Cadastro de Atividades" descricao="Registre novas atividades para um controle eficiente." />
        <Card titulo="Listagem de Atividades" descricao="Visualize todas as atividades cadastradas." />
        <Card titulo="Edição de Atividades" descricao="Edite ou remova as informações de atividades existentes." />
      </div>

      {atividadesPendentes.length > 0 && (
        <section className="mt-8 px-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">Atividades Pendentes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {atividadesPendentes.map((atividade) => (
              <div key={atividade.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <Atividade
                  titulo={atividade.titulo}
                  responsavel={atividade.responsavel}
                  data={atividade.data}
                  descricao={atividade.descricao}
                  status={atividade.status}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
