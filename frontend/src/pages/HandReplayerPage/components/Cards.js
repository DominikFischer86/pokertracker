import React from "react"
import { string } from "prop-types"

import BlankCard from "../../../images/cards/null.svg"

import TwoOfClubs from "../../../images/cards/2C.svg"
import ThreeOfClubs from "../../../images/cards/3C.svg"
import FourOfClubs from "../../../images/cards/4C.svg"
import FiveOfClubs from "../../../images/cards/5C.svg"
import SixOfClubs from "../../../images/cards/6C.svg"
import SevenOfClubs from "../../../images/cards/7C.svg"
import EightOfClubs from "../../../images/cards/8C.svg"
import NineOfClubs from "../../../images/cards/9C.svg"
import TenOfClubs from "../../../images/cards/TC.svg"
import JackOfClubs from "../../../images/cards/JC.svg"
import QueenOfClubs from "../../../images/cards/QC.svg"
import KingOfClubs from "../../../images/cards/KC.svg"
import AceOfClubs from "../../../images/cards/AC.svg"

import TwoOfHearts from "../../../images/cards/2H.svg"
import ThreeOfHearts from "../../../images/cards/3H.svg"
import FourOfHearts from "../../../images/cards/4H.svg"
import FiveOfHearts from "../../../images/cards/5H.svg"
import SixOfHearts from "../../../images/cards/6H.svg"
import SevenOfHearts from "../../../images/cards/7H.svg"
import EightOfHearts from "../../../images/cards/8H.svg"
import NineOfHearts from "../../../images/cards/9H.svg"
import TenOfHearts from "../../../images/cards/TH.svg"
import JackOfHearts from "../../../images/cards/JH.svg"
import QueenOfHearts from "../../../images/cards/QH.svg"
import KingOfHearts from "../../../images/cards/KH.svg"
import AceOfHearts from "../../../images/cards/AH.svg"

import TwoOfDiamonds from "../../../images/cards/2D.svg"
import ThreeOfDiamonds from "../../../images/cards/3D.svg"
import FourOfDiamonds from "../../../images/cards/4D.svg"
import FiveOfDiamonds from "../../../images/cards/5D.svg"
import SixOfDiamonds from "../../../images/cards/6D.svg"
import SevenOfDiamonds from "../../../images/cards/7D.svg"
import EightOfDiamonds from "../../../images/cards/8D.svg"
import NineOfDiamonds from "../../../images/cards/9D.svg"
import TenOfDiamonds from "../../../images/cards/TD.svg"
import JackOfDiamonds from "../../../images/cards/JD.svg"
import QueenOfDiamonds from "../../../images/cards/QD.svg"
import KingOfDiamonds from "../../../images/cards/KD.svg"
import AceOfDiamonds from "../../../images/cards/AD.svg"

import TwoOfSpades from "../../../images/cards/2S.svg"
import ThreeOfSpades from "../../../images/cards/3S.svg"
import FourOfSpades from "../../../images/cards/4S.svg"
import FiveOfSpades from "../../../images/cards/5S.svg"
import SixOfSpades from "../../../images/cards/6S.svg"
import SevenOfSpades from "../../../images/cards/7S.svg"
import EightOfSpades from "../../../images/cards/8S.svg"
import NineOfSpades from "../../../images/cards/9S.svg"
import TenOfSpades from "../../../images/cards/TS.svg"
import JackOfSpades from "../../../images/cards/JS.svg"
import QueenOfSpades from "../../../images/cards/QS.svg"
import KingOfSpades from "../../../images/cards/KS.svg"
import AceOfSpades from "../../../images/cards/AS.svg"

const Cards = ({ card }) => {
    if (card === "2c") return <img title="Two of Clubs" src={TwoOfClubs} />
    if (card === "3c") return <img title="Three of Clubs" src={ThreeOfClubs} />
    if (card === "4c") return <img title="Four of Clubs" src={FourOfClubs} />
    if (card === "5c") return <img title="Five of Clubs" src={FiveOfClubs} />
    if (card === "6c") return <img title="Six of Clubs" src={SixOfClubs} />
    if (card === "7c") return <img title="Seven of Clubs" src={SevenOfClubs} />
    if (card === "8c") return <img title="Eight of Clubs" src={EightOfClubs} />
    if (card === "9c") return <img title="Nine of Clubs" src={NineOfClubs} />
    if (card === "Tc") return <img title="Ten of Clubs" src={TenOfClubs} />
    if (card === "Jc") return <img title="Jack of Clubs" src={JackOfClubs} />
    if (card === "Qc") return <img title="Queen of Clubs" src={QueenOfClubs} />
    if (card === "Kc") return <img title="King of Clubs" src={KingOfClubs} />
    if (card === "Ac") return <img title="Ace of Clubs" src={AceOfClubs} />

    if (card === "2h") return <img title="Two of Hearts" src={TwoOfHearts} />
    if (card === "3h") return <img title="Three of Hearts" src={ThreeOfHearts} />
    if (card === "4h") return <img title="Four of Hearts" src={FourOfHearts} />
    if (card === "5h") return <img title="Five of Hearts" src={FiveOfHearts} />
    if (card === "6h") return <img title="Six of Hearts" src={SixOfHearts} />
    if (card === "7h") return <img title="Seven of Hearts" src={SevenOfHearts} />
    if (card === "8h") return <img title="Eight of Hearts" src={EightOfHearts} />
    if (card === "9h") return <img title="Nine of Hearts" src={NineOfHearts} />
    if (card === "Th") return <img title="Ten of Hearts" src={TenOfHearts} />
    if (card === "Jh") return <img title="Jack of Hearts" src={JackOfHearts} />
    if (card === "Qh") return <img title="Queen of Hearts" src={QueenOfHearts} />
    if (card === "Kh") return <img title="King of Hearts" src={KingOfHearts} />
    if (card === "Ah") return <img title="Ace of Hearts" src={AceOfHearts} />

    if (card === "2d") return <img title="Two of Diamonds" src={TwoOfDiamonds} />
    if (card === "3d") return <img title="Three of Diamonds" src={ThreeOfDiamonds} />
    if (card === "4d") return <img title="Four of Diamonds" src={FourOfDiamonds} />
    if (card === "5d") return <img title="Five of Diamonds" src={FiveOfDiamonds} />
    if (card === "6d") return <img title="Six of Diamonds" src={SixOfDiamonds} />
    if (card === "7d") return <img title="Seven of Diamonds" src={SevenOfDiamonds} />
    if (card === "8d") return <img title="Eight of Diamonds" src={EightOfDiamonds} />
    if (card === "9d") return <img title="Nine of Diamonds" src={NineOfDiamonds} />
    if (card === "Td") return <img title="Ten of Diamonds" src={TenOfDiamonds} />
    if (card === "Jd") return <img title="Jack of Diamonds" src={JackOfDiamonds} />
    if (card === "Qd") return <img title="Queen of Diamonds" src={QueenOfDiamonds} />
    if (card === "Kd") return <img title="King of Diamonds" src={KingOfDiamonds} />
    if (card === "Ad") return <img title="Ace of Diamonds" src={AceOfDiamonds} />

    if (card === "2s") return <img title="Two of Spades" src={TwoOfSpades} />
    if (card === "3s") return <img title="Three of Spades" src={ThreeOfSpades} />
    if (card === "4s") return <img title="Four of Spades" src={FourOfSpades} />
    if (card === "5s") return <img title="Five of Spades" src={FiveOfSpades} />
    if (card === "6s") return <img title="Six of Spades" src={SixOfSpades} />
    if (card === "7s") return <img title="Seven of Spades" src={SevenOfSpades} />
    if (card === "8s") return <img title="Eight of Spades" src={EightOfSpades} />
    if (card === "9s") return <img title="Nine of Spades" src={NineOfSpades} />
    if (card === "Ts") return <img title="Ten of Spades" src={TenOfSpades} />
    if (card === "Js") return <img title="Jack of Spades" src={JackOfSpades} />
    if (card === "Qs") return <img title="Queen of Spades" src={QueenOfSpades} />
    if (card === "Ks") return <img title="King of Spades" src={KingOfSpades} />
    if (card === "As") return <img title="Ace of Spades" src={AceOfSpades} />
    
    return <img src={BlankCard} />
}

Cards.propTypes = {
    card: string
}

export default Cards