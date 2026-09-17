"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function MedicalHeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Ambient and directional lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const tealLight = new THREE.PointLight(0x0f766e, 4, 20);
    tealLight.position.set(5, 4, 4);
    scene.add(tealLight);

    const goldLight = new THREE.PointLight(0xd4a853, 3.5, 20);
    goldLight.position.set(-5, -3, 3);
    scene.add(goldLight);

    const cyanLight = new THREE.PointLight(0x2dd4bf, 2, 15);
    cyanLight.position.set(0, 5, -2);
    scene.add(cyanLight);

    // Group for the entire 3D object
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Glass Medical Cross
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0f766e,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.85,
      ior: 1.5,
      thickness: 0.8,
      transparent: true,
      opacity: 0.9,
    });

    const crossGroup = new THREE.Group();

    const vBarGeo = new THREE.BoxGeometry(0.55, 1.8, 0.4);
    const hBarGeo = new THREE.BoxGeometry(1.8, 0.55, 0.4);

    const vBar = new THREE.Mesh(vBarGeo, glassMaterial);
    const hBar = new THREE.Mesh(hBarGeo, glassMaterial);
    crossGroup.add(vBar);
    crossGroup.add(hBar);

    // Gold inner core for the cross
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xd4a853,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x6b4f17,
    });
    const coreGeo = new THREE.SphereGeometry(0.22, 32, 32);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    crossGroup.add(coreMesh);

    mainGroup.add(crossGroup);

    // 2. Dual Orbital Rings (Torus) - DNA / Heartbeat Pulse Rings
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x0f766e,
      metalness: 0.5,
      roughness: 0.25,
      transparent: true,
      opacity: 0.65,
    });

    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xd4a853,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.8,
    });

    const ringGeo1 = new THREE.TorusGeometry(1.65, 0.04, 16, 100);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.0, 0.035, 16, 100);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 4;
    mainGroup.add(ring2);

    // 3. Floating Micro-particles (vitality / aura)
    const particleCount = 45;
    const particleGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const particleMat = new THREE.MeshStandardMaterial({
      color: 0x99f6e4,
      emissive: 0x14b8a6,
      roughness: 0.3,
    });

    const particleGroup = new THREE.Group();
    const particleData: { mesh: THREE.Mesh; angle: number; radius: number; speed: number; yBase: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const pMesh = new THREE.Mesh(particleGeo, particleMat);
      const radius = 1.3 + Math.random() * 1.5;
      const angle = (i / particleCount) * Math.PI * 2;
      const yBase = (Math.random() - 0.5) * 2;
      pMesh.position.set(Math.cos(angle) * radius, yBase, Math.sin(angle) * radius);
      particleGroup.add(pMesh);
      particleData.push({
        mesh: pMesh,
        angle,
        radius,
        speed: 0.005 + Math.random() * 0.01,
        yBase,
      });
    }
    mainGroup.add(particleGroup);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    let animationId: number;
    let clock = new THREE.Clock();
    let isVisible = true;

    // Intersection observer to pause rendering when off screen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Gentle floating levitation
      mainGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.12;

      // Group rotation
      mainGroup.rotation.y = elapsedTime * 0.25 + mouseX;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.1 + mouseY;

      // Independent ring rotations
      ring1.rotation.z += 0.006;
      ring2.rotation.y += 0.008;

      // Core pulsing
      const pulseScale = 1 + Math.sin(elapsedTime * 2.5) * 0.06;
      crossGroup.scale.set(pulseScale, pulseScale, pulseScale);

      // Particle orbiting
      for (let i = 0; i < particleData.length; i++) {
        const p = particleData[i];
        p.angle += p.speed;
        p.mesh.position.x = Math.cos(p.angle) * p.radius;
        p.mesh.position.z = Math.sin(p.angle) * p.radius;
        p.mesh.position.y = p.yBase + Math.sin(elapsedTime * 2 + i) * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-95 lg:min-h-125 flex items-center justify-center pointer-events-none"
    >
      {hasWebGL ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full max-w-137.5 max-h-137.5 object-contain"
          aria-label="Interactive 3D medical emblem"
        />
      ) : (
        // CSS 3D fallback for devices without WebGL
        <div className="relative flex items-center justify-center w-72 h-72 rounded-full bg-linear-to-tr from-teal-800/30 via-emerald-700/20 to-amber-500/20 backdrop-blur-xl border border-teal-500/30 shadow-2xl animate-pulse">
          <div className="w-36 h-36 rounded-full border-2 border-gold-400/60 border-dashed animate-spin" />
          <div className="absolute text-teal-700 font-bold text-4xl">+</div>
        </div>
      )}

      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-amber-400/15 rounded-full blur-3xl pointer-events-none -z-10" />
    </div>
  );
}
