import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
          <div style={{display: 'flex', justifyContent:'center', width:'100%'}}>
            <h2>Eu</h2>
          </div>
  
          <div style={{display: 'flex', flexDirection: 'column', alignItems:'stretch', width: '100%', gap: 10}}>
            <button>I</button>
            <button>He</button>
            <button>She</button>
            <button>It</button>
          </div>
      </main>
    </div>
  );
}
