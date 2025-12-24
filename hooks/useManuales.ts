import { MANUALES } from '@/constants/Manuales';
import { MarcaManual, TipoManual } from '@/types/manual';
import { useMemo, useState } from 'react';

export const useManuales = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarca, setSelectedMarca] = useState<MarcaManual | null>(null);
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
        Jet: MANUALES.filter(m => m.marca === 'Jet').length,
        Harrington: MANUALES.filter(m => m.marca === 'Harrington').length,
      }
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
