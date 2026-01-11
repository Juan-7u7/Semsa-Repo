/**
 * ============================================================================
 * CUSTOM HOOK: useManuales
 * ============================================================================
 * Hook personalizado que encapsula toda la lógica de búsqueda y filtrado
 * de manuales, simplificando el componente que lo consume.
 * 
 * FUNCIONALIDADES:
 * - Gestión de estado de búsqueda (query de texto)
 * - Gestión de filtros (marca y tipo)
 * - Filtrado combinado en tiempo real
 * - Cálculo de estadísticas del catálogo
 * - Memoización para optimización de performance
 * 
 * RETORNA:
 * - manuales: Array filtrado según criterios activos
 * - searchQuery: Texto actual de búsqueda
 * - setSearchQuery: Función para actualizar búsqueda
 * - selectedMarca: Marca seleccionada (null = todas)
 * - setSelectedMarca: Función para filtrar por marca
 * - selectedTipo: Tipo seleccionado (null = todos)
 * - setSelectedTipo: Función para filtrar por tipo
 * - estadisticas: Total filtrado, totales por marca y por tipo
 * 
 * OPTIMIZACIONES:
 * - useMemo para evitar recalcular filtros innecesariamente
 * - Dependencias correctas para re-render mínimo
 * ============================================================================
 */

import { MANUALES } from '@/constants/Manuales';
import { type Marca, type TipoManual } from '@/types/manual';
import { useMemo, useState } from 'react';

/**
 * HOOK PRINCIPAL
 * Exporta lógica de búsqueda, filtrado y estadísticas
 */
export const useManuales = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarca, setSelectedMarca] = useState<Marca | null>(null);
  const [selectedTipo, setSelectedTipo] = useState<TipoManual | null>(null);

  const filteredManuales = useMemo(() => {
    return MANUALES.filter((manual) => {
      // Filtro por texto
      const matchesSearch = manual.titulo
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      
      // Filtro por marca
      const matchesMarca = selectedMarca ? manual.marca === selectedMarca : true;

      // Filtro por tipo
      const matchesTipo = selectedTipo ? manual.tipo === selectedTipo : true;

      return matchesSearch && matchesMarca && matchesTipo;
    });
  }, [searchQuery, selectedMarca, selectedTipo]);

  const estadisticas = useMemo(() => {
    return {
      total: MANUALES.length,
      filtrados: filteredManuales.length,
      porMarca: {
        Yale: MANUALES.filter(m => m.marca === 'Yale').length,
        Harrington: MANUALES.filter(m => m.marca === 'Harrington').length,
        Accolift: MANUALES.filter(m => m.marca === 'Accolift').length,
        Budgit: MANUALES.filter(m => m.marca === 'Budgit').length,
        CM: MANUALES.filter(m => m.marca === 'CM').length,
        Cummings: MANUALES.filter(m => m.marca === 'Cummings').length,
        Demag: MANUALES.filter(m => m.marca === 'Demag').length,
        MIT: MANUALES.filter(m => m.marca === 'MIT').length,
        'R&M': MANUALES.filter(m => m.marca === 'R&M').length,
        Shawbox: MANUALES.filter(m => m.marca === 'Shawbox').length,
        Coffing: MANUALES.filter(m => m.marca === 'Coffing').length,
        Kito: MANUALES.filter(m => m.marca === 'Kito').length,
      },
    };
  }, [filteredManuales]);

  return {
    manuales: filteredManuales,
    searchQuery,
    setSearchQuery,
    selectedMarca,
    setSelectedMarca,
    selectedTipo,
    setSelectedTipo,
    estadisticas
  };
};
