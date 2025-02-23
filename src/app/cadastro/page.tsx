"use client";
import Form from "@/components/form";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

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

  const URL_DA_IMAGEM_DE_ERRO = "/assets/cancel.svg";
    const URL_DA_IMAGEM_DE_SUCESSO = "/assets/success.svg";

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // Envia os dados para criar uma nova atividade
      });

      if (response.ok) {
        buscarAtividades(); // Atualiza a lista após cadastro
        Swal.fire({
          title: "Sucesso!",
          text: "Cadastro realizado com sucesso",
          imageUrl: URL_DA_IMAGEM_DE_SUCESSO,
          imageWidth: 80,
          imageHeight: 80,
          imageAlt: "Imagem de sucesso",
      });
      } else {
        Swal.fire("Erro!", "Não foi possível cadastrar a atividade.", "error");
      }
    } catch (error) {
      Swal.fire("Erro!", "Ocorreu um erro ao cadastrar a atividade.", "error");
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
