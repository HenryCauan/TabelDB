'use client'
import React, { useEffect, useState } from "react";

interface Usuario {
  id: number;
  nome: string;
  idade: number;
  email: string;
  telefone: string;
}

interface FormUsuario {
  nome: string;
  email: string;
}

const App = () => {
  const [dados, setDados] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
  const [form, setForm] = useState<FormUsuario>({ nome: '', email: '' });

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
      } finally {
        setCarregando(false);
      }
    };
    buscarUsuarios();
  }, []);

  const abrirModal = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setForm({ nome: usuario.nome, email: usuario.email });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setUsuarioSelecionado(null);
  };

  const atualizarUsuario = async () => {
    try {
      await fetch(`/api/usuarios/${usuarioSelecionado?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setDados(dados.map(u => u.id === usuarioSelecionado?.id ? { ...u, ...form } : u));
      fecharModal();
    } catch (err) {
      alert('Erro ao atualizar usuário');
    }
  };

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <section>
        {carregando ? (
          <p>Carregando...</p>
        ) : (
          // Aqui você pode renderizar os dados normalmente
          <table className="min-w-full border border-gray-300 text-center">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-center">Nome</th>
                <th className="px-4 py-2 border-b text-center">Idade</th>
                <th className="px-4 py-2 border-b text-center">Email</th>
                <th className="px-4 py-2 border-b text-center">Telefone</th>
                <th className="px-4 py-2 border-b text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((usuario, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{usuario.nome}</td>
                  <td className="border px-4 py-2">{usuario.idade}</td>
                  <td className="border px-4 py-2">{usuario.email}</td>
                  <td className="border px-4 py-2">{usuario.telefone}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => abrirModal(usuario)}>
                      {/* SVG de lápis */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 hover:text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m2-2l-6 6m2-2l6-6" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      {modalAberto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black text-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
            <h2 className="text-lg font-bold mb-4">Editar Usuário</h2>
            <label className="block mb-2">
              Nome:
              <input
                className="border w-full px-2 py-1"
                value={form.nome}
                onChange={e => setForm({ ...form, nome: e.target.value })}
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                className="border w-full px-2 py-1"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <div className="flex justify-end gap-2 mt-4">
              <button className="px-3 py-1 bg-gray-300 rounded" onClick={fecharModal}>Cancelar</button>
              <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={atualizarUsuario}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default App;