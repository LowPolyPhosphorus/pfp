import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
export default function Home() {
  const [lastLocation, setLastLocation] = useState(null);
  const [password, setPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  useEffect(() => {
    fetch('/api/last-changer')
      .then(res => res.json())
      .then(data => setLastLocation(data.location))
      .catch(() => setLastLocation(null));
  }, []);
  const handleBypassSubmit = (e) => {
    e.preventDefault();
    if (password) {
      window.location.href = `/api/set-profile?bypass=${encodeURIComponent(password)}`;
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>LowPolyPhosphorus's pfp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles['win98-window']} style={{ textAlign: 'center', padding: '2rem', margin: '1rem' }}>
          <img src='/api/current/' className={styles.avatar} />
          <h1 className={styles.title + ' header-title-name'}>
            LowPolyPhosphorus
          </h1>
          {lastLocation && (
            <p className={styles['status-bar']}>
              last person that changed my pfp was based in <strong>{lastLocation}</strong>
            </p>
          )}
        </div>
        <div className={styles.grid}>
          <a
            href={"/api/photo"}
            className={styles.card + ' post'}
          >
            <h3><img src="/icons/camera.png" alt="" style={{ width: '24px', height: '24px', verticalAlign: 'middle', marginRight: '6px' }} /> pull a random image</h3>
            <p>idk why you want this but you can have it</p>
          </a>
          <a
            href={"/api/set-profile"}
            className={styles.card + ' post'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3><img src="/icons/pictureframe.png" alt="" style={{ width: '24px', height: '24px', verticalAlign: 'middle', marginRight: '6px' }} /> change my pfp</h3>
            <p>changes my pfp on the hack club slack, have fun with it!</p>
          </a>
        </div>
        <div className={styles['inline-form']}>
          {!showPasswordInput ? (
            <button 
              onClick={() => setShowPasswordInput(true)}
              className={styles['win98-button']}
            >
              <img src="/icons/padlock.png" alt="" style={{ width: '18px', height: '18px', verticalAlign: 'middle', marginRight: '4px' }} /> bypass rate limit?
            </button>
          ) : (
            <form onSubmit={handleBypassSubmit} style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="password"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles['win98-input']}
              />
              <button
                type="submit"
                className={styles['win98-button']}
              >
                OK
              </button>
              <button
                type="button"
                onClick={() => setShowPasswordInput(false)}
                className={styles['win98-button']}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        <a href="https://github.com/LowPolyPhosphorus/pfp">source code here</a>
        {' • '}
        <a href="/privacy">privacy policy</a>
      </footer>
    </div>
  );
}
