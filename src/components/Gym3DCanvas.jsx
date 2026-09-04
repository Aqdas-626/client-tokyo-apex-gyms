import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3d, Sparkles, Layers } from 'lucide-react';

export default function Gym3DCanvas({ isDark = true, accentColor = '#f59e0b' }) {
  const mountRef = useRef(null);
  const [wireframe, setWireframe] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const wireframeRef = useRef(wireframe);
  wireframeRef.current = wireframe;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf59e0b, 2.5); // Gold Key Light
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.0); // Cyan Athletic Rim Light
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xffffff, 1.2, 20);
    fillLight.position.set(0, 3, 3);
    scene.add(fillLight);

    // 3. 3D Model: Luxury Olympic Hex Dumbbell & Gyro Energy Rings
    const group = new THREE.Group();
    scene.add(group);

    const metalDark = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.25,
      metalness: 0.85,
    });

    const goldAccent = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.2,
      metalness: 0.95,
      emissive: 0xd97706,
      emissiveIntensity: 0.15
    });

    const steelGrip = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.35,
      metalness: 0.9,
    });

    // Central Grip Bar
    const gripGeo = new THREE.CylinderGeometry(0.12, 0.12, 2.2, 32);
    const gripMesh = new THREE.Mesh(gripGeo, steelGrip);
    gripMesh.rotation.z = Math.PI / 2;
    group.add(gripMesh);

    // Grip Rings
    for (let r = -0.7; r <= 0.7; r += 0.35) {
      const ringGeo = new THREE.TorusGeometry(0.13, 0.015, 16, 32);
      const ringMesh = new THREE.Mesh(ringGeo, goldAccent);
      ringMesh.position.x = r;
      ringMesh.rotation.y = Math.PI / 2;
      group.add(ringMesh);
    }

    // Left Hex Head
    const leftHexGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.6, 6);
    const leftHex = new THREE.Mesh(leftHexGeo, metalDark);
    leftHex.position.x = -1.35;
    leftHex.rotation.z = Math.PI / 2;
    group.add(leftHex);

    // Left Gold Outer Cap
    const leftCapGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 6);
    const leftCap = new THREE.Mesh(leftCapGeo, goldAccent);
    leftCap.position.x = -1.68;
    leftCap.rotation.z = Math.PI / 2;
    group.add(leftCap);

    // Right Hex Head
    const rightHexGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.6, 6);
    const rightHex = new THREE.Mesh(rightHexGeo, metalDark);
    rightHex.position.x = 1.35;
    rightHex.rotation.z = Math.PI / 2;
    group.add(rightHex);

    // Right Gold Outer Cap
    const rightCapGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 6);
    const rightCap = new THREE.Mesh(rightCapGeo, goldAccent);
    rightCap.position.x = 1.68;
    rightCap.rotation.z = Math.PI / 2;
    group.add(rightCap);

    // 4. Orbiting Gyro Rings
    const gyroRing1Geo = new THREE.TorusGeometry(1.65, 0.025, 16, 64);
    const gyro1 = new THREE.Mesh(gyroRing1Geo, goldAccent);
    group.add(gyro1);

    const gyroRing2Geo = new THREE.TorusGeometry(1.85, 0.02, 16, 64);
    const gyro2 = new THREE.Mesh(gyroRing2Geo, new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.2
    }));
    gyro2.rotation.x = Math.PI / 3;
    group.add(gyro2);

    // 5. Floating 3D Particles Field
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.04,
      transparent: true,
      opacity: 0.75
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    group.rotation.x = 0.35;
    group.rotation.y = 0.5;

    // 6. Mouse / Touch Interactive Orbiting Controls
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let velocity = { x: 0.005, y: 0.003 };

    const handlePointerDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      prevMousePos = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      const deltaX = clientX - prevMousePos.x;
      const deltaY = clientY - prevMousePos.y;

      velocity.x = deltaX * 0.005;
      velocity.y = deltaY * 0.005;

      group.rotation.y += velocity.x;
      group.rotation.x += velocity.y;

      prevMousePos = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 8. Render Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) {
        velocity.x *= 0.96;
        velocity.y *= 0.96;
        group.rotation.y += velocity.x + 0.007;
        group.rotation.x += velocity.y;
      }

      group.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      gyro1.rotation.z += 0.015;
      gyro1.rotation.x += 0.008;
      gyro2.rotation.y -= 0.012;
      gyro2.rotation.z += 0.01;

      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;

      const isWire = wireframeRef.current;
      group.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.wireframe = isWire;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] flex items-center justify-center rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 shadow-2xl">
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        title="Click and drag to rotate 3D model"
      />

      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-amber-400 text-xs font-bold shadow-lg">
          <Rotate3d className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Interactive 3D View</span>
        </div>

        <button
          onClick={() => setWireframe(!wireframe)}
          className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 backdrop-blur-md border border-slate-700 text-xs font-bold text-slate-300 hover:text-amber-400 transition-all shadow-lg"
          title="Toggle Holographic Wireframe Mode"
        >
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>{wireframe ? 'Solid' : 'Wireframe'}</span>
        </button>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-950/75 backdrop-blur-md border border-slate-800 text-[11px] font-semibold text-slate-400 pointer-events-none shadow-md flex items-center gap-2">
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span>{isInteracting ? 'Rotating 3D Model...' : 'Drag or swipe to rotate 360°'}</span>
      </div>
    </div>
  );
}
