import type { Component } from 'vue';

export interface Service {
  id: number;
  title: string;
  description?: string;
  icon: string | Component;
}