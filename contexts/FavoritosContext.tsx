import React, { createContext, ReactNode, useContext, useState } from 'react';

/**
 * Tipo para el contexto de favoritos
 */
interface FavoritosContextType {
  favoritos: number[];
  agregarFavorito: (id: number) => void;
  eliminarFavorito: (id: number) => void;
  toggleFavorito: (id: number) => void;
  esFavorito: (id: number) => boolean;
  cantidadFavoritos: number;
}

/**
 * Context de favoritos
 */
const FavoritosContext = createContext<FavoritosContextType | undefined>(undefined);

/**
 * Props del FavoritosProvider
 */
interface FavoritosProviderProps {
  children: ReactNode;
}

/**
 * Provider de favoritos que maneja el estado de los manuales favoritos
 * 
 * @example
 * ```tsx
 * <FavoritosProvider>
 *   <App />
 * </FavoritosProvider>
 * ```
 */
export function FavoritosProvider({ children }: FavoritosProviderProps) {
  const [favoritos, setFavoritos] = useState<number[]>([]);

  /**
   * Agregar un manual a favoritos
   */
  const agregarFavorito = (id: number) => {
    setFavoritos((prev) => {
      if (prev.includes(id)) {
        return prev; // Ya existe, no hacer nada
      }
      return [...prev, id];
    });
  };

  /**
   * Eliminar un manual de favoritos
   */
  const eliminarFavorito = (id: number) => {
    setFavoritos((prev) => prev.filter((favId) => favId !== id));
  };

  /**
   * Alternar el estado de favorito (agregar si no existe, eliminar si existe)
   */
  const toggleFavorito = (id: number) => {
    setFavoritos((prev) => {
      if (prev.includes(id)) {
        return prev.filter((favId) => favId !== id);
      }
      return [...prev, id];
    });
  };

  /**
   * Verificar si un manual es favorito
   */
  const esFavorito = (id: number): boolean => {
    return favoritos.includes(id);
  };

  const value: FavoritosContextType = {
    favoritos,
    agregarFavorito,
    eliminarFavorito,
    toggleFavorito,
    esFavorito,
    cantidadFavoritos: favoritos.length,
  };

  return <FavoritosContext.Provider value={value}>{children}</FavoritosContext.Provider>;
}

/**
 * Hook para acceder al contexto de favoritos
 * 
 * @returns Objeto con el estado de favoritos y funciones para modificarlo
 * 
 * @example
 * ```tsx
 * const { favoritos, toggleFavorito, esFavorito } = useFavoritos();
 * 
 * return (
 *   <TouchableOpacity onPress={() => toggleFavorito(manual.id)}>
 *     <FontAwesome 
 *       name={esFavorito(manual.id) ? 'star' : 'star-o'}
 *       color="#FFB800"
 *     />
 *   </TouchableOpacity>
 * );
 * ```
 */
export function useFavoritos(): FavoritosContextType {
  const context = useContext(FavoritosContext);
  
  if (context === undefined) {
    throw new Error('useFavoritos debe ser usado dentro de un FavoritosProvider');
  }
  
  return context;
}
