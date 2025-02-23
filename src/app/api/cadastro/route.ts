import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "dados.json");

async function lerDados() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Criar uma nova atividade
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { titulo, responsavel, data: dataStr, descricao } = data;

    const novaAtividade = {
      id: crypto.randomUUID(),
      titulo,
      responsavel,
      data: new Date(dataStr),
      descricao,
    };

    const atividades = await lerDados();
    atividades.push(novaAtividade);
    await fs.writeFile(filePath, JSON.stringify(atividades, null, 2));

    return NextResponse.json({ message: "Atividade cadastrada!", atividade: novaAtividade });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao salvar os dados." }, { status: 500 });
  }
}

// Obter todas as atividades
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const atividades = await lerDados();

    if (id) {
      const atividade = atividades.find((atividade: any) => atividade.id === id);
      if (atividade) {
        return NextResponse.json({ atividade });
      } else {
        return NextResponse.json({ error: "Atividade não encontrada." }, { status: 404 });
      }
    } else {
      return NextResponse.json({ atividades });
    }
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar os dados." }, { status: 500 });
  }
}

// Editar uma atividade
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, titulo, responsavel, data: dataStr, descricao } = data;

    let atividades = await lerDados();
    atividades = atividades.map((atividade: any) =>
      atividade.id === id
        ? { ...atividade, titulo, responsavel, data: new Date(dataStr), descricao }
        : atividade
    );

    await fs.writeFile(filePath, JSON.stringify(atividades, null, 2));

    return NextResponse.json({ message: "Atividade editada!" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao editar a atividade." }, { status: 500 });
  }
}

// Excluir uma atividade
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    let atividades = await lerDados();
    atividades = atividades.filter((atividade: any) => atividade.id !== id);

    await fs.writeFile(filePath, JSON.stringify(atividades, null, 2));

    return NextResponse.json({ message: "Atividade removida!" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir a atividade." }, { status: 500 });
  }
}
