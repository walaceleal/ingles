'use client'

import styles from "./page.module.css";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { GiProgression } from "react-icons/gi";


export default function Home() {
  const pronomes = {
    reto: {
      'Eu': 'I',
      'Tu': 'You',
      'Ele': 'He',
      'Ela': 'She',
      'Isso/Objeto/Animal': 'It',
      'Nós': 'We',
      'Vós': 'You',
      'Eles': 'They',
      'Elas': 'They'
    },

    obliquo: {
      'Eu': 'Me',
      'Tu': 'You',
      'Ele': 'Him',
      'Ela': 'Her',
      'Isso/Objeto/Animal': 'It',
      'Nós': 'Us',
      'Vós': 'You',
      'Eles': 'Them',
      'Elas': 'Them'
    },

    possessivoAdjetivo: {
      'Eu': 'My',
      'Tu': 'Your',
      'Ele': 'His',
      'Ela': 'Her',
      'Isso/Objeto/Animal': 'Its',
      'Nós': 'Our',
      'Vós': 'Your',
      'Eles': 'Their',
      'Elas': 'Their'
    },

    possessivoPronome: {
      'Eu': 'Mine',
      'Tu': 'Yours',
      'Ele': 'His',
      'Ela': 'Hers',
      // "It" não possui forma possessiva pronominal de uso normal
      'Nós': 'Ours',
      'Vós': 'Yours',
      'Eles': 'Theirs',
      'Elas': 'Theirs'
    },

    reflexivo: {
      'Eu': 'Myself',
      'Tu': 'Yourself',
      'Ele': 'Himself',
      'Ela': 'Herself',
      'Isso': 'Itself',
      'Nós': 'Ourselves',
      'Vós': 'Yourselves',
      'Eles': 'Themselves',
      'Elas': 'Themselves'
    }
  };

  const [opcoes, setOpcoes] = useState([]);
  const [certo, setCerto] = useState(null);
  const [historico, setHistorico] = useState(new Array(10).fill(null))
  const [questao, setQuestao] = useState(0);
  const [sequencia, setSequencia] = useState(0);

  const menu = 'reto';
  const modo = 'inglês-português';

  function obterOpcoes(){
    const conjunto = Object.keys(pronomes.reto).sort(() => Math.random() > 0.5 ? -1 : 1).slice(0, 4);
    const certo = conjunto[Math.floor(Math.random() * conjunto.length)];

    setOpcoes(conjunto);
    setCerto(certo);
  }

  useEffect(()=>{
    obterOpcoes();
  }, [])

  function avaliar(selecao: string){
    const acertou = pronomes[menu][selecao] == pronomes[menu][certo];

    setSequencia(acertou ? sequencia + 1 : 0);

    historico[questao] = acertou;
    setHistorico(historico);
    setQuestao(q => q + 1);
    obterOpcoes();
  }

  return (
    <div style={{padding: 30, display: "flex", flexDirection: 'column', justifyContent: 'space-between', height: '100vh'}}>
          <div style={{display: 'flex', alignItems:'center', flexDirection: 'column', width:'100%'}}>
            <div style={{display: 'flex', gap: 5, alignItems: "center", justifyContent: 'space-between', width: '100%'}}>
              <div></div>
              <div>
                {historico.map((h, i) => <IoMdCheckmarkCircleOutline 
                  key={i}
                  size={25} 
                  color={h === null ? 'gray': h ? 'green': 'red'}
                />)}
              </div>

              <div style={{display: 'flex', gap: 5, alignItems: "center"}}>
                <GiProgression color="green" size={25} />
                <span style={{color:'green', fontSize: 30}}>{sequencia}</span>
              </div>
                
              
            </div>
            <hr className="w-100"/>
            <h5>Pronomes pessoais (caso reto)</h5>
            <hr className="w-100"/>
            <h2>{pronomes.reto[certo]}</h2>
          </div>
  
          <div style={{display: 'flex', flexDirection: 'column', alignItems:'stretch', width: '100%', gap: 10}}>
            {opcoes?.map(o => <Button key={o} onClick={() => avaliar(o)}>{o}</Button>)}
          </div>
    </div>
  );
}
