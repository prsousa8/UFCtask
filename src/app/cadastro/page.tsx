"use client";
import Form from "@/components/form";
import { useState, useEffect } from "react";

export default function Atividades() {
  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    buscarAtividades();
  }, []);

  async function buscarAtividades() {
    try {
      const response = await fetch("/api/cadastro");
      if (!response.ok) throw new Error("Erro ao buscar atividades.");
      const data = await response.json();
      setAtividades(data.atividades);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // Envia os dados para criar uma nova atividade
      });

      if (response.ok) {
        buscarAtividades(); // Atualiza a lista após cadastro
        alert("Cadastro efetuado com Sucesso!");
      } else {
        console.error("Erro ao cadastrar atividade");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Formulário para cadastrar nova atividade */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-100">
        <Form onSubmit={onSubmit} atividade={null} /> {/* Passa null porque estamos criando uma nova atividade */}
      </div>
    </div>
  );
}
