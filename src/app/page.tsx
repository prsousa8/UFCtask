export default function Home() {
  return (
    <div>
      <section
        style={{
          backgroundImage: "url('/assets/Polygon.svg')", // Caminho correto
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "50vh",
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}
      >
        <h1 style={{fontSize: '25px', color: 'cornsilk'}}>Olá, Sejam Bem Vindos a <strong style={{color: 'orangered'}}>UFCTask</strong>, sua plataforma de gerenciamento de atividades!</h1>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 -mt-4">
        {/* Card de Cadastro de Atividades */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Cadastro de Atividades</h3>
          <p className="text-gray-600 mb-4">
            Registre novas atividades para um controle eficiente.
          </p>
        </div>

        {/* Card de Listagem de Atividades */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Listagem de Atividades</h3>
          <p className="text-gray-600 mb-4">
            Visualize todas as atividades cadastradas.
          </p>
        </div>

        {/* Card de Edição de Atividades */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Edição de Atividades</h3>
          <p className="text-gray-600 mb-4">
            Edite ou remova as informações de atividades existentes.
          </p>
        </div>
      </div>
    </div>
  );
}
