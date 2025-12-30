import { useTheme } from '@/contexts/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  
  // Detect system theme on web as fallback
  const getBackgroundColor = () => {
    if (isDark !== undefined) {
      return isDark ? '#000000' : '#FFFFFF';
    }
    // Fallback for initial render on web
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? '#000000' : '#FFFFFF';
    }
    return '#FFFFFF'; // Default fallback
  };
  
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
          backgroundColor: getBackgroundColor(),
          paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 8,
          paddingTop: 12,
          width: '100%',
          // Web-specific positioning
          ...(Platform.OS === 'web' ? {
            position: 'fixed' as any,
            bottom: 0,
            left: 0,
            right: 0,
          } : {}),
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

        // Extract badge from options
        const badge = options.tabBarBadge;

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
                badge={badge}
                colors={colors}
                width={tabWidth}
            />
        );
      })}
    </View>
  );
}

function TabItem({ isFocused, onPress, icon, label, badge, colors, width }: any) {
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
                <View style={{ position: 'relative' }}>
                    <FontAwesome
                        name={icon}
                        size={24}
                        color={isFocused ? colors.primary : colors.textMuted}
                        style={{ marginBottom: 4 }}
                    />
                    {badge != null && badge > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
                        </View>
                    )}
                </View>
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
    zIndex: 100,
    position: 'relative',
    minHeight: 60, // Minimum height for touch targets
    width: '100%', // Ensure full width
    alignSelf: 'stretch', // Stretch to container width
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    zIndex: 1,
    flex: 1, // Equal width distribution
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    userSelect: 'none',
  },
  indicator: {
    position: 'absolute',
    top: 12,
    height: 50,
    borderRadius: 25,
    zIndex: 0,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#FFCC00',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '700',
  },
});
