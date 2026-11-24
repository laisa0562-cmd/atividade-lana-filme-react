import { useEffect, useState } from 'react';
import './App.css';

type Filme = {
  id: number;
  nome?: string;
  titulo?: string;
};

function App() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function buscarFilmes() {
      try {
        const resposta = await fetch('/api/filmes');

        if (!resposta.ok) {
          throw new Error('Não foi possível buscar os filmes.');
        }

        const dados: Filme[] = await resposta.json();
        setFilmes(dados);
      } catch (erro) {
        setErro('Erro ao carregar os filmes. Verifique a API.');
      } finally {
        setCarregando(false);
      }
    }

    buscarFilmes();
  }, []);

  return (
    <main className="container">
      <h1>Minha Lista de Filmes</h1>

      {carregando && <p>Carregando filmes...</p>}

      {erro && <p>{erro}</p>}

      {!carregando && !erro && filmes.length === 0 && (
        <p>Nenhum filme encontrado.</p>
      )}

      {!erro && (
        <ul>
          {filmes.map((filme) => (
            <li key={filme.id}>
              {filme.titulo || filme.nome || `Filme ${filme.id}`}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
