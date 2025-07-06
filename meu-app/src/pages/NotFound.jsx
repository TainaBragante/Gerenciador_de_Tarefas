import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="app-container">
      <h1>404 — Página não encontrada</h1>
      <p>Desculpe, a rota que você tentou acessar não existe.</p>
      <button onClick={() => navigate('/')} className="btn-home">
        Voltar para o início
      </button>
    </div>
  );
}
