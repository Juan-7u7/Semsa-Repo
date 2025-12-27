import PdfReader from '@/components/PdfReader';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function ReaderScreen() {
  const { uri, title, id } = useLocalSearchParams();
  
  return <PdfReader uri={uri as string} title={title as string} id={id ? Number(id) : undefined} />;
}
