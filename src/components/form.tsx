"use client";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  id?: string; // Agora inclui o ID para saber qual atividade editar
  titulo: string;
  responsavel: string;
  data: string;
  descricao: string;
  status: string; // Novo campo para o status da atividade
};

type FormProps = {
  atividade: FormData | null;
  onSubmit: SubmitHandler<FormData>;
};

export default function Form({ atividade, onSubmit }: FormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue, // Usado para definir os valores do formulário ao editar
    reset, // Função para limpar os campos
  } = useForm<FormData>();

  // Se houver uma atividade, preenche os campos com os dados dela
  useEffect(() => {
    if (atividade) {
      const formattedDate = new Date(atividade.data).toISOString().split('T')[0];
      // Garantir que a data esteja no formato 'YYYY-MM-DD'
      setValue("titulo", atividade.titulo);
      setValue("responsavel", atividade.responsavel);
      setValue("data", formattedDate); // Para preencher a data no formato correto
      setValue("descricao", atividade.descricao);
      setValue("status", atividade.status); // Preencher o status
    }
  }, [atividade, setValue]);

  // Função para limpar os campos
  const clearForm = () => {
    reset();
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {atividade ? "Editar Atividade" : "Cadastrar Atividade"}
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          {atividade ? "Edite os dados da atividade abaixo." : "Cadastre uma nova atividade."}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)} // Removemos o onError
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div>
          <div>
            <label
              htmlFor="titulo"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Título
            </label>
            <div className="mt-2.5">
              <input
                {...register("titulo", {
                  required: "Título é requerido.",
                  minLength: {
                    value: 10,
                    message: "Título precisa ter pelo menos 10 caracteres",
                  },
                })}
                type="text"
                name="titulo"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors?.titulo && (
                <span className="text-red-700">{errors.titulo.message}</span>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="responsavel"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Responsável
            </label>
            <div className="mt-2.5">
              <input
                {...register("responsavel", { required: "Responsável é obrigatório." })}
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors?.responsavel && (
                <span className="text-red-700">{errors.responsavel.message}</span>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="data"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Data
            </label>
            <div className="mt-2.5">
              <input
                {...register("data", {
                  required: "Data é obrigatória.",
                  setValueAs: (value) => (value ? new Date(value).toISOString().split('T')[0] : ""),
                })}
                type="date"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors?.data && <span className="text-red-700">{errors.data.message}</span>}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="descricao"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Descrição
            </label>
            <div className="mt-2.5">
              <input
                {...register("descricao", { required: "Descrição é obrigatória." })}
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors?.descricao && (
                <span className="text-red-700">{errors.descricao.message}</span>
              )}
            </div>
          </div>
          {/* Campo de Status */}
          <div className="sm:col-span-2">
            <label
              htmlFor="status"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Status
            </label>
            <div className="mt-2.5">
              <select
                {...register("status", { required: "Status é obrigatório." })}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="Em andamento">Em andamento</option>
                <option value="Concluída">Concluída</option>
                <option value="Pendente">Pendente</option>
              </select>
              {errors?.status && <span className="text-red-700">{errors.status.message}</span>}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {atividade ? "Salvar Alterações" : "Cadastrar Atividade"}
          </button>
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={clearForm}
            className="block w-full rounded-md bg-gray-300 px-3.5 py-2.5 text-center text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Limpar Campos
          </button>
        </div>
      </form>
    </div>
  );
}
