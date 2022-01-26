import React, { useRef, Suspense } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/three"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { OrbitControls } from "@react-three/drei"
import { array, bool, object } from "prop-types"

import CoinBack from "../../images/textures/PokerChip-texture-back-2.svg"
import CoinFront from "../../images/textures/PokerChip-texture-front-2.svg"
import CoinEdge from "../../images/textures/PokerChip-texture-edge.svg"
import DisplacementMap from "../../images/textures/PokerChip-texture-front-displacement.png"

import "./BackgroundCoin.scss"

const CoinMesh = props => {
    return (
        <mesh
            {...props}
            scale={.25}>
                <cylinderGeometry args={props.args} />
                <meshPhongMaterial map={props.texture} normalMap={props.normalMap} displacementScale={.5} />
        </mesh>
    )
}

CoinMesh.propTypes = {
    args: array,
    isEdge: bool,
    rotation: array,
    texture: object,
    normalMap: object

}

const Coin = props => {
    const groupRef = useRef()
    useFrame(() => {
        groupRef.current.rotation.x = 8
        groupRef.current.rotation.y = 1.6
        groupRef.current.rotation.z = 0
    })

    const capTexture = useLoader(TextureLoader, CoinFront)
    const capBacksideTexture = useLoader(TextureLoader, CoinBack)
    const edgeTexture = useLoader(TextureLoader, CoinEdge)
    const capDisplacement = useLoader(TextureLoader, DisplacementMap)

    return (
        <group {...props} ref={groupRef}>
            <CoinMesh 
                position={[0, .12, 0]} 
                args={[5, 5, 0, 64, 1, false]} 
                rotation={[0, 0, 0]} 
                texture={capTexture} 
                normalMap={capDisplacement}
                displacementScale={.5} 
            />
            <CoinMesh 
                position={[0, 0, 0]} 
                args={[5, 5, 1, 64, 1, true]} 
                rotation={[0, 3.8, 0]} 
                texture={edgeTexture} 
                isEdge 
            />
            <CoinMesh 
                position={[0, -.125, 0]} 
                args={[5, 5, 0, 64, 1, false]} 
                rotation={[0, 0, 0]} 
                texture={capBacksideTexture}
                normalMap={capDisplacement}
                displacementScale={.5} 
            />
        </group>
    )
}

export const BackgroundCoin = () => {
    return (
        <Canvas className="backgroundCoin" frameloop="demand">
            <Suspense fallback={null}>
                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    enableRotate={true}
                    autoRotateSpeed={20}
                    autoRotate={false}
                />
                <ambientLight intensity={0} />
                <spotLight position={[-50,-50,-25]} angle={0.15} penumbra={2} />
                <pointLight color="#fff" position={[8,5,8]} intensity={1.2} />
                <Coin />
            </Suspense>
        </Canvas>
    )
}