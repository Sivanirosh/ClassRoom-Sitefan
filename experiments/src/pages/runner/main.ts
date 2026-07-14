import { mount } from 'svelte';
import '../../styles/runner.css';
import App from './App.svelte';

const target = document.querySelector<HTMLDivElement>('#app');
if (!target) throw new Error('Missing #app mount point.');

mount(App, { target });
