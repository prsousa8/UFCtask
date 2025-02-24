type props = {
    titulo: string;
    descricao: string;
}

export function Card({titulo, descricao}:props){
    return(
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">{titulo}</h3>
          <p className="text-gray-600 mb-4">{descricao}</p>
        </div>
    )
}