import './globals.css';
import dynamic from 'next/dynamic';

const FloorPlan = dynamic(() => import('./components/FloorPlan'), { ssr: false });

export default function Page() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <FloorPlan />
    </main>
  );
}
