import { MANUALES } from '@/constants/Manuales';
import { type Marca, type TipoManual } from '@/types/manual';
import { useMemo, useState } from 'react';

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
