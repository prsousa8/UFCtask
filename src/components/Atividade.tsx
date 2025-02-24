type Atividade = {
    titulo: string;
    responsavel: string;
    data: string;
    descricao: string;
    status: string;  // Adicionado campo 'status'
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

function styleStatus(status: string) {
    let aux = "";

    if (status === "Pendente") {
        aux = "text-yellow-500 font-semibold";
    } else if (status === "Concluída") {
        aux = "text-green-500 font-semibold";
    } else {
        aux = "text-blue-500 font-semibold";
    }
    return aux;
}

export function Atividade(atividade: Atividade) {
    return (
        <>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{atividade.titulo}</h3>
            <p className="text-gray-600 mb-4">
                <strong>Responsável:</strong> {atividade.responsavel}
            </p>
            <p className="text-gray-600 mb-4">
                <strong>Data:</strong> {formatDate(new Date(atividade.data).toISOString().split('T')[0])}
            </p>
            {atividade.descricao !== "" && (
                <p className="text-gray-600 mb-4">
                    <strong>Descrição:</strong> {atividade.descricao}
                </p>
            )}

            <p className={styleStatus(atividade.status)}>Status: {atividade.status}</p>
        </>
    )
}