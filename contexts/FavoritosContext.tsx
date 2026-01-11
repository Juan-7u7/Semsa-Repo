/**
 * ============================================================================
 * FAVORITOS CONTEXT - GESTOR DE MANUALES FAVORITOS
 * ============================================================================
 * Este contexto maneja la lista de manuales favoritos del usuario:
 * 
 * FUNCIONALIDADES:
 * - Agregar/eliminar manuales de favoritos
 * - Toggle rápido (agregar si no existe, eliminar si existe)
 * - Verificar si un manual es favorito
 * - Contar total de favoritos (para badge en tab bar)
 * 
 * PERSISTENCIA:
 * - Usa AsyncStorage para guardar favoritos localmente
 * - Los favoritos persisten entre sesiones de la app
 * - Carga automática al iniciar la app
 * 
 * SINCRONIZACIÓN:
 * - Estado global accesible desde toda la app
 * - Actualización en tiempo real del badge del tab bar
 * ============================================================================
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

/**
 * INTERFACE DEL CONTEXTO
 * Define métodos para gestionar favoritos
 */
interface FavoritosContextType {
  favoritos: number[];                    // Array de IDs de manuales favoritos
  agregarFavorito: (id: number) => void;  // Agregar manual a favoritos
  eliminarFavorito: (id: number) => void; // Quitar manual de favoritos
  toggleFavorito: (id: number) => void;   // Toggle: agregar/quitar
  esFavorito: (id: number) => boolean;    // Verificar si es favorito
  cantidadFavoritos: number;              // Total de favoritos (para badge)
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
  const [loaded, setLoaded] = useState(false);

  // Cargar favoritos al iniciar
  useEffect(() => {
    const loadFavoritos = async () => {
        try {
            const stored = await AsyncStorage.getItem('favoritos');
            if (stored) {
                setFavoritos(JSON.parse(stored));
            }
        } catch (e) {
            console.error("Error cargando favoritos:", e);
        } finally {
            setLoaded(true);
        }
    };
    loadFavoritos();
  }, []);

  // Guardar favoritos cuando cambian (solo si ya se cargaron)
  useEffect(() => {
    if (loaded) {
        AsyncStorage.setItem('favoritos', JSON.stringify(favoritos)).catch(e => console.error("Error guardando favoritos:", e));
    }
  }, [favoritos, loaded]);

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
