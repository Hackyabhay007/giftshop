import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaInstagram } from 'react-icons/fa';

const Reels = ({ isMobile }) => {
  const [activeReel, setActiveReel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Default unmuted
  const [isPlaying, setIsPlaying] = useState({});
  const videoRefs = useRef({});
  const containerRef = useRef(null);
  const [hoveredReel, setHoveredReel] = useState(null);

  const reelsData = [
    {
      id: 1,
      title: "Custom Gift Box",
      videoUrl: "https://apiv2.mysweetwishes.com/storage/reels/reel1.MP4",
    },
    {
      id: 2,
      title: "Personalized Cards",
      videoUrl: "https://apiv2.mysweetwishes.com/storage/reels/reel2.MP4",
    },
    {
      id: 3,
      title: "Surprise Package",
      videoUrl: "https://apiv2.mysweetwishes.com/storage/reels/reel3.MP4",
    },
    {
      id: 4,
      title: "Handcrafted Gifts",
      videoUrl: "https://apiv2.mysweetwishes.com/storage/reels/reel4.MP4",
    },
    {
      id: 5,
      title: "Special Occasion Gifts",
      videoUrl: "https://apiv2.mysweetwishes.com/storage/reels/reel5.MP4",
    },
    {
      id: 6,
      title: "Gift Wrapping Ideas",
      videoUrl: "https://apiv2.mysweetwishes.com/storage/reels/reel6.MP4",
    },
  ];

  const autoPlayVideo = (reelId) => {
    const currentVideo = videoRefs.current[reelId];
    if (!currentVideo) return;

    Object.keys(videoRefs.current).forEach(id => {
      if (parseInt(id) !== reelId && videoRefs.current[id]) {
        videoRefs.current[id].pause();
        setIsPlaying(prev => ({ ...prev, [id]: false }));
      }
    });

    currentVideo.muted = false;
    setIsMuted(false);
    currentVideo.play().catch(error => {
      console.error("Auto-play failed:", error);
      currentVideo.muted = true;
      setIsMuted(true);
      currentVideo.play().catch(e => console.error("Muted auto-play failed:", e));
    });

    setIsPlaying(prev => ({ ...prev, [reelId]: true }));
  };

  const togglePlay = (reelId) => {
    const currentVideo = videoRefs.current[reelId];
    if (!currentVideo) return;

    if (currentVideo.paused) {
      autoPlayVideo(reelId);
    } else {
      currentVideo.pause();
      setIsPlaying(prev => ({ ...prev, [reelId]: false }));
    }
  };

  const openFullscreenReel = (reelId) => {
    setActiveReel(reelsData.find(reel => reel.id === reelId));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveReel(null);
  };

  const toggleMute = (e, specificReelId = null) => {
    e.stopPropagation();
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    if (specificReelId) {
      const video = videoRefs.current[specificReelId];
      if (video) {
        video.muted = newMutedState;
      }
    } else {
      Object.keys(videoRefs.current).forEach(id => {
        if (videoRefs.current[id]) {
          videoRefs.current[id].muted = newMutedState;
        }
      });
    }

    if (activeReel && videoRefs.current.modalVideo) {
      videoRefs.current.modalVideo.muted = newMutedState;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (containerRef.current) {
        if (e.key === 'ArrowRight') {
          containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        } else if (e.key === 'ArrowLeft') {
          containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <section className={`tp-reels-area pb-5 ${isMobile ? 'pb-extra' : ''}`}>
      <div className="container">
        <div className="text-center">
          <h2
            style={{
              padding: "0 10px",
              paddingTop: "22px",
              paddingBottom: "10px",
              fontSize: "55px",
              fontFamily: "'Tangerine', cursive",
              borderBottom: "2px dotted gray",
              display: "inline-block",
              margin: "1px 20px",
              color: '#990100',
            }}
          >
            Reels
          </h2>
        </div>

        <div 
          className="reels-container mt-4"
          ref={containerRef}
        >
          {reelsData.map((reel) => (
            <div 
              key={reel.id} 
              className={`reel-card position-relative shadow-lg me-4 ${hoveredReel === reel.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredReel(reel.id)}
              onMouseLeave={() => setHoveredReel(null)}
            >
              <video
                ref={el => (videoRefs.current[reel.id] = el)}
                className="reel-video"
                style={{ aspectRatio: '9 / 16', objectFit: 'cover' }}
                muted={isMuted}
                loop
                playsInline
                onClick={() => togglePlay(reel.id)}
                poster=""
              >
                <source src={reel.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className="play-overlay">
                {!isPlaying[reel.id] && (
                  <div className="play-button">
                    <FaPlay />
                  </div>
                )}
              </div>
              
              <div className="reel-controls">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="reel-title">{reel.title}</h5>
                  <div className="control-buttons">
                    <button
                      onClick={(e) => toggleMute(e, reel.id)}
                      className="control-btn"
                    >
                      {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openFullscreenReel(reel.id);
                      }}
                      className="control-btn"
                    >
                      <FaExpand />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-navigation">
          <button 
            className="nav-btn prev"
            onClick={() => containerRef.current.scrollBy({ left: -200, behavior: 'smooth' })}
          >
            ❮
          </button>
          <button 
            className="nav-btn next"
            onClick={() => containerRef.current.scrollBy({ left: 200, behavior: 'smooth' })}
          >
            ❯
          </button>
        </div>

        <div className={`text-center mt-5 ${isMobile ? 'mb-5' : ''}`}>
          <a
            href="https://www.instagram.com/my_sweetwishes/"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-button-wrapper d-inline-block"
          >
            <button className="premium-button">
              <FaInstagram className="me-2" /> Visit Instagram
            </button>
          </a>
        </div>
      </div>

      {isModalOpen && activeReel && (
        <div className="fullscreen-modal">
          <div className="modal-container">
            <div className="modal-content">
              <button className="close-btn" onClick={closeModal}>✕</button>
              
              <div className="video-container">
                <video
                  ref={el => (videoRefs.current.modalVideo = el)}
                  className="modal-video"
                  autoPlay
                  controls
                  muted={isMuted}
                  loop
                >
                  <source src={activeReel.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                <div className="modal-controls">
                  <button
                    onClick={() => {
                      const video = videoRefs.current.modalVideo;
                      if (video.paused) {
                        video.play();
                      } else {
                        video.pause();
                      }
                    }}
                    className="modal-btn"
                  >
                    {videoRefs.current.modalVideo?.paused ? <FaPlay /> : <FaPause />}
                  </button>
                  <button
                    onClick={(e) => toggleMute(e)}
                    className="modal-btn"
                  >
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .reels-container {
          display: flex;
          overflow-x: auto;
          padding: 20px 0;
          scrollbar-width: thin;
          scrollbar-color: #990100 transparent;
          position: relative;
          scroll-behavior: smooth;
        }

        .reels-container::-webkit-scrollbar {
          height: 8px;
        }

        .reels-container::-webkit-scrollbar-thumb {
          background-color: #990100;
          border-radius: 4px;
        }

        .reel-card {
          flex: 0 0 auto;
          width: 240px;
          border: 2px solid #990100;
          overflow: hidden;
          transition: all 0.3s ease;
          position: relative;
        }

        .reel-card.hovered {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .reel-video {
          width: 100%;
          height: 430px;
          object-fit: cover;
          display: block;
        }

        .play-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
        }

        .play-button {
          width: 60px;
          height: 60px;
          background: rgba(153, 1, 0, 0.7);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 24px;
          transition: all 0.3s ease;
        }

        .reel-card:hover .play-button {
          transform: scale(1.1);
          background: rgba(153, 1, 0, 0.9);
        }

        .reel-controls {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 15px;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
          color: white;
        }

        .reel-title {
          margin: 0;
          font-weight: 500;
          font-size: 16px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
        }

        .control-buttons {
          display: flex;
          gap: 10px;
        }

        .control-btn {
          background: transparent;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 5px;
        }

        .control-btn:hover {
          transform: scale(1.2);
        }

        .premium-button {
          background-color: #990100;
          color: #fff;
          border: none;
          padding: 12px 25px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto; /* Center the button */
        }

        .instagram-button-wrapper {
          display: block;
          text-align: center;
          width: 100%;
        }

        .carousel-navigation {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 15px;
        }

        .nav-btn {
          background: #990100;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-btn:hover {
          background: #7a0100;
          transform: scale(1.1);
        }

        .fullscreen-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1050;
        }

        .modal-container {
          width: 90%;
          max-width: 800px;
          position: relative;
        }

        .modal-content {
          position: relative;
          background: #111;
          border-radius: 5px;
          overflow: hidden;
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: transparent;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          z-index: 10;
        }

        .video-container {
          position: relative;
        }

        .modal-video {
          width: 100%;
          display: block;
        }

        .modal-controls {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .modal-btn {
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-btn:hover {
          background: rgba(255,255,255,0.3);
        }

        .pb-extra {
          padding-bottom: 70px !important;
        }

        /* Media query for mobile devices */
        @media (max-width: 768px) {
          .pb-extra {
            padding-bottom: 100px !important; /* Extra padding for mobile */
          }
          .premium-button {
            width: auto;
            max-width: 80%;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
};

export default Reels;
