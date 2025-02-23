"use client";
import Form from "@/components/form";
import { useEffect, useState } from "react";

type Atividade = {
  id: string;
  titulo: string;
  responsavel: string;
  data: string;
  descricao: string;
};

export default function Atividades() {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [editando, setEditando] = useState<Atividade | null>(null);
  const [detalhesAtividade, setDetalhesAtividade] = useState<Atividade | null>(null);
  const [formVisible, setFormVisible] = useState(false);

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

  async function excluirAtividade(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta atividade?")) return;

    try {
      const response = await fetch("/api/cadastro", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        buscarAtividades();
        setEditando(null);
        setDetalhesAtividade(null);
      } else {
        console.error("Erro ao excluir atividade");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  const onSubmit = async (data: any) => {
    if (!editando) return;
    
    try {
      const response = await fetch("/api/cadastro", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, id: editando.id }),
      });

      if (response.ok) {
        setEditando(null);
        setFormVisible(false);
        buscarAtividades();
      } else {
        console.error("Erro ao editar atividade");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const formatDate = (date: string): string => {
    const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = date.match(regex);
  
    if (match) {
      const [, year, month, day] = match;
      return `${day}/${month}/${year}`;
    }
  
    return date;
  };

  const toggleDetalhes = (atividade: Atividade) => {
    setDetalhesAtividade(prev => (prev?.id === atividade.id ? null : atividade));
  };

  const toggleFormulario = (atividade: Atividade) => {
    if (editando?.id === atividade.id) {
      setEditando(null);
      setFormVisible(false);
    } else {
      setEditando(atividade);
      setFormVisible(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 flex space-x-8">
      <div className="w-2/3">
        <h1 className="text-2xl font-bold mb-4 text-white">Atividades Cadastradas</h1>
        {atividades.length === 0 ? (
          <p>Nenhuma atividade cadastrada.</p>
        ) : (
          <ul className="space-y-4">
            {atividades.map((atividade) => (
              <li key={atividade.id} className="border p-4 rounded-lg shadow-md flex justify-between items-center bg-slate-200">
                <div>
                  <h2 className="text-lg font-semibold">{atividade.titulo}</h2>
                  <p><strong>Responsável:</strong> {atividade.responsavel}</p>
                  <p><strong>Data:</strong> {formatDate(new Date(atividade.data).toISOString().split('T')[0])}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => toggleDetalhes(atividade)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    {detalhesAtividade?.id === atividade.id ? "Ocultar detalhes" : "Ver detalhes"}
                  </button>
                  <button
                    onClick={() => toggleFormulario(atividade)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    {editando?.id === atividade.id ? "Cancelar edição" : "Editar"}
                  </button>
                  <button
                    onClick={() => excluirAtividade(atividade.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {formVisible && editando && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-100">
            <h2 className="text-xl font-bold mb-2">Editar Atividade</h2>
            <Form
              atividade={editando}
              onSubmit={onSubmit}
            />
          </div>
        )}
      </div>

      <div className="w-1/3 mt-12">
        {detalhesAtividade ? (
          <div className="p-4 border rounded-lg bg-gray-100 ">
            <h2 className="text-xl font-bold mb-2">Detalhes da Atividade</h2>
            <p><strong>Título:</strong> {detalhesAtividade.titulo}</p>
            <p><strong>Responsável:</strong> {detalhesAtividade.responsavel}</p>
            <p><strong>Data:</strong> {formatDate(new Date(detalhesAtividade.data).toISOString().split('T')[0])}</p>
            <p><strong>Descrição:</strong> {detalhesAtividade.descricao}</p>
          </div>
        ) : (
          <p className="text-white">Selecione uma atividade para ver os detalhes.</p>
        )}
      </div>
    </div>
  );
}