/**
 * useEffect를 통한 외부와의 소통
 *
 * useEffect는 돔이 만들어진 후 호출되는 코드로 렌더링 타임에 결정할 수 없는
 * 외부 데이터와의 연동을 위해 사용되야 한다.
 *
 * 하지만 다음과 같은경우 effect를 사용하는 것은 좋지 않다.
 *  - 랜더링에 사용하는 데이터 가공
 *  - 유저 이벤트 핸들러
 */
import {VBox} from '@/ui/styled/Box';
import React, {useEffect, useRef, useState} from 'react';
import {PropsWithChildren} from 'react';

const VideoPlayer = ({src, isPlaying}: PropsWithChildren<{src: string; isPlaying: boolean}>) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);
  return <video src={src} ref={videoRef} loop playsInline />;
};

function NoneEffectApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoStateLabel = isPlaying ? 'Pause' : 'Play';
  return (
    <VBox gap={8} width={200}>
      <button
        onClick={() => {
          setIsPlaying(!isPlaying);
        }}
      >
        {videoStateLabel}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </VBox>
  );
}

export default NoneEffectApp;
