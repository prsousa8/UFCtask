"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"; // Importação do useRouter
import { Atividade } from "@/components/Atividade";

type Atividade = {
  id: string;
  titulo: string;
  responsavel: string;
  data: string;
  descricao: string;
  status: string;  // Adicionamos o campo status
};

export default function Atividades() {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const router = useRouter(); // Instância do router

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
        buscarAtividades();
        Swal.fire("Excluído!", "A atividade foi removida.", "success");
      } else {
        Swal.fire("Erro!", "Não foi possível excluir a atividade.", "error");
      }
    } catch (error) {
      Swal.fire("Erro!", "Ocorreu um erro ao excluir a atividade.", "error");
      console.error("Erro:", error);
    }
  }

  const atividadesFiltradas = atividades.filter(atividade =>
    atividade.titulo.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  const abrirDetalhesEmNovaPagina = (id: string) => {
    router.push(`/atividades/${id}`); // Redireciona para a página dinâmica da atividade
  };

  return (
    <div className="max-w-6xl mx-auto p-4 flex space-x-8">
      <div className="w-2/3">
        <h1 className="text-2xl font-bold mb-4 text-white">Atividades Cadastradas</h1>
        <input
          type="text"
          placeholder="Pesquisar por título..."
          className="mb-4 p-2 border rounded w-full"
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
        />
        {atividadesFiltradas.length === 0 ? (
          <p>Nenhuma atividade cadastrada.</p>
        ) : (
          <ul className="space-y-4">
            {atividadesFiltradas.map((atividade) => (
              <li key={atividade.id} className="border p-4 rounded-lg shadow-md flex justify-between items-center bg-slate-200">
                <div>
                  <Atividade
                    titulo={atividade.titulo}
                    responsavel={atividade.responsavel}
                    data={atividade.data}
                    descricao=""
                    status={atividade.status}
                  />
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => abrirDetalhesEmNovaPagina(atividade.id)}
                    className="bg-purple-500 text-white px-2 py-1 rounded"
                  >
                    Ver detalhes
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
      </div>
    </div>
  );
}
