'use client'
import React, { useEffect, useState } from "react";

const App = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        const response = await fetch('/api/usuarios', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Erro ao buscar usuários');
        }
        const data = await response.json();
        setDados(data); // Atualiza o estado com os dados recebidos
      } catch (err) {
        alert(`Erro no Banco de Dados: ${err}`);
      }
    };
    buscarUsuarios();
  }, []);

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <section>
        <table className="min-w-full border border-gray-300 text-center">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-center">Nome</th>
              <th className="px-4 py-2 border-b text-center">Idade</th>
              <th className="px-4 py-2 border-b text-center">Email</th>
              <th className="px-4 py-2 border-b text-center">Telefone</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((usuario, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{usuario.nome}</td>
                <td className="border px-4 py-2">{usuario.idade}</td>
                <td className="border px-4 py-2">{usuario.email}</td>
                <td className="border px-4 py-2">{usuario.telefone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default App;