import { type MarcaManual, type TipoManual } from '@/constants/Manuales';
import { useTheme } from '@/contexts/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery?: string;
  onMarcaFilter?: (marca: MarcaManual | null) => void;
  onTipoFilter?: (tipo: TipoManual | null) => void;
  marcaSeleccionada?: MarcaManual | null;
  tipoSeleccionado?: TipoManual | null;
}

/**
 * Header atractivo con selector de tema, barra de búsqueda y filtros por chips
 * 
 * @param onSearch - Callback que se ejecuta cuando cambia el texto de búsqueda
 * @param searchQuery - Valor actual de la búsqueda (opcional, para control externo)
 * @param onMarcaFilter - Callback para filtrar por marca
 * @param onTipoFilter - Callback para filtrar por tipo
 * @param marcaSeleccionada - Marca actualmente seleccionada
 * @param tipoSeleccionado - Tipo actualmente seleccionado
 * 
 * @example
 * ```tsx
 * <Header 
 *   onSearch={(query) => setSearchQuery(query)}
 *   onMarcaFilter={(marca) => setMarcaFiltro(marca)}
 *   onTipoFilter={(tipo) => setTipoFiltro(tipo)}
 *   searchQuery={searchQuery}
 *   marcaSeleccionada={marcaFiltro}
 *   tipoSeleccionado={tipoFiltro}
 * />
 * ```
 */
export default function Header({
  onSearch,
  searchQuery: externalQuery,
  onMarcaFilter,
  onTipoFilter,
  marcaSeleccionada,
  tipoSeleccionado,
}: HeaderProps) {
  const { colors, isDark, toggleTheme } = useTheme();
  const [internalQuery, setInternalQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Usar query externa si está disponible, sino usar interna
  const searchQuery = externalQuery !== undefined ? externalQuery : internalQuery;

  const handleSearchChange = (text: string) => {
    if (externalQuery === undefined) {
      setInternalQuery(text);
    }
    onSearch(text);
  };

  const clearSearch = () => {
    handleSearchChange('');
  };

  // Marcas disponibles
  const marcas: MarcaManual[] = ['Yale', 'Jet', 'Harrington'];

  // Tipos disponibles (con opción "Todos")
  const tipos: (TipoManual | 'Todos')[] = ['Todos', 'Eléctrico', 'Manual'];

  const handleMarcaPress = (marca: MarcaManual) => {
    if (onMarcaFilter) {
      // Si ya está seleccionada, deseleccionar
      onMarcaFilter(marcaSeleccionada === marca ? null : marca);
    }
  };

  const handleTipoPress = (tipo: TipoManual | 'Todos') => {
    if (onTipoFilter) {
      onTipoFilter(tipo === 'Todos' ? null : tipo);
    }
  };

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderBottomColor: colors.border,
        shadowColor: colors.shadow,
      }}
      className="border-b shadow-md"
    >
      {/* Container principal con padding */}
      <View className="px-4 pt-3 pb-4">
        {/* Fila superior: Logo/Título y Selector de Tema */}
        <View className="flex-row items-center justify-between mb-4">
          {/* Logo y Título */}
          <View className="flex-row items-center flex-1">
            <View
              style={{ backgroundColor: colors.primary }}
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
            >
              <FontAwesome name="book" size={20} color="#FFFFFF" />
            </View>
            <View>
              <Text
                style={{ color: colors.text }}
                className="text-xl font-bold"
              >
                Manuales
              </Text>
              <Text
                style={{ color: colors.textSecondary }}
                className="text-xs"
              >
                Catálogo de equipos
              </Text>
            </View>
          </View>

          {/* Selector de Tema */}
          <TouchableOpacity
            onPress={toggleTheme}
            style={{
              backgroundColor: isDark ? colors.backgroundSecondary : colors.primary + '20',
              borderColor: colors.primary,
            }}
            className="w-12 h-12 rounded-full items-center justify-center border-2"
            activeOpacity={0.7}
          >
            <FontAwesome
              name={isDark ? 'sun-o' : 'moon-o'}
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Barra de Búsqueda */}
        <View
          style={{
            backgroundColor: isDark ? colors.backgroundSecondary : colors.background,
            borderColor: isSearchFocused ? colors.primary : colors.border,
            shadowColor: isSearchFocused ? colors.primary : colors.shadow,
          }}
          className={`flex-row items-center px-4 py-3 rounded-xl border-2 ${
            isSearchFocused ? 'shadow-lg' : 'shadow-sm'
          }`}
        >
          {/* Icono de búsqueda */}
          <FontAwesome
            name="search"
            size={18}
            color={isSearchFocused ? colors.primary : colors.textMuted}
            style={{ marginRight: 12 }}
          />

          {/* Input de búsqueda */}
          <TextInput
            value={searchQuery}
            onChangeText={handleSearchChange}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Buscar manuales..."
            placeholderTextColor={colors.textMuted}
            style={{ color: colors.text }}
            className="flex-1 text-base"
          />

          {/* Botón para limpiar búsqueda */}
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={clearSearch}
              style={{ backgroundColor: colors.textMuted + '30' }}
              className="w-6 h-6 rounded-full items-center justify-center ml-2"
              activeOpacity={0.7}
            >
              <FontAwesome name="times" size={12} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Fila 1: Filtro por Marca */}
        <View className="mt-4">
          <Text
            style={{ color: colors.textSecondary }}
            className="text-xs font-semibold mb-2 uppercase tracking-wide"
          >
            Marca
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row"
            contentContainerStyle={{ gap: 8 }}
          >
            {marcas.map((marca) => {
              const isSelected = marcaSeleccionada === marca;
              return (
                <TouchableOpacity
                  key={marca}
                  onPress={() => handleMarcaPress(marca)}
                  style={{
                    backgroundColor: isSelected ? colors.primary : colors.card,
                    borderColor: isSelected ? colors.primary : colors.border,
                  }}
                  className="px-4 py-2 rounded-full border-2"
                  activeOpacity={0.7}
                >
                  <Text
                    style={{
                      color: isSelected ? '#FFFFFF' : colors.text,
                    }}
                    className="text-sm font-semibold"
                  >
                    {marca}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Fila 2: Filtro por Tipo de Funcionamiento */}
        <View className="mt-3">
          <Text
            style={{ color: colors.textSecondary }}
            className="text-xs font-semibold mb-2 uppercase tracking-wide"
          >
            Funcionamiento
          </Text>
          <View className="flex-row gap-2">
            {tipos.map((tipo) => {
              const isSelected =
                tipo === 'Todos'
                  ? tipoSeleccionado === null
                  : tipoSeleccionado === tipo;
              return (
                <TouchableOpacity
                  key={tipo}
                  onPress={() => handleTipoPress(tipo)}
                  style={{
                    backgroundColor: isSelected ? colors.primary : colors.card,
                    borderColor: isSelected ? colors.primary : colors.border,
                  }}
                  className="flex-1 px-4 py-2 rounded-full border-2 items-center"
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center">
                    {tipo !== 'Todos' && (
                      <FontAwesome
                        name={tipo === 'Eléctrico' ? 'bolt' : 'wrench'}
                        size={12}
                        color={isSelected ? '#FFFFFF' : colors.text}
                        style={{ marginRight: 6 }}
                      />
                    )}
                    <Text
                      style={{
                        color: isSelected ? '#FFFFFF' : colors.text,
                      }}
                      className="text-sm font-semibold"
                    >
                      {tipo}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Indicador de filtros activos */}
        {(searchQuery.length > 0 || marcaSeleccionada || tipoSeleccionado) && (
          <View className="mt-3 flex-row items-center flex-wrap gap-2">
            <FontAwesome
              name="filter"
              size={12}
              color={colors.textSecondary}
            />
            <Text style={{ color: colors.textSecondary }} className="text-xs">
              Filtros activos:
            </Text>
            {searchQuery.length > 0 && (
              <View
                style={{ backgroundColor: colors.primary + '20' }}
                className="px-2 py-1 rounded-md"
              >
                <Text style={{ color: colors.primary }} className="text-xs font-semibold">
                  "{searchQuery}"
                </Text>
              </View>
            )}
            {marcaSeleccionada && (
              <View
                style={{ backgroundColor: colors.primary + '20' }}
                className="px-2 py-1 rounded-md"
              >
                <Text style={{ color: colors.primary }} className="text-xs font-semibold">
                  {marcaSeleccionada}
                </Text>
              </View>
            )}
            {tipoSeleccionado && (
              <View
                style={{ backgroundColor: colors.primary + '20' }}
                className="px-2 py-1 rounded-md"
              >
                <Text style={{ color: colors.primary }} className="text-xs font-semibold">
                  {tipoSeleccionado}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
