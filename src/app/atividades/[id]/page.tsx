"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Form from "@/components/form";
import { use } from "react";

type Atividade = {
  id: string;
  titulo: string;
  responsavel: string;
  data: string;
  descricao: string;
  status: string;  // Adicionado campo 'status'
};

interface PageProps {
  params: Promise<{ id: string }>; // params é uma Promise
}

export default function DetalhesAtividade({ params }: PageProps) {
  const [atividade, setAtividade] = useState<Atividade | null>(null);
  const [editando, setEditando] = useState(false);

  // Usar React.use() para resolver params
  const { id } = use(params); // Desestruturando o ID após o Promise ser resolvido

  useEffect(() => {
    if (id) {
      fetchAtividade(id);
    }
  }, [id]);

  async function fetchAtividade(id: string) {
    try {
      // Certifique-se de que a URL esteja correta
      const response = await fetch(`/api/cadastro?id=${id}`);
      
      // Verifique a resposta da API
      if (!response.ok) {
        throw new Error(`Erro ao buscar atividade com ID ${id}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Verifique se a atividade foi retornada
      if (data.atividade) {
        setAtividade(data.atividade);
      } else {
        throw new Error("Atividade não encontrada.");
      }
    } catch (error) {
      console.error("Erro ao buscar atividade:", error);
      Swal.fire("Erro!", "Não foi possível carregar os detalhes da atividade.", "error");
    }
  }

  async function excluirAtividade(id: string) {
    const resultado = await Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter essa ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (!resultado.isConfirmed) return;

    try {
      const response = await fetch("/api/cadastro", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        Swal.fire("Excluído!", "A atividade foi removida.", "success");
        // Redirecionar de volta para a lista de atividades
        window.location.href = "/atividades";
      } else {
        Swal.fire("Erro!", "Não foi possível excluir a atividade.", "error");
      }
    } catch (error) {
      Swal.fire("Erro!", "Ocorreu um erro ao excluir a atividade.", "error");
      console.error("Erro:", error);
    }
  }

  const onSubmit = async (data: any) => {
    if (!atividade) return;

    try {
      const response = await fetch("/api/cadastro", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, id: atividade.id }),
      });

      if (response.ok) {
        setEditando(false);
        fetchAtividade(atividade.id); // Atualiza os detalhes após edição
      } else {
        console.error("Erro ao editar atividade");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const toggleEditar = () => {
    setEditando((prev) => !prev); // Alterna o estado de "editando"
  };

  if (!atividade) return <p>Carregando...</p>;

  const formatDate = (date: string): string => {
    const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = date.match(regex);
  
    if (match) {
      const [, year, month, day] = match;
      return `${day}/${month}/${year}`;
    }
  
    return date;
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Detalhes da Atividade</h1>
      <div className="p-4 border rounded-lg bg-slate-200">
        <h2 className="text-lg font-semibold">{atividade.titulo}</h2>
        <p><strong>Responsável:</strong> {atividade.responsavel}</p>
        <p><strong>Data:</strong> {formatDate(new Date(atividade.data).toISOString().split('T')[0])}</p>
        <p><strong>Descrição:</strong> {atividade.descricao}</p>
        <p><strong>Status:</strong> {atividade.status}</p> {/* Exibe o status da atividade */}
        <div className="space-x-2 mt-4">
          <button
            onClick={toggleEditar} // Chamando a função que alterna o estado
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            {editando ? "Cancelar Edição" : "Editar"} {/* Alterando o texto do botão */}
          </button>
          <button
            onClick={() => excluirAtividade(atividade.id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Excluir
          </button>
        </div>
      </div>

      {editando && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <h2 className="text-xl font-bold mb-2">Editar Atividade</h2>
          <Form atividade={atividade} onSubmit={onSubmit} />
        </div>
      )}
    </div>
  );
}
