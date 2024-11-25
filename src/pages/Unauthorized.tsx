export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Accès non autorisé</h1>
      <p className="text-gray-600">
        Vous n'avez pas les permissions nécessaires pour accéder à cette page.
      </p>
    </div>
  );
}