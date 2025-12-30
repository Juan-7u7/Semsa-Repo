import { AnimatedTabBar } from '@/components/AnimatedTabBar';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useFavoritos } from '@/contexts/FavoritosContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Tabs } from 'expo-router';
import React from 'react';

function TabLayoutContent() {
  const { colors } = useTheme();
  const { cantidadFavoritos } = useFavoritos();

  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Catálogo',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Favoritos',
          headerShown: false,
          tabBarBadge: cantidadFavoritos > 0 ? cantidadFavoritos : undefined,
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return <TabLayoutContent />;
}
