"use client"
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';


// Composants d'icônes simples en SVG
const User = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const Search = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const Plus = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

const Edit = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const Trash = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    <line x1="10" y1="11" x2="10" y2="17"/>
    <line x1="14" y1="11" x2="14" y2="17"/>
  </svg>
);

const Save = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17,21 17,13 7,13 7,21"/>
    <polyline points="7,3 7,8 15,8"/>
  </svg>
);

const X = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const Loader = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`loader ${className}`}>
    <line x1="12" y1="2" x2="12" y2="6"/>
    <line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
    <line x1="2" y1="12" x2="6" y2="12"/>
    <line x1="18" y1="12" x2="22" y2="12"/>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
  </svg>
);

// 🔄 CYCLE DE VIE PRINCIPAL - Gestion des utilisateurs
export default function UserManagementApp() {
    const router = useRouter();
  // États principaux
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [error, setError] = useState(null);

  // 🟢 MONTAGE - Charger les données initiales
  useEffect(() => {
    console.log('🟢 App MONTÉE - Chargement initial');
    loadUsers();
    
    // Simule un timer pour rafraîchir périodiquement
    const interval = setInterval(() => {
      console.log('⏰ Rafraîchissement automatique');
      loadUsers();
    }, 30000); // 30 secondes

    // 🔴 DÉMONTAGE - Nettoyage
    return () => {
      console.log('🔴 App DÉMONTÉE - Nettoyage timer');
      clearInterval(interval);
    };
  }, []); // [] = seulement au montage

  // 🔄 MISE À JOUR - Réagir aux changements de recherche
  useEffect(() => {
    if (searchTerm) {
      console.log('🔍 Recherche changée:', searchTerm);
      // Débounce la recherche (attendre 500ms après arrêt de frappe)
      const debounceTimer = setTimeout(() => {
        console.log('🔍 Exécution recherche pour:', searchTerm);
        // Ici on pourrait faire une vraie recherche API
      }, 500);

      return () => {
        console.log('🔍 Annulation recherche précédente');
        clearTimeout(debounceTimer);
      };
    }
  }, [searchTerm]);

  // 📡 FONCTION ASYNC - Simule appel API
  const loadUsers = useCallback(async () => {
    console.log('📡 Début chargement utilisateurs...');
    setLoading(true);
    setError(null);

    try {
      // Simule une API avec délai
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Données mockées
      const mockUsers = [
        { id: 1, name: 'Alice Martin', email: 'alice@example.com', status: 'active' },
        { id: 2, name: 'Bob Dupont', email: 'bob@example.com', status: 'inactive' },
        { id: 3, name: 'Claire Moreau', email: 'claire@example.com', status: 'active' },
        { id: 4, name: 'David Laurent', email: 'david@example.com', status: 'active' }
      ];

      console.log('✅ Utilisateurs chargés:', mockUsers.length);
      setUsers(mockUsers);
    } catch (err) {
      console.error('❌ Erreur chargement:', err);
      setError('Erreur de chargement des utilisateurs');
    } finally {
      setLoading(false);
      console.log('📡 Fin chargement utilisateurs');
    }
  }, []);

  // 🔄 CALCUL OPTIMISÉ - Filtrage utilisateurs
  const filteredUsers = useMemo(() => {
    console.log('🧮 Recalcul filtrage pour:', searchTerm);
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // 📝 ACTIONS CRUD
  const addUser = async () => {
    if (!newUser.name.trim() || !newUser.email.trim()) return;
    
    console.log('➕ Ajout utilisateur:', newUser);
    setLoading(true);
    
    try {
      // Simule API POST
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = {
        id: Date.now(),
        ...newUser,
        status: 'active'
      };
      
      setUsers(prev => [...prev, user]);
      setNewUser({ name: '', email: '' });
      console.log('✅ Utilisateur ajouté');
    } catch (err) {
      setError('Erreur lors de l\'ajout');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedUser) => {
    console.log('✏️ Mise à jour utilisateur:', updatedUser);
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUsers(prev => prev.map(user => 
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      ));
      setEditingUser(null);
      console.log('✅ Utilisateur mis à jour');
    } catch (err) {
      setError('Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    console.log('🗑️ Suppression utilisateur:', userId);
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUsers(prev => prev.filter(user => user.id !== userId));
      console.log('✅ Utilisateur supprimé');
    } catch (err) {
      setError('Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        .app {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
          overflow: hidden;
        }

        .card-content {
          padding: 2rem;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 2rem;
          font-weight: bold;
          color: #1a202c;
          margin: 0;
        }

        .subtitle {
          color: #718096;
          margin: 0.5rem 0 0 0;
        }

        .loading-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #3182ce;
          font-weight: 500;
        }

        .search-container {
          position: relative;
          margin-top: 1rem;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 0.75rem 0.75rem 2.5rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .search-input:focus {
          outline: none;
          border-color: #3182ce;
          box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #a0aec0;
        }

        .form-section {
          display: flex;
          gap: 1rem;
          align-items: end;
        }

        .form-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #2d3748;
        }

        .input {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .input:focus {
          outline: none;
          border-color: #3182ce;
          box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-primary {
          background: #3182ce;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #2c5aa0;
        }

        .btn-success {
          background: #38a169;
          color: white;
        }

        .btn-success:hover:not(:disabled) {
          background: #2f855a;
        }

        .btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          background: none;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-icon:hover:not(:disabled) {
          background: #f7fafc;
        }

        .btn-icon.edit {
          color: #3182ce;
        }

        .btn-icon.delete {
          color: #e53e3e;
        }

        .btn-icon.save {
          color: #38a169;
        }

        .btn-icon.cancel {
          color: #718096;
        }

        .error {
          background: #fed7d7;
          border: 2px solid #feb2b2;
          color: #c53030;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        .empty-state {
          padding: 3rem;
          text-align: center;
          color: #718096;
          font-size: 1.1rem;
        }

        .user-list {
          border-top: 1px solid #e2e8f0;
        }

        .user-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          transition: background-color 0.2s;
        }

        .user-row:hover {
          background: #f7fafc;
        }

        .user-row.editing {
          background: #ebf8ff;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .user-avatar {
          width: 3rem;
          height: 3rem;
          background: #e6fffa;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #319795;
        }

        .user-details h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #2d3748;
        }

        .user-details p {
          margin: 0.25rem 0 0 0;
          color: #718096;
          font-size: 0.9rem;
        }

        .user-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-active {
          background: #c6f6d5;
          color: #22543d;
        }

        .status-inactive {
          background: #e2e8f0;
          color: #4a5568;
        }

        .edit-form {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .debug-console {
          margin-top: 1.5rem;
          background: #1a202c;
          color: #68d391;
          padding: 1rem;
          border-radius: 8px;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
        }

        .debug-title {
          color: white;
          margin-bottom: 0.5rem;
        }

        .debug-line {
          margin: 0.25rem 0;
        }

        .loader {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .app {
            padding: 1rem;
          }
          
          .form-section {
            flex-direction: column;
            align-items: stretch;
          }
          
          .input {
            margin-bottom: 1rem;
          }
        }
      `}</style>

      <div className="app">
        <div className="container">
          {/* Header avec stats */}
          <div className="card">
            <div className="card-content">
              <div className="header">
                <div>
                  <h1 className="title">
                    <User className="title-icon" />
                    Gestion Utilisateurs
                  </h1>
                  <p className="subtitle">
                    {filteredUsers.length} utilisateur{filteredUsers.length !== 1 ? 's' : ''} 
                    {searchTerm && ` (filtré${filteredUsers.length !== 1 ? 's' : ''})`}
                  </p>
                </div>
                {loading && (
                  <div className="loading-indicator">
                    <Loader size={20} />
                    Chargement...
                  </div>
                )}
              </div>

              {/* Recherche */}
              <div className="search-container">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher par nom ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
          </div>

          {/* Formulaire ajout */}
          <div className="card">
            <div className="card-content">
              <h2 className="form-title">
                <Plus />
                Ajouter un utilisateur
              </h2>
              <div className="form-section">
                <input
                  type="text"
                  placeholder="Nom complet"
                  value={newUser.name}
                  onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                  className="input"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  className="input"
                />
                <button
                  onClick={addUser}
                  disabled={loading || !newUser.name.trim() || !newUser.email.trim()}
                  className="btn btn-success"
                >
                  <Plus size={16} />
                  Ajouter
                </button>
              </div>
            </div>
          </div>

          {/* Messages d'erreur */}
          {error && (
            <div className="error">
              {error}
            </div>
          )}

          {/* Liste des utilisateurs */}
          <div className="card">
            {filteredUsers.length === 0 ? (
              <div className="empty-state">
                {searchTerm ? 'Aucun utilisateur trouvé' : 'Aucun utilisateur'}
              </div>
            ) : (
              <div className="user-list">
                {filteredUsers.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    isEditing={editingUser?.id === user.id}
                    onEdit={setEditingUser}
                    onUpdate={updateUser}
                    onDelete={deleteUser}
                    disabled={loading}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Debug Console */}
          <div className="debug-console">
            <div className="debug-title">🔍 Console Debug (regardez la console du navigateur):</div>
            <div className="debug-line">• Total utilisateurs: {users.length}</div>
            <div className="debug-line">• Utilisateurs filtrés: {filteredUsers.length}</div>
            <div className="debug-line">• Terme de recherche: "{searchTerm}"</div>
            <div className="debug-line">• Chargement: {loading ? 'Oui' : 'Non'}</div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">  
                <button onClick={() => router.push('/todo')} >page arriere</button>
            </div>
    </>
  );
}

// 🧩 COMPOSANT ENFANT - Démontre le cycle de vie d'un composant réutilisable
function UserRow({ user, isEditing, onEdit, onUpdate, onDelete, disabled }) {
  const [editForm, setEditForm] = useState({ name: '', email: '' });

  // 🔄 MISE À JOUR quand l'utilisateur change
  useEffect(() => {
    if (isEditing) {
      console.log('✏️ Mode édition activé pour:', user.name);
      setEditForm({ name: user.name, email: user.email });
    }
  }, [isEditing, user]);

  // 🔴 DÉMONTAGE - Nettoyage si nécessaire
  useEffect(() => {
    return () => {
      if (isEditing) {
        console.log('🔴 Composant UserRow démonté en mode édition');
      }
    };
  }, [isEditing]);

  const handleSave = () => {
    console.log('💾 Sauvegarde pour:', user.id);
    onUpdate({ ...user, ...editForm });
  };

  const handleDelete = () => {
    if (window.confirm(`Supprimer ${user.name} ?`)) {
      console.log('🗑️ Confirmation suppression:', user.name);
      onDelete(user.id);
    }
  };

  if (isEditing) {
    return (
      <div className="user-row editing">
        <div className="edit-form">
          <input
            type="text"
            value={editForm.name}
            onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
            className="input"
          />
          <input
            type="email"
            value={editForm.email}
            onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
            className="input"
          />
          <div className="user-actions">
            <button
              onClick={handleSave}
              disabled={disabled}
              className="btn-icon save"
            >
              <Save size={16} />
            </button>
            <button
              onClick={() => onEdit(null)}
              disabled={disabled}
              className="btn-icon cancel"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-row">
      <div className="user-info">
        <div className="user-avatar">
          <User size={20} />
        </div>
        <div className="user-details">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="user-actions">
        <span className={`status-badge ${user.status === 'active' ? 'status-active' : 'status-inactive'}`}>
          {user.status}
        </span>
        <button
          onClick={() => onEdit(user)}
          disabled={disabled}
          className="btn-icon edit"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={handleDelete}
          disabled={disabled}
          className="btn-icon delete"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
}