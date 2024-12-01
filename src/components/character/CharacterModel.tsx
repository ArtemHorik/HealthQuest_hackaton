import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface CharacterModelProps {
  modelPath: string;
  rotation?: [number, number, number];
  position?: [number, number, number];
  scale?: number;
}

export function CharacterModel({ 
  modelPath, 
  rotation = [0, 0, 0], 
  position = [0, -1, 0],
  scale = 1
}: CharacterModelProps) {
  const group = useRef<THREE.Group>();
  const { scene } = useGLTF(modelPath);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      <primitive object={scene} />
    </group>
  );
}