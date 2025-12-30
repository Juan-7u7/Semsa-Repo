import { useTheme } from '@/contexts/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function AnimatedTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  
  const totalTabs = state.routes.length;
  // Ancho aproximado de cada tab, considerando un margen horizontal si lo hubiera
  // Aquí asumimos ancho completo dividido
  const tabWidth = SCREEN_WIDTH / totalTabs;

  // Animación del indicador de fondo
  const indicatorPosition = useSharedValue(0);

  useEffect(() => {
    indicatorPosition.value = withSpring(state.index * tabWidth, {
      damping: 25,
      stiffness: 150,
    });
  }, [state.index, tabWidth]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorPosition.value }],
    };
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#000000' : '#FFFFFF',
          paddingBottom: insets.bottom + 8, // Ajuste para SafeArea
          paddingTop: 12,
        },
      ]}
    >
      {/* Indicador deslizante de fondo */}
      <Animated.View
        style={[
          styles.indicator,
          {
            width: tabWidth * 0.6, // No ocupar todo el ancho, más estilo "píldora"
            left: tabWidth * 0.2, // Centrar en el espacio del tab (20% margin left)
            backgroundColor: isDark ? '#1A1A1A' : '#F4F4F5',
          },
          animatedIndicatorStyle,
        ]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        
        // Mapeo de iconos
        let iconName: React.ComponentProps<typeof FontAwesome>['name'] = 'circle';
        if (route.name === 'index') iconName = 'th-large';
        if (route.name === 'two') iconName = 'star';

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
            <TabItem
                key={route.key}
                isFocused={isFocused}
                onPress={onPress}
                icon={iconName}
                label={label as string}
                colors={colors}
                width={tabWidth}
            />
        );
      })}
    </View>
  );
}

function TabItem({ isFocused, onPress, icon, label, colors, width }: any) {
    const scale = useSharedValue(1);

    useEffect(() => {
        // Efecto de "rebote" al enfocar
        if (isFocused) {
            scale.value = withSpring(1.1, {}, () => {
                scale.value = withSpring(1);
            });
        }
    }, [isFocused]);

    const animatedIconStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.tabItem, { width }]}
        >
            <Animated.View style={[styles.contentContainer, animatedIconStyle]}>
                <FontAwesome
                    name={icon}
                    size={24}
                    color={isFocused ? colors.primary : colors.textMuted}
                    style={{ marginBottom: 4 }}
                />
                <Text
                    style={[
                        styles.label,
                        {
                            color: isFocused ? colors.primary : colors.textMuted,
                            fontWeight: isFocused ? '700' : '500',
                        },
                    ]}
                >
                    {label}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    elevation: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    zIndex: 100, // Ensure it's above other content
    position: 'relative', // For proper stacking context
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    zIndex: 1, // Ensure tabs are clickable
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    userSelect: 'none', // Prevent text selection on web
  },
  indicator: {
    position: 'absolute',
    top: 12,
    height: 50,
    borderRadius: 25,
    zIndex: 0, // Behind the tabs
  },
});
