import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sonner } from '@/components/ui/sonner';
import ScrollProgress from '@/components/common/ScrollProgress';
import NoiseOverlay from '@/components/common/NoiseOverlay';
import ParticlesCanvas from '@/components/common/ParticlesCanvas';
import SmoothScrollProvider from '@/components/common/SmoothScrollProvider';
import {
  CursorProvider,
  CustomCursor,
  ParticleTrail,
  Spotlight,
  ProjectPreview,
} from '@/components/cursor';
import routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <CursorProvider>
        <SmoothScrollProvider>
          <CustomCursor />
          <ParticleTrail />
          <Spotlight />
          <ProjectPreview />
          <ScrollProgress />
          <NoiseOverlay />
          <ParticlesCanvas />
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Sonner />
        </SmoothScrollProvider>
      </CursorProvider>
    </Router>
  );
};

export default App;
