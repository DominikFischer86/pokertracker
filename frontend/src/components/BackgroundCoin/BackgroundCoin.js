import React, { useRef, Suspense } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/three"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { OrbitControls } from "@react-three/drei"
import { array, bool, object } from "prop-types"

import CoinBack from "../../images/textures/PokerChip-texture-back.svg"

import CoinFront from "../../images/textures/PokerChip-texture-front.svg"

import CoinEdge from "../../images/textures/PokerChip-texture-edge.svg"

import "./BackgroundCoin.scss"

const CoinMesh = props => {
    return (
        <mesh
            {...props}
            scale={.25}>
                <cylinderGeometry args={props.args} />
                <meshPhongMaterial map={props.texture} />
        </mesh>
    )
}

CoinMesh.propTypes = {
    args: array,
    isEdge: bool,
    rotation: array,
    texture: object

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

    return (
        <group {...props} ref={groupRef}>
            <CoinMesh position={[0, .12, 0]} args={[5, 5, 0, 64, 1, false]} rotation={[0, 0, 0]} texture={capTexture} />
            <CoinMesh position={[0, 0, 0]} args={[5, 5, 1, 64, 1, true]} rotation={[0, 3.8, 0]} texture={edgeTexture} isEdge />
            <CoinMesh position={[0, -.125, 0]} args={[5, 5, 0, 64, 1, false]} rotation={[0, 0, 0]} texture={capBacksideTexture} />
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
                <spotLight position={[-20,-20,-20]} angle={0.15} penumbra={2} />
                <pointLight color="#fff" position={[10,10,10]} intensity={1.2} />
                <Coin />
            </Suspense>
        </Canvas>
    )
}